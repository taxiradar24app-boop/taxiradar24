import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { getCategoryData } from "../utils/mapHelpers";

const LeafletMapInner = lazy(() => import("./LeafletMapInner"));

const MAP_HEIGHT = "420px";
const DEFAULT_CENTER = [39.5696, 2.6502];
const DEFAULT_ZOOM = 13;

const shellStyle = {
  position: "relative",
  width: "100%",
  minHeight: MAP_HEIGHT,
  borderRadius: "16px",
  overflow: "hidden",
  background:
    "linear-gradient(180deg, rgba(10,21,40,0.94) 0%, rgba(6,18,36,0.98) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const placeholderStyle = {
  height: MAP_HEIGHT,
  width: "100%",
  display: "grid",
  placeItems: "center",
  color: "#e5e7eb",
  textAlign: "center",
  padding: "24px",
};

const innerPlaceholderStyle = {
  maxWidth: "520px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "14px",
};

const titleStyle = {
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#ffffff",
};

const textStyle = {
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "rgba(229,231,235,0.86)",
};

const buttonStyle = {
  appearance: "none",
  border: "1px solid rgba(16,163,127,0.35)",
  background: "rgba(16,163,127,0.14)",
  color: "#ffffff",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.2s ease, opacity 0.2s ease, background 0.2s ease",
};

const loadingStyle = {
  height: MAP_HEIGHT,
  width: "100%",
  display: "grid",
  placeItems: "center",
  color: "#ffffff",
  fontSize: "0.98rem",
};

const spinnerStyle = {
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.18)",
  borderTopColor: "#10a37f",
  animation: "mapSpin 0.9s linear infinite",
};

function LoadingState() {
  return (
    <div style={loadingStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={spinnerStyle} />
        <span>Cargando mapa...</span>
      </div>
    </div>
  );
}

function MapPlaceholder({ onActivate, autoReady }) {
  return (
    <div style={placeholderStyle}>
      <div style={innerPlaceholderStyle}>
        <div style={titleStyle}>Mapa interactivo disponible</div>

        <div style={textStyle}>
          {autoReady
            ? "El mapa ya está listo para cargarse. Pulsa para abrirlo."
            : "Prepararemos el mapa cuando esta sección entre en pantalla. También puedes abrirlo manualmente ahora."}
        </div>

        <button
          type="button"
          style={buttonStyle}
          onClick={onActivate}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.background = "rgba(16,163,127,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(16,163,127,0.14)";
          }}
        >
          Ver mapa
        </button>
      </div>
    </div>
  );
}

const MapView = ({
  center,
  zoom,
  category,
  activeItem,
  onMarkerClick,
  autoLoadOnVisible = true,
  rootMargin = "200px",
}) => {
  const containerRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  const safeCenter = Array.isArray(center) ? center : DEFAULT_CENTER;
  const safeZoom = typeof zoom === "number" ? zoom : DEFAULT_ZOOM;

  useEffect(() => {
    if (!autoLoadOnVisible) return undefined;

    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [autoLoadOnVisible, rootMargin]);

  useEffect(() => {
    if (autoLoadOnVisible && isVisible) {
      setShouldLoadMap(true);
    }
  }, [autoLoadOnVisible, isVisible]);

  const activateMap = () => {
    setShouldLoadMap(true);
  };

  const data = Array.isArray(getCategoryData(category))
    ? getCategoryData(category)
    : [];

  const visibleData = activeItem
    ? data.filter((item) => item.id === activeItem)
    : data;

  if (!shouldLoadMap) {
    return (
      <div ref={containerRef} style={shellStyle}>
        <MapPlaceholder onActivate={activateMap} autoReady={isVisible} />
      </div>
    );
  }

  return (
    <div ref={containerRef} style={shellStyle}>
      <style>
        {`
          @keyframes mapSpin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <Suspense fallback={<LoadingState />}>
        <LeafletMapInner
          center={safeCenter}
          zoom={safeZoom}
          category={category}
          visibleData={visibleData}
          onMarkerClick={onMarkerClick}
        />
      </Suspense>
    </div>
  );
};

export default MapView;