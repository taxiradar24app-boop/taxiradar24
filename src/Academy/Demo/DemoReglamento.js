// ======================================================================
// 📘 DemoReglamento — Layout DEMO Reglamento
// ======================================================================

import React from "react";
import { ThemeProvider } from "styled-components";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import themes from "@/Styles/themes";

import articulosIndex from "@/Academy/Pro/ReglamentoOficial/data/articulos/articulosIndex";

import {
  Page,
  HeaderDemo,
  Title,
  Subtitle,
  GridLayout,
  LeftColumn,
  RightColumn,
  ArticleCard,
  ArticleHeader,
  ArticleNumber,
  ArticleTitle,
  ArticleDescription,
  ArticleFooter,
  LockOverlay,
  LockIcon,
  UnlockCTA,
  SidebarBox,
  SidebarTitle,
  SidebarText,
  SidebarList,
} from "./DemoReglamentoStyle";

export default function DemoReglamento() {
  const navigate = useNavigate();
  const { id } = useParams();

  const DEMO_MODULES = ["art_1_3", "art_4_9", "art_10_15"];
  const modules = Object.values(articulosIndex).sort((a, b) => a.order - b.order);

  return (
    <ThemeProvider theme={themes.dark}>
      {id ? (
        <Outlet />
      ) : (
        <Page>
          <HeaderDemo>
            <Title>📘 Reglamento Oficial</Title>
            <Subtitle>
              Todos los bloques visibles. Algunos desbloqueados para prueba.
            </Subtitle>
          </HeaderDemo>

          <GridLayout>
            <LeftColumn>
              {modules.map((mod) => {
                const isUnlocked = DEMO_MODULES.includes(mod.id);

                return (
                  <ArticleCard
                    key={mod.id}
                    $locked={!isUnlocked}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      isUnlocked
                        ? navigate(`/academia/demo/reglamento/${mod.id}`)
                        : navigate("/academia/upgrade")
                    }
                  >
                    <ArticleHeader>
                      <ArticleNumber>{mod.order}</ArticleNumber>

                      <div>
                        <ArticleTitle>{mod.rango}</ArticleTitle>

                        {mod.descripcion && (
                          <ArticleDescription>
                            {mod.descripcion}
                          </ArticleDescription>
                        )}
                      </div>
                    </ArticleHeader>

                    <ArticleFooter>
                      {mod.dificultad} • {mod.tiempo}
                    </ArticleFooter>

                    {!isUnlocked && (
                      <LockOverlay>
                        <LockIcon>🔒</LockIcon>

                        <UnlockCTA
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/academia/upgrade");
                          }}
                        >
                          Desbloquear PRO
                        </UnlockCTA>
                      </LockOverlay>
                    )}
                  </ArticleCard>
                );
              })}
            </LeftColumn>

            <RightColumn>
              <SidebarBox>
                <SidebarTitle>Cómo estudiar este curso</SidebarTitle>
                <SidebarText>
                  Este reglamento está organizado para que avances de forma
                  clara y rápida.
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
                  <li>15 bloques</li>
                  <li>82 artículos</li>
                  <li>Casos reales</li>
                  <li>Preguntas oficiales</li>
                </SidebarList>
              </SidebarBox>

              <SidebarBox>
                <SidebarTitle>Consejo</SidebarTitle>
                <SidebarText>
                  Prueba los bloques DEMO y continúa en PRO.
                </SidebarText>
              </SidebarBox>
            </RightColumn>
          </GridLayout>
        </Page>
      )}
    </ThemeProvider>
  );
}