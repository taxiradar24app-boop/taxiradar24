// src/Academy/componentsAcademy/SidebarDemoAcademia.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarWrapper,
  SidebarSection,
  SidebarTitle,
  SidebarText,
  DemoDivider,
  DemoBox,
  DemoTitle,
  DemoCopy,
  DemoButton,
  FeatureList,
  PreviewRow,
  PreviewPill,
  PreviewPillProgress,
  PreviewPillDone,
} from "./SidebarProAcademiaStyle";

export default function SidebarDemoAcademia() {
  const navigate = useNavigate();

  const goUpgrade = () => {
    navigate("/academia");
  };

  return (
    <SidebarWrapper>
      <SidebarSection>
        <SidebarTitle>Versión DEMO</SidebarTitle>

        <SidebarText>
          Estás viendo una muestra del Reglamento dentro de la Academia.
          <br />
          <br />
          En la versión PRO tendrás una experiencia completa de estudio, con
          progreso real por bloques, cuestionarios y seguimiento de tu avance.
        </SidebarText>
      </SidebarSection>

      <DemoDivider />

      <DemoBox>
        <DemoTitle>Qué desbloqueas con PRO</DemoTitle>

        <FeatureList>
          <li>Progreso visible en las pills de cada bloque</li>
          <li>Cuestionario final de 5 preguntas por bloque</li>
          <li>Valoración automática de resultados</li>
          <li>Bloques completados, en progreso y pendientes</li>
          <li>Acceso completo a todos los artículos y evaluaciones</li>
        </FeatureList>

        <PreviewRow>
          <PreviewPill>Pendiente</PreviewPill>
          <PreviewPillProgress>En progreso</PreviewPillProgress>
          <PreviewPillDone>Completado</PreviewPillDone>
        </PreviewRow>

        <DemoCopy>
          Pasa a PRO para estudiar con seguimiento completo y una experiencia
          mucho más guiada.
        </DemoCopy>

        <DemoButton type="button" onClick={goUpgrade}>
          Desbloquear PRO
        </DemoButton>
      </DemoBox>
    </SidebarWrapper>
  );
}