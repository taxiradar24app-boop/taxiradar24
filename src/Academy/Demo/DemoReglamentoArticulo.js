// ======================================================================
// 📄 DemoReglamentoArticulo
// 👉 Visualmente IDÉNTICO a PRO
// 👉 Usa EXACTAMENTE los mismos estilos que PRO
// 👉 Sin Sidebar, sin Quiz
// 👉 CTA PRO al final
// ======================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import articulosContenido from "@/Academy/Pro/ReglamentoOficial/data/articulos/articulosContenido";

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
  TopBar,
  TopBarCenter,
} from "@/Academy/Pro/ReglamentoOficial/ReglamentoArticuloStyle";

// ======================================================
// 🔒 MÓDULOS PERMITIDOS EN DEMO
// ======================================================
const DEMO_ALLOWED = ["art_1_3", "art_4_9", "art_10_15"];

// ======================================================
// 🔧 UTILIDADES DE TEXTO (IGUAL QUE PRO)
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
// 🧠 BLOQUE DE TEXTO EXPANDIBLE (COPIADO DE PRO)
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
          fontSize: "0.95rem",
        }}
      >
        {expanded ? "Ocultar texto completo" : "… seguir leyendo"}
      </span>
    </>
  );
}

// ======================================================
// 📘 COMPONENTE PRINCIPAL
// ======================================================
export default function DemoReglamentoArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        <MainColumn>
          <TopBar>
            <TopBarCenter>{articulo.rango}</TopBarCenter>
          </TopBar>

          <Title>{articulo.title}</Title>

          {/* INTRODUCCIÓN */}
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

          {/* PUNTOS CLAVE */}
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
              <ExpandableText
                html={parseMarkdown(bloque.texto)}
              />
            </Section>
          ))}

          <Divider />

          {/* CTA DEMO */}
          <Section style={{ textAlign: "center" }}>
            <Paragraph>
              🔒 Continúa el Reglamento completo en la versión PRO.
            </Paragraph>
            <Paragraph01>
               Cada sección de los artículos cuenta con un examen de cinco preguntas que pondrán a prueba tu nivel de progreso. 
              </Paragraph01>
            <span
              onClick={() => navigate("/academia/upgrade")}
              style={{
                display: "inline-block",
                marginTop: "12px",
                color: "#10a37f",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
             Desbloquear Academia PRO
            </span>
          </Section>
        </MainColumn>
      </Layout>
    </Page>
  );
}
