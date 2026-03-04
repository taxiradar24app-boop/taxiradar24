import React, { useEffect, useState } from "react";
import { getAuth } from "@/services/firebaseConfig";

import useCallejeroPalma from "./useCallejeroPalma";
import saveCallejeroProgress from "./saveCallejeroProgress";

const auth = getAuth();

import {
  PageWrapper,
  SectionHeader,
  SectionTitle,
  Timer,
  MainGrid,
  ExamColumn,
  CalleCard,
  CalleTitle,
  InputsRow,
  CalleInput,
  SubmitButton,
  Sidebar,
  SidebarTitle,
  SidebarText,
  ResultBox,
  RetryButton,
} from "./CallejeroPalmaStyle";

export default function CallejeroPalmaScreen() {
  const { calles, loading, error, refetch } = useCallejeroPalma();

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(600);
  const [finalizado, setFinalizado] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    if (resultado || loading || error) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalizar();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resultado, loading, error]);

  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = String(tiempoRestante % 60).padStart(2, "0");

  const handleChange = (id, field, value) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // ✅ Corrección OFICIAL (plano + letra + número)
  const handleFinalizar = async () => {
    if (finalizado) return;

      const resultados = calles.map((c) => {
        const r = respuestas[c.id] || {};

        const letraUser = (r.plano_letra || "").trim().toUpperCase();
        const letraOk = String(c.plano_letra || "").trim().toUpperCase();

        const numUser = Number(String(r.plano_numero || "").trim());
        const numOk = Number(c.plano_numero);

        const planoUser = Number(String(r.plano_num || "").trim());
        const planoOk = Number(c.plano_num);

        const correcto =
          planoUser === planoOk &&
          letraUser === letraOk &&
          numUser === numOk;

        return {
          ...c,
          user: r,
          correcto,
        };
      });

    const aciertos = resultados.filter((r) => r.correcto).length;
    const nota = ((aciertos / calles.length) * 10).toFixed(1);

    setResultado({ lista: resultados, aciertos, nota });
    setFinalizado(true);

    // 🔥 GUARDAR PROGRESO EN FIRESTORE (progress/{uid}.callejero)
    const user = auth.currentUser;

    // ✅ Log para verificar si estás logueado realmente
    console.log("[CALLEJERO] auth.currentUser =>", user?.uid);

    if (user) {
      const failedStreets = resultados
        .filter((r) => !r.correcto)
        .map((r) => `${r.tipo} ${r.nombre} Nº ${r.numero}`);

      try {
        const res = await saveCallejeroProgress({
          uid: user.uid,
          correct: aciertos,
          total: calles.length,
          timeUsedSec: 600 - tiempoRestante,
          failedStreets,
          isDemo: false,
        });

        console.log("[CALLEJERO] saveCallejeroProgress =>", res);

        if (!res?.ok) {
          console.error("[CALLEJERO] ❌ No se guardó:", res?.error);
        }
      } catch (e) {
        console.error("[CALLEJERO] ❌ Error guardando progreso:", e);
      }
    } else {
      console.warn(
        "[CALLEJERO] ⚠️ No hay usuario logueado. No se guarda progreso."
      );
    }
  };

  if (loading) return <p>Cargando calles...</p>;
  if (error) return <p>Error al cargar el ejercicio.</p>;

  return (
    <PageWrapper>
      <SectionHeader>
        <SectionTitle>🗺️ Ejercicio: Callejero de Palma</SectionTitle>
        <Timer>
          ⏳ Tiempo restante: {minutos}:{segundos}
        </Timer>
      </SectionHeader>

      <MainGrid>
        <ExamColumn>
          {!resultado ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFinalizar();
              }}
            >
              {calles.map((c) => (
                <CalleCard key={c.id}>
                  <CalleTitle>
                    {c.tipo} {c.nombre} Nº {c.numero}
                  </CalleTitle>

                  <InputsRow>
                   <CalleInput
                        type="number"
                        placeholder="Plano"
                        value={respuestas[c.id]?.plano_num ?? ""}
                        onChange={(e) => handleChange(c.id, "plano_num", e.target.value)}
                      />
                    <CalleInput
                      type="text"
                      placeholder="Letra"
                      maxLength={1}
                      value={respuestas[c.id]?.plano_letra ?? ""}
                      onChange={(e) => handleChange(c.id, "plano_letra", e.target.value)}
                    />
                    <CalleInput
                      type="number"
                      placeholder="Nº"
                      value={respuestas[c.id]?.plano_numero ?? ""}
                      onChange={(e) => handleChange(c.id, "plano_numero", e.target.value)}
                    />
                  </InputsRow>
                </CalleCard>
              ))}

              <SubmitButton type="submit">Enviar respuestas</SubmitButton>
            </form>
          ) : (
            <ResultBox>
              <h3>Resultados del ejercicio</h3>
              <p>
                ✅ Aciertos: {resultado.aciertos} / {calles.length}
              </p>
              <p>🏆 Nota final: {resultado.nota} / 10</p>

              {/* ✅ DETALLE como antes: qué falló y qué acertó */}
              {resultado.lista.map((r) => (
                <p key={r.id}>
                  {r.tipo} {r.nombre} — {r.correcto ? "✅ Correcto" : "❌ Error"}
                  {!r.correcto && (
                    <>
                      {" "}
                      (Correcto: Plano {r.plano_num} – {r.plano_letra}
                      {r.plano_numero})
                    </>
                  )}
                </p>
              ))}

              <RetryButton
                onClick={async () => {
                  setResultado(null);
                  setFinalizado(false);
                  setTiempoRestante(600);
                  setRespuestas({});
                  await refetch();
                }}
              >
                🔁 Reintentar
              </RetryButton>
            </ResultBox>
          )}
        </ExamColumn>

        <Sidebar>
          <SidebarTitle>Callejero – Ejercicio oficial</SidebarTitle>

          <SidebarText>
            <strong>📍 Formato de respuesta obligatorio</strong>
          </SidebarText>

          <SidebarText>
            Para que una respuesta sea considerada <strong>correcta</strong>, es
            obligatorio indicar <strong>los tres datos completos</strong> del
            callejero oficial:
          </SidebarText>

          <SidebarText>
            • <strong>Plano</strong> (número)
            <br />• <strong>Letra</strong> de la cuadrícula
            <br />• <strong>Número</strong> de la cuadrícula
          </SidebarText>

          <SidebarText>
            <strong>Ejemplos válidos (1 punto):</strong>
            <br />
            Carrer Nuredduna nº 3 → <strong>25 – D1</strong>
            <br />
            Carrer Nuredduna nº 3 → <strong>P25 – D1</strong>
          </SidebarText>

          <SidebarText>
            <strong>Ejemplos incorrectos (0 puntos):</strong>
            <br />• Solo cuadrícula (<em>D1</em>)
            <br />• Solo plano (<em>25</em>)
            <br />• Datos incompletos o incorrectos
          </SidebarText>

          <SidebarText>
            ⚠️{" "}
            <strong>
              Cualquier dato incompleto o erróneo supone 0 puntos
            </strong>
            , aunque parte de la respuesta sea correcta.
          </SidebarText>
        </Sidebar>
      </MainGrid>
    </PageWrapper>
  );
}