// ======================================================================
// 📄 DemoReglamentoArticulo (FIX)
// ======================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import articulosContenido from "@/Academy/Pro/ReglamentoOficial/data/articulos/articulosContenido";
import SidebarDemoAcademia from "@/Academy/componentsAcademy/SidebarDemoAcademia";

import {
  Page,
  Layout,
  MainColumn,
  Title,
  Section,
  SectionTitle,
  Paragraph,
  Paragraph01,
  List,
  Divider,
} from "@/Academy/Pro/ReglamentoOficial/ReglamentoArticuloStyle";

import styled from "styled-components";

// ======================================================
// 🔥 BOTÓN PRO (SIN DEPENDENCIAS)
// ======================================================

const SecondaryButton = styled.button`
  margin-top: 16px;
  padding: 12px 22px;
  border-radius: 999px;
  border: 1px solid #10a37f;
  background: transparent;
  color: #10a37f;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(16, 163, 127, 0.1);
    transform: translateY(-1px);
  }
`;

// ======================================================

const DEMO_ALLOWED = ["art_1_3", "art_4_9", "art_10_15"];

// ======================================================
// UTILIDADES
// ======================================================

function parseBold(text) {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function parseMarkdown(mdText) {
  if (!mdText) return "";

  return mdText
    .replace(
      /🔹 \*\*Texto oficial PDF Reglamento Carnet Taxista:\*\*/g,
      '<span class="official-text">🔹 <strong>Texto oficial PDF Reglamento Carnet Taxista:</strong></span>'
    )
    .replace(
      /🔹 \*\*En lenguaje de Academia:\*\*/g,
      '<span class="academy-text">🔹 <strong>En lenguaje de Academia:</strong></span>'
    )
    .replace(
      /💡 Pregunta típica de examen:|💡 \*\*Clave de examen:\*\*/g,
      '<span class="exam-key-text"><strong>$&</strong></span>'
    )
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n-\s*/g, "<br/>• ");
}

// ======================================================

function ExpandableText({ html, maxChars = 600 }) {
  const [expanded, setExpanded] = useState(false);

  const plainText = html.replace(/<[^>]+>/g, "");
  const isLong = plainText.length > maxChars;

  if (!isLong) {
    return <Paragraph dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const shortHtml = html.slice(0, maxChars) + "...";

  return (
    <>
      <Paragraph
        dangerouslySetInnerHTML={{
          __html: expanded ? html : shortHtml,
        }}
      />

      <span
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "inline-block",
          marginTop: "8px",
          cursor: "pointer",
          color: "#10a37f",
          fontWeight: 600,
        }}
      >
        {expanded ? "Ocultar texto completo" : "… seguir leyendo"}
      </span>
    </>
  );
}

// ======================================================
// COMPONENTE
// ======================================================

export default function DemoReglamentoArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ ahora sí está en el lugar correcto
  const goAcademyPro = () => {
    navigate("/academia/upgrade");
  };

  useEffect(() => {
    if (!DEMO_ALLOWED.includes(id)) {
      navigate("/academia/upgrade");
    }
  }, [id, navigate]);

  const articulo = articulosContenido[id];
  if (!articulo) return null;

  return (
    <Page>
      <Layout>
        <SidebarDemoAcademia />

        <MainColumn>
          <Title>{articulo.title}</Title>

          {/* INTRO */}
          {articulo.introduccion && (
            <Section>
              <SectionTitle>Introducción</SectionTitle>
              <Paragraph
                dangerouslySetInnerHTML={{
                  __html: parseBold(articulo.introduccion),
                }}
              />
            </Section>
          )}

          {/* PUNTOS */}
          {articulo.puntosClave?.length > 0 && (
            <Section>
              <SectionTitle>Puntos clave</SectionTitle>
              <List>
                {articulo.puntosClave.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </List>
            </Section>
          )}

          <Divider />

          {/* CONTENIDO */}
          {articulo.contenido.map((bloque, i) => (
            <Section key={i}>
              <SectionTitle>{bloque.titulo}</SectionTitle>
              <ExpandableText html={parseMarkdown(bloque.texto)} />
            </Section>
          ))}

          <Divider />

          {/* CTA */}
          <Section style={{ textAlign: "center" }}>
            <Paragraph>
              🔒 La evaluación completa está disponible en la versión PRO.
            </Paragraph>

            <Paragraph01>
              Cuestionarios, progreso y evaluación real por bloques.
            </Paragraph01>

            <SecondaryButton onClick={goAcademyPro}>
              Desbloquear Academia PRO
            </SecondaryButton>
          </Section>
        </MainColumn>
      </Layout>
    </Page>
  );
}