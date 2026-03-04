// ======================================================================
// 📘 ReglamentoMenu.js — Layout final 70% cápsulas / 30% sidebar
// Forzado siempre en modo DARK (ignora el Sol/Luna)
// ======================================================================

import React from "react";
import { useNavigate } from "react-router-dom";

import articulosIndex from "./data/articulos/articulosIndex";

import themes from "@/Styles/themes";
import { ThemeProvider } from "styled-components";

import {
  Page,
  HeaderDemo,
  TagDemo, 
  Title,
  Subtitle,
  SubInfo,
  GridLayout,
  LeftColumn,
  RightColumn,
  ArticleCard,
  ArticleHeader,
  ArticleNumber,
  ArticleTitle,
  ArticleDescription,
  ArticleFooter,
  SidebarBox,
  SidebarTitle,
  SidebarText,
  SidebarList,
  DifficultyPill,
  TimeText
} from "./ReglamentoMenuStyle";


export default function ReglamentoMenu() {
  const navigate = useNavigate();

  const goToArticle = (id) => {
    navigate(`/academia/pro/reglamento/${id}`);
  };

  const modules = Object.values(articulosIndex).sort((a, b) =>
    a.order > b.order ? 1 : -1
  );
  const cleanModules = modules.slice(0, 15);


  return (
    <ThemeProvider theme={themes.dark}>
      <Page>

      

        <HeaderDemo>
          <TagDemo>CURSO OFICIAL</TagDemo>

          <Title>Reglamento Oficial del Taxi</Title>

          <Subtitle>
            Aprende cada bloque del Reglamento Municipal con explicaciones claras,
            ejemplos reales y un enfoque totalmente orientado al examen.
          </Subtitle>

          <SubInfo>
            15 bloques completos • 82 artículos • Metodología guiada
          </SubInfo>
        </HeaderDemo>

        <GridLayout>
          <LeftColumn>

            {cleanModules.map((mod) => (
              <ArticleCard key={mod.id} onClick={() => goToArticle(mod.id)}>

                <ArticleHeader>
                  <ArticleNumber>{mod.order}</ArticleNumber>

                  <div>
                    <ArticleTitle>{mod.rango}</ArticleTitle>
                    {mod.descripcion && (
                      <ArticleDescription>{mod.descripcion}</ArticleDescription>
                    )}
                  </div>
                </ArticleHeader>

                <ArticleFooter>
                  <DifficultyPill level={mod.dificultad}>
                    {mod.dificultad}
                  </DifficultyPill>

                  <TimeText>{mod.tiempo}</TimeText>
                </ArticleFooter>

              </ArticleCard>
            ))}

          </LeftColumn>


          <RightColumn>
            <SidebarBox>
              <SidebarTitle>Cómo estudiar este curso</SidebarTitle>
              <SidebarText>
                Este reglamento está organizado para que puedas avanzar de forma clara y rápida.
              </SidebarText>
              <SidebarList>
                <li>✔ Empieza por los básicos</li>
                <li>✔ Refuerza con audios</li>
                <li>✔ Haz simuladores</li>
                <li>✔ Repite cuando sea necesario</li>
              </SidebarList>
            </SidebarBox>

            <SidebarBox>
              <SidebarTitle>Contenido del curso</SidebarTitle>
              <SidebarList>
                <li> 15 bloques</li>
                <li> 82 artículos</li>
                <li> Casos reales</li>
                <li> Preguntas oficiales</li>
              </SidebarList>
            </SidebarBox>

            <SidebarBox>
              <SidebarTitle>Consejo del instructor</SidebarTitle>
              <SidebarText>
                Estudia entre 15 y 25 minutos al día. La constancia es la clave
                para aprobar sin memorizar.
              </SidebarText>
            </SidebarBox>
          </RightColumn>

        </GridLayout>

      </Page>
    </ThemeProvider>
  );
}
