import React, { useEffect, useMemo, useState } from "react";
import useCallejeroPalma from "./../Pro/CallejeroPalma/useCallejeroPalma";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import useDemoCallejero from "@/hooks/UseDemoCallejero";
import DemoUnlockBar from "./DemoUnlockBar";
import {
  PageWrapper,
  SectionHeader,
  SectionTitle,
  DemoBadge,
  AttemptsInfo,
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
  LockBox,
} from "./DemoCallejeroStyle";

export default function DemoCallejero() {
  const { calles, loading, error, refetch } = useCallejeroPalma();

  const navigate = useNavigate();
  const { user } = useAuth();
  const uid = user?.uid || null;

  const {
    loadingDemo,
    maxAttempts,
    remainingAttempts,
    isLocked,
    registerAttempt,
  } = useDemoCallejero(uid);

  const [hasStarted, setHasStarted] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(600);

  const bloqueado = isLocked;

  /* ⏱️ Tiempo */
  const minutos = useMemo(
    () => Math.floor(tiempoRestante / 60),
    [tiempoRestante]
  );
  const segundos = useMemo(
    () => String(tiempoRestante % 60).padStart(2, "0"),
    [tiempoRestante]
  );

  /* ▶️ Iniciar DEMO (NO registra intento) */
  const handleStartDemo = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/academia/demo/callejero", reason: "demo" },
      });
      return;
    }

    if (bloqueado || remainingAttempts <= 0) return;

    setHasStarted(true);
  };

  /* ✏️ Inputs */
  const handleChange = (id, field, value) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  /* ✅ Corrección */
  const corregir = () => {
    const resultados = (calles || []).map((c) => {
      const r = respuestas[c.id] || {};

      const correcto =
        Number(r.plano_num) === c.plano_num &&
        (r.plano_letra || "").toUpperCase() === c.plano_letra.toUpperCase() &&
        Number(r.plano_numero) === c.plano_numero;

      return { ...c, correcto };
    });

    const aciertos = resultados.filter((r) => r.correcto).length;
    const nota = ((aciertos / (calles?.length || 1)) * 10).toFixed(1);

    setResultado({ lista: resultados, aciertos, nota });
  };

  /* 🧠 Finalizar intento → AQUÍ suma demoAttempts +1 */
  const finalizarFlujo = async () => {
    if (!user || bloqueado || resultado) return;

    corregir();
    await registerAttempt();
  };

  /* ⏱️ Cronómetro */
  useEffect(() => {
    if (!hasStarted) return;
    if (resultado) return;
    if (loading || error || loadingDemo) return;
    if (bloqueado) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizarFlujo();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, resultado, loading, error, loadingDemo, bloqueado]);

  /* 🔁 Reintentar */
  const handleRetry = async () => {
    if (remainingAttempts <= 0) return;

    setResultado(null);
    setTiempoRestante(600);
    setRespuestas({});
    await refetch();
  };

  if (loading) return <p>Cargando ejercicio...</p>;
  if (error) return <p>Error al cargar el callejero.</p>;

  return (
    <PageWrapper>
      <SectionHeader>
        <SectionTitle>🗺️ Callejero de Palma (DEMO)</SectionTitle>

        {!hasStarted && (
          <DemoUnlockBar
            attemptsLeft={remainingAttempts}
            onStart={handleStartDemo}
          />
        )}

        <AttemptsInfo>
          Intentos disponibles:{" "}
          <strong>{loadingDemo ? "..." : remainingAttempts}</strong> /{" "}
          {maxAttempts}
        </AttemptsInfo>

        {hasStarted && !bloqueado && !resultado && (
          <Timer>
            ⏳ Tiempo restante: {minutos}:{segundos}
          </Timer>
        )}
      </SectionHeader>

      {bloqueado ? (
        <LockBox>
          🔒 Has agotado los intentos DEMO del Callejero.
          <br />
          Accede a <strong>Academia PRO</strong> para entrenar sin límites.
        </LockBox>
      ) : !hasStarted ? null : (
        <MainGrid>
          <ExamColumn>
            {!resultado ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await finalizarFlujo();
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
                        value={respuestas?.[c.id]?.plano_num || ""}
                        onChange={(e) =>
                          handleChange(c.id, "plano_num", e.target.value)
                        }
                      />
                      <CalleInput
                        type="text"
                        placeholder="Letra"
                        maxLength={1}
                        value={respuestas?.[c.id]?.plano_letra || ""}
                        onChange={(e) =>
                          handleChange(c.id, "plano_letra", e.target.value)
                        }
                      />
                      <CalleInput
                        type="number"
                        placeholder="Nº"
                        value={respuestas?.[c.id]?.plano_numero || ""}
                        onChange={(e) =>
                          handleChange(c.id, "plano_numero", e.target.value)
                        }
                      />
                    </InputsRow>
                  </CalleCard>
                ))}

                <SubmitButton type="submit" disabled={loadingDemo}>
                  Finalizar ejercicio
                </SubmitButton>
              </form>
            ) : (
              <ResultBox>
                <h3>Resultado del intento</h3>
                <p>
                  ✅ Aciertos: {resultado.aciertos} / {calles.length}
                </p>
                <p>🏆 Nota: {resultado.nota} / 10</p>

                {remainingAttempts > 0 && (
                  <RetryButton onClick={handleRetry}>
                    🔁 Reintentar
                  </RetryButton>
                )}
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
              ⚠️ <strong>Cualquier dato incompleto o erróneo supone 0 puntos</strong>,
              aunque parte de la respuesta sea correcta.
            </SidebarText>
          </Sidebar>
        </MainGrid>
      )}
    </PageWrapper>
  );
}
