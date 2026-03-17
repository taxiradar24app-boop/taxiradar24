// src/Academy/componentsAcademy/SidebarProAcademia.js
// ======================================================================
// 🟩 SidebarProAcademia.js
// ✅ Mantiene la lógica actual de progreso
// ✅ Explica mejor los estados de las cápsulas
// ✅ No rompe la estructura existente
// ✅ Diseñado para encajar con darkTheme + SidebarProAcademiaStyle
// ======================================================================

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarWrapper,
  SidebarSection,
  SidebarTitle,
  SidebarText,
  ChipsRow,
  Chip,
  ChipActive,
  ChipActiveDone,
  ChipDone,
  ChipRetry,

} from "./SidebarProAcademiaStyle";

const REGLAMENTO_LIST = [
  { id: "art_1_3", label: "Art. 1–3" },
  { id: "art_4_9", label: "Art. 4–9" },
  { id: "art_10_15", label: "Art. 10–15" },
  { id: "art_16", label: "Art. 16" },
  { id: "art_17_20", label: "Art. 17–20" },
  { id: "art_21_25", label: "Art. 21–25" },
  { id: "art_26_27", label: "Art. 26–27" },
  { id: "art_28_32", label: "Art. 28–32" },
  { id: "art_33_45", label: "Art. 33–45" },
  { id: "art_46", label: "Art. 46" },
  { id: "art_47_65", label: "Art. 47–65" },
  { id: "art_66_68", label: "Art. 66–68" },
  { id: "art_69_74", label: "Art. 69–74" },
  { id: "art_77_81", label: "Art. 77–81" },
  { id: "art_82", label: "Art. 82" },
];

export default function SidebarProAcademia({
  currentArticleId = null,
  progressData = null,
}) {
  const navigate = useNavigate();

  const handleChipClick = (id) => {
    if (!id) return;
    navigate(`/academia/pro/reglamento/${id}`);
  };

  const handleGo = (path) => () => {
    navigate(path);
  };

  const articlesMap = progressData?.reglamento?.articles || {};

  const getArticleStatus = (articleId) => {
    const article = articlesMap?.[articleId];
    if (!article) return "none";

    const attempts = Number(article.attempts ?? 0);
    const best = Number(article.bestScore ?? 0);

    if (best >= 100) return "done";
    if (attempts > 0) return "retry";
    return "none";
  };

  return (
    <SidebarWrapper>
      <SidebarSection>
        <SidebarTitle>Bloques del Reglamento</SidebarTitle>

        <SidebarText>
          Elige el bloque que quieres estudiar hoy.
          <br />
          <br />
          Las cápsulas cambian según tu avance:
          <br />
          • <strong>Activo</strong>: bloque que estás viendo ahora
          <br />
          • <strong>Completado</strong>: bloque ya superado
          <br />
          • <strong>Repetir</strong>: ya has trabajado ese bloque y puedes volver
          a practicarlo
          <br />
          • <strong>Pendiente</strong>: bloque aún no iniciado
          <br />
          <br />
          Tu progreso se reflejará automáticamente a medida que avances por el
          contenido y respondas las preguntas de cada bloque.
        </SidebarText>

        <ChipsRow>
          {REGLAMENTO_LIST.map((item) => {
            const isActive = currentArticleId === item.id;
            const status = getArticleStatus(item.id);

            let ChipComp = Chip;

            if (isActive && status === "done") ChipComp = ChipActiveDone;
            else if (isActive) ChipComp = ChipActive;
            else if (status === "done") ChipComp = ChipDone;
            else if (status === "retry") ChipComp = ChipRetry;

            return (
              <ChipComp
                key={item.id}
                type="button"
                onClick={() => handleChipClick(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </ChipComp>
            );
          })}
        </ChipsRow>
      </SidebarSection>
    </SidebarWrapper>
  );
}