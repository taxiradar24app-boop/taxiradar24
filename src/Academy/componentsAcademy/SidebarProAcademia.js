// src/Academy/componentsAcademy/SidebarProAcademia.js
// ======================================================================
// 🟩 SidebarProAcademia.js
// ✅ Sin bloque "Tu progreso general"
// ✅ Solo bloques + menú academia
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
  ModulesList,
  ModuleItem,
  ModuleIcon,
  ModuleLabel,
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
    const a = articlesMap?.[articleId];
    if (!a) return "none";

    const attempts = Number(a.attempts ?? 0);
    const best = Number(a.bestScore ?? 0);

    if (best >= 100) return "done";
    if (attempts > 0) return "retry";
    return "none";
  };

  return (
    <SidebarWrapper>
      <SidebarSection>
        <SidebarTitle>Bloques del Reglamento</SidebarTitle>
        <SidebarText>
          Elige el bloque que quieres estudiar hoy. Más adelante podrás ver
          cuáles ya tienes completados.
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
              <ChipComp key={item.id} onClick={() => handleChipClick(item.id)}>
                {item.label}
              </ChipComp>
            );
          })}
        </ChipsRow>
      </SidebarSection>

      <SidebarSection>
        <SidebarTitle>Menú de la Academia</SidebarTitle>
        <SidebarText>Accesos rápidos a todos los módulos PRO.</SidebarText>

        <ModulesList>
          <ModuleItem onClick={handleGo("/academia/pro/reglamento")}>
            <ModuleIcon>📘</ModuleIcon>
            <ModuleLabel>Reglamento</ModuleLabel>
          </ModuleItem>

          <ModuleItem onClick={handleGo("/academia/pro/simulador")}>
            <ModuleIcon>📝</ModuleIcon>
            <ModuleLabel>Simuladores</ModuleLabel>
          </ModuleItem>

          <ModuleItem onClick={handleGo("/academia/pro/audios")}>
            <ModuleIcon>🎧</ModuleIcon>
            <ModuleLabel>Audios</ModuleLabel>
          </ModuleItem>

          <ModuleItem onClick={handleGo("/academia/pro/callejero")}>
            <ModuleIcon>🗺</ModuleIcon>
            <ModuleLabel>Callejero</ModuleLabel>
          </ModuleItem>

          <ModuleItem onClick={handleGo("/academia/pro/vias-principales")}>
            <ModuleIcon>🛣️</ModuleIcon>
            <ModuleLabel>Vías principales</ModuleLabel>
          </ModuleItem>

          <ModuleItem onClick={handleGo("/academia/pro/tarifas")}>
            <ModuleIcon>💶</ModuleIcon>
            <ModuleLabel>Tarifas</ModuleLabel>
          </ModuleItem>
        </ModulesList>
      </SidebarSection>
    </SidebarWrapper>
  );
}