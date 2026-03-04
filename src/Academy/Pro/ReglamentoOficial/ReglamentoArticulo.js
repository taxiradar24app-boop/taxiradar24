// src/Academy/Pro/ReglamentoOficial/ReglamentoArticulo.js
// ======================================================================
// 📘 ReglamentoArticulo.js — ENTERPRISE FINAL (PRODUCCIÓN)
// ✅ Separa guardado a saveReglamentoArticulo.js
// ✅ Respeta contenido, UI y lógica existente
// ✅ Elimina el bloque duplicado antiguo de Firestore (evita doble escritura)
// ======================================================================

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SidebarProAcademia from "./../../componentsAcademy/SidebarProAcademia";

import articulosContenido from "./data/articulos/articulosContenido";

import saveReglamentoArticulo from "./saveReglamentoArticulo";

import {
  Page,
  Layout,
  MainColumn,
  Title,
  Section,
  SectionTitle,
  Paragraph,
  List,
  Divider,
  ExampleBox,
  FAQItem,
  TopBar,
  TopBarCenter,
} from "./ReglamentoArticuloStyle";

import ReglamentoQuiz from "./ReglamentoQuiz";

import BackButton from "@/components/Buttons/BackButton";
import ScrollBoton from "@/components/Buttons/ScrollBoton";
import BotonSolLuna from "@/components/BotonSolLuna";

import { useAuth } from "./../../../navigator/sections/auth/useAuth";

// ======================================================
// 🔧 UTILIDADES DE TEXTO (ORIGINALES)
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
// 🧠 BLOQUE DE TEXTO EXPANDIBLE (INLINE ORIGINAL)
// ======================================================

function ExpandableText({ html, maxChars = 700 }) {
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
// mode = "pro" | "demo"
// ======================================================

export default function ReglamentoArticulo({ mode = "pro" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDemo = mode === "demo";

  const { user, progressData } = useAuth();

  const articulo = articulosContenido[id];

  // ------------------------------
  // ❌ ARTÍCULO NO EXISTE
  // ------------------------------
  if (!articulo) {
    return (
      <Page>
        <Layout>
          <MainColumn id="scroll-root">
            <Title>Artículo no encontrado</Title>
            <Paragraph>
              El módulo solicitado no existe o aún no ha sido creado.
            </Paragraph>
          </MainColumn>

          {!isDemo && (
            <SidebarProAcademia currentArticleId={id} progressData={progressData} />
          )}
        </Layout>
      </Page>
    );
  }

  // ------------------------------
  // ✔ RENDER PRINCIPAL
  // ------------------------------
  return (
    <Page>
      <Layout>
        {/* COLUMNA IZQUIERDA — CONTENIDO */}
        <MainColumn id="scroll-root">
          <TopBar>
            <BackButton
              onClick={() =>
                navigate(
                  isDemo ? "/academia/demo/reglamento" : "/academia/pro/reglamento"
                )
              }
            />
            
            <TopBarCenter>{articulo.rango}</TopBarCenter>

            {!isDemo && <BotonSolLuna />}
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
          {articulo.contenido.map((bloque, index) => (
            <Section key={index}>
              <SectionTitle>{bloque.titulo}</SectionTitle>
              <ExpandableText html={parseMarkdown(bloque.texto)} />
            </Section>
          ))}

          <Divider />

          {/* EJEMPLOS */}
          {articulo.ejemplos?.length > 0 && (
            <Section>
              <SectionTitle>Ejemplos prácticos</SectionTitle>

              {articulo.ejemplos.map((ej, i) => (
                <ExampleBox key={i}>
                  {typeof ej === "string" && <p>{ej}</p>}
                  {typeof ej === "object" && ej.pregunta && (
                    <strong>{ej.pregunta}</strong>
                  )}
                  {typeof ej === "object" && ej.respuesta && <p>{ej.respuesta}</p>}
                </ExampleBox>
              ))}
            </Section>
          )}

          <Divider />

          {/* FAQ */}
          {articulo.faq?.length > 0 && (
            <Section>
              <SectionTitle>Preguntas típicas de examen</SectionTitle>
              {articulo.faq.map((f, i) => (
                <FAQItem key={i}>
                  <h4>{f.pregunta}</h4>
                  <p>{f.respuesta}</p>
                </FAQItem>
              ))}
            </Section>
          )}

          <Divider />

          {/* RESUMEN */}
          {articulo.resumen && (
            <Section>
              <SectionTitle>Resumen final</SectionTitle>
              <Paragraph
                dangerouslySetInnerHTML={{
                  __html: parseBold(articulo.resumen).replace(/\n+/g, "<br/>"),
                }}
              />
            </Section>
          )}

          {/* QUIZ — PRO y DEMO (comportamiento distinto) */}
          {articulo.quiz && (
            <ReglamentoQuiz
              quiz={articulo.quiz}
              mode={mode}
              onFinish={async (result) => {
                if (isDemo) return;

                try {
                  const uid = user?.uid;
                  if (!uid) return;

                  const totalArticles =
                    progressData?.reglamento?.total ??
                    Object.keys(articulosContenido).length;

                  await saveReglamentoArticulo({
                    uid,
                    articleId: id,
                    articuloMeta: {
                      rango: articulo?.rango ?? "",
                      // title: articulo?.title ?? "", // opcional, desactivado para ahorrar espacio
                    },
                    result,
                    totalArticles,
                  });
                } catch (e) {
                  console.error("Error guardando progreso reglamento:", e);
                }
              }}
            />
          )}
        </MainColumn>

        {/* SIDEBAR DERECHA — SOLO PRO */}
        {!isDemo && (
          <SidebarProAcademia currentArticleId={id} progressData={progressData} />
        )}
        {/* Botón flotante volver arriba */}
      <ScrollBoton bottom="16px" />
      </Layout>
    </Page>
  );
}