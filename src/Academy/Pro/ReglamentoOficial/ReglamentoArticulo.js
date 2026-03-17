// src/Academy/Pro/ReglamentoOficial/ReglamentoArticulo.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import SidebarProAcademia from "./../../componentsAcademy/SidebarProAcademia";
import SidebarDemoAcademia from "./../../componentsAcademy/SidebarDemoAcademia";
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
} from "./ReglamentoArticuloStyle";

import ReglamentoQuiz from "./ReglamentoQuiz";
import ScrollBoton from "@/components/Buttons/ScrollBoton";
import { useAuth } from "./../../../navigator/sections/auth/useAuth";

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

export default function ReglamentoArticulo({ mode = "pro" }) {
  const { id } = useParams();
  const isDemo = mode === "demo";

  const { user, progressData } = useAuth();
  const articulo = articulosContenido[id];

  if (!articulo) {
    return (
      <Page>
        <Layout>
          {isDemo ? (
            <SidebarDemoAcademia currentArticleId={id} />
          ) : (
            <SidebarProAcademia
              currentArticleId={id}
              progressData={progressData}
            />
          )}

          <MainColumn id="scroll-root">
            <Title>Artículo no encontrado</Title>
            <Paragraph>
              El módulo solicitado no existe o aún no ha sido creado.
            </Paragraph>
          </MainColumn>

          <ScrollBoton bottom="16px" />
        </Layout>
      </Page>
    );
  }

  return (
    <Page>
      <Layout>
        {isDemo ? (
          <SidebarDemoAcademia currentArticleId={id} />
        ) : (
          <SidebarProAcademia
            currentArticleId={id}
            progressData={progressData}
          />
        )}

        <MainColumn id="scroll-root">
          <Title>{articulo.title}</Title>

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

          {articulo.contenido.map((bloque, index) => (
            <Section key={index}>
              <SectionTitle>{bloque.titulo}</SectionTitle>
              <ExpandableText html={parseMarkdown(bloque.texto)} />
            </Section>
          ))}

          <Divider />

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

        <ScrollBoton bottom="16px" />
      </Layout>
    </Page>
  );
}