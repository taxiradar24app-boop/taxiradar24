// src/components/Buttons/ScrollBoton.js
// ✅ FIX REAL: tu scroll está en div#root (según DevTools "scroll")
// ✅ Aparece al hacer scroll (>= 1px) y desaparece arriba del todo
// ✅ Portal a document.body para evitar stacking/overflow del layout
// ✅ Respeta imports y diseño (IconButton)

import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import IconButton from "./IconButton";

const ArrowUp = styled.span`
  font-size: 1.35rem;
  line-height: 1;
  color: #e2e8f0;
`;

const FloatWrap = styled.div`
  position: fixed;

  right: ${({ $rightDesktop }) => $rightDesktop};
  bottom: ${({ $bottom }) => $bottom};
  z-index: ${({ $zIndex }) => $zIndex};

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(10px)"};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  transition: opacity 180ms ease, transform 180ms ease;

  /* 📱 Mobile */
  @media (max-width: 768px) {
    right: ${({ $rightMobile, $rightDesktop }) =>
      $rightMobile || $rightDesktop};
  }
`;

export default function ScrollBoton({
  threshold = 1,
  bottom = "18px",
  rightDesktop = "35%",
  rightMobile = "5%",
  zIndex = 2147483647,
  ariaLabel = "Volver arriba",
}) {
  const [visible, setVisible] = useState(false);
  const tickingRef = useRef(false);

  // ------------------------------------------------------------
  // ✅ Detecta el contenedor real de scroll:
  // 1) #root (tu caso)
  // 2) #scroll-root (si algún día lo usas como scroll interno)
  // 3) document.scrollingElement
  // 4) window fallback
  // ------------------------------------------------------------
  const resolveScrollTarget = useCallback(() => {
    if (typeof window === "undefined") return { type: "window", el: null };

    const root = document.getElementById("root");
    if (root && root.scrollHeight > root.clientHeight) {
      return { type: "element", el: root };
    }

    const scrollRoot = document.getElementById("scroll-root");
    if (scrollRoot && scrollRoot.scrollHeight > scrollRoot.clientHeight) {
      return { type: "element", el: scrollRoot };
    }

    const scroller = document.scrollingElement || document.documentElement;
    if (scroller && scroller.scrollHeight > scroller.clientHeight) {
      return { type: "doc", el: scroller };
    }

    return { type: "window", el: null };
  }, []);

  const getScrollTop = useCallback((target) => {
    if (!target) return 0;

    if (target.type === "element" && target.el) return target.el.scrollTop || 0;
    if (target.type === "doc" && target.el) return target.el.scrollTop || 0;

    return window.scrollY || window.pageYOffset || 0;
  }, []);

  const scrollToTop = useCallback((target) => {
    if (!target) return;

    if ((target.type === "element" || target.type === "doc") && target.el) {
      target.el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateVisibility = useCallback(() => {
    const target = resolveScrollTarget();
    const y = getScrollTop(target);
    setVisible(y >= threshold);
  }, [resolveScrollTarget, getScrollTop, threshold]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    updateVisibility();

    const onScrollAny = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        updateVisibility();
        tickingRef.current = false;
      });
    };

    // ✅ escuchamos TODOS los posibles contenedores (incluyendo #root)
    const root = document.getElementById("root");
    if (root) root.addEventListener("scroll", onScrollAny, { passive: true });

    const scrollRoot = document.getElementById("scroll-root");
    if (scrollRoot)
      scrollRoot.addEventListener("scroll", onScrollAny, { passive: true });

    const docEl = document.scrollingElement || document.documentElement;
    if (docEl) docEl.addEventListener("scroll", onScrollAny, { passive: true });

    window.addEventListener("scroll", onScrollAny, { passive: true });
    window.addEventListener("resize", onScrollAny, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollAny);
      window.removeEventListener("resize", onScrollAny);

      if (root) root.removeEventListener("scroll", onScrollAny);
      if (scrollRoot) scrollRoot.removeEventListener("scroll", onScrollAny);
      if (docEl) docEl.removeEventListener("scroll", onScrollAny);
    };
  }, [updateVisibility]);

  const handleClick = () => {
    const target = resolveScrollTarget();
    scrollToTop(target);
  };

  const node = (
    <FloatWrap
  $visible={visible}
  $bottom={bottom}
  $rightDesktop={rightDesktop}
  $rightMobile={rightMobile}
  $zIndex={zIndex}
>
      <IconButton
        onClick={handleClick}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <ArrowUp>↑</ArrowUp>
      </IconButton>
    </FloatWrap>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}