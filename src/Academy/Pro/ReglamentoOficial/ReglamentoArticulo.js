// src/Academy/Pro/ReglamentoOficial/ReglamentoArticulo.js
import React, { useState, useRef, useEffect } from "react";
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

  // 🔥 NUEVO: estado local sincronizado
  const [localProgress, setLocalProgress] = useState(progressData);

  // 🔥 sincroniza cuando Firebase cambia
  useEffect(() => {
    setLocalProgress(progressData);
  }, [progressData]);

  const articulo = articulosContenido[id];
  const topRef = useRef(null);

  const handleGoTop = () => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!articulo) {
    return (
      <Page>
        <Layout>
          {isDemo ? (
            <SidebarDemoAcademia currentArticleId={id} />
          ) : (
            <SidebarProAcademia
              currentArticleId={id}
              progressData={localProgress}
            />
          )}

          <MainColumn>
            <Title>Artículo no encontrado</Title>
          </MainColumn>
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
            progressData={localProgress}
          />
        )}

        <MainColumn>
          {/* 🔥 ANCLA PARA SCROLL */}
          <div ref={topRef} />

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

          {articulo.quiz && (
            <ReglamentoQuiz
              quiz={articulo.quiz}
              mode={mode}
              onGoTop={handleGoTop}
              onFinish={async (result) => {
                if (isDemo) return;

                try {
                  const uid = user?.uid;
                  if (!uid) return;

                  // 🔥 ACTUALIZACIÓN LOCAL INMEDIATA (CLAVE)
                  setLocalProgress((prev) => {
                    const prevArticle =
                      prev?.reglamento?.articles?.[id] || {};

                    const newBest = Math.max(
                      Number(prevArticle.bestScore || 0),
                      result.score
                    );

                    return {
                      ...prev,
                      reglamento: {
                        ...prev?.reglamento,
                        articles: {
                          ...prev?.reglamento?.articles,
                          [id]: {
                            ...prevArticle,
                            attempts:
                              Number(prevArticle.attempts || 0) + 1,
                            bestScore: newBest,
                            passed: result.passed,
                          },
                        },
                      },
                    };
                  });

                  // 🔥 GUARDADO FIREBASE
                  await saveReglamentoArticulo({
                    uid,
                    articleId: id,
                    articuloMeta: {
                      rango: articulo?.rango ?? "",
                    },
                    result,
                    totalArticles:
                      Object.keys(articulosContenido).length,
                  });
                } catch (e) {
                  console.error("Error guardando progreso:", e);
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