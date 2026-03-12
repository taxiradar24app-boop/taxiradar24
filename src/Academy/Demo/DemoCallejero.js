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
  AttemptsInfo,
  Timer,
  IntroCard,
  IntroTitle,
  IntroLead,
  IntroGrid,
  IntroColumn,
  IntroBlock,
  IntroBlockTitle,
  IntroText,
  IntroList,
  IntroListItem,
  IntroExamples,
  IntroExampleTitle,
  IntroHint,
  IntroFooter,
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

  const minutos = useMemo(() => Math.floor(tiempoRestante / 60), [tiempoRestante]);

  const segundos = useMemo(
    () => String(tiempoRestante % 60).padStart(2, "0"),
    [tiempoRestante]
  );

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

  const handleChange = (id, field, value) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

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

  const finalizarFlujo = async () => {
    if (!user || bloqueado || resultado) return;

    corregir();
    await registerAttempt();
  };

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
        <SectionTitle>🗺️ Callejero de Palma</SectionTitle>

        {!hasStarted && (
          <>
            <IntroCard>

              <IntroTitle>Ejercicio oficial · 3 intentos disponibles</IntroTitle>

              <IntroLead>
                Este ejercicio reproduce el formato real del examen municipal de
                callejero de Palma.
              </IntroLead>

              <IntroGrid>
                <IntroColumn>
                  <IntroBlock>
                    <IntroBlockTitle>Antes de comenzar</IntroBlockTitle>

                    <IntroText>
                      Antes de empezar te pediremos iniciar sesión o crear una
                      cuenta gratuita.
                    </IntroText>

                    <IntroText>
                      Esto nos permite guardar tus intentos, mostrar tu progreso
                      y ofrecerte una experiencia de aprendizaje más completa.
                    </IntroText>

                    <IntroHint>
                      💡 Ten tu callejero oficial de Palma a mano antes de pulsar
                      el botón. El intento empezará cuando comiences el ejercicio.
                    </IntroHint>
                  </IntroBlock>
                </IntroColumn>

                <IntroColumn>
                  <IntroBlock>
                    <IntroBlockTitle>
                      📍 Formato de respuesta obligatorio
                    </IntroBlockTitle>

                    <IntroText>
                      Para que una respuesta sea considerada correcta, debes
                      indicar los tres datos completos del callejero oficial:
                    </IntroText>

                    <IntroList>
                      <IntroListItem>Plano (número)</IntroListItem>
                      <IntroListItem>Letra de la cuadrícula</IntroListItem>
                      <IntroListItem>Número de la cuadrícula</IntroListItem>
                    </IntroList>

                    <IntroExamples>
                      <IntroExampleTitle>Ejemplos válidos (1 punto)</IntroExampleTitle>
                      <IntroText>
                        Carrer Nuredduna nº 3 → <strong>25 – D1</strong>
                        <br />
                        Carrer Nuredduna nº 3 → <strong>P25 – D1</strong>
                      </IntroText>
                    </IntroExamples>

                    <IntroExamples>
                      <IntroExampleTitle>
                        Ejemplos incorrectos (0 puntos)
                      </IntroExampleTitle>
                      <IntroText>
                        • Solo cuadrícula (<em>D1</em>)
                        <br />
                        • Solo plano (<em>25</em>)
                        <br />
                        • Datos incompletos o incorrectos
                      </IntroText>
                    </IntroExamples>

                    <IntroHint>
                      ⚠️ Cualquier dato incompleto o erróneo supone 0 puntos,
                      aunque parte de la respuesta sea correcta.
                    </IntroHint>
                  </IntroBlock>
                </IntroColumn>
              </IntroGrid>

              <IntroFooter>
                <DemoUnlockBar
                  attemptsLeft={remainingAttempts}
                  onStart={handleStartDemo}
                />
              </IntroFooter>
            </IntroCard>

            <AttemptsInfo>
              Intentos disponibles:{" "}
              <strong>{loadingDemo ? "..." : remainingAttempts}</strong> de{" "}
              {maxAttempts}
            </AttemptsInfo>
          </>
        )}

        {hasStarted && (
          <>
            <AttemptsInfo>
              Intentos disponibles:{" "}
              <strong>{loadingDemo ? "..." : remainingAttempts}</strong> de{" "}
              {maxAttempts}
            </AttemptsInfo>

            {!bloqueado && !resultado && (
              <Timer>
                ⏳ Tiempo restante: {minutos}:{segundos}
              </Timer>
            )}
          </>
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
                {(calles || []).map((c) => (
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
                  <RetryButton type="button" onClick={handleRetry}>
                    🔁 Reintentar
                  </RetryButton>
                )}
              </ResultBox>
            )}
          </ExamColumn>

          <Sidebar>
            <SidebarTitle>Reglas – Ejercicio oficial</SidebarTitle>

            <SidebarText>
              Este ejercicio sigue el formato del examen oficial y puntúa como en
              la prueba real.
            </SidebarText>

            <SidebarText>
              <strong>📍 Para acertar, debes escribir:</strong>
              <br />• Plano
              <br />• Letra
              <br />• Número
            </SidebarText>

            <SidebarText>
              <strong>Ejemplo correcto:</strong>
              <br />
              Carrer Nuredduna nº 3 → <strong>25 – D1</strong>
            </SidebarText>

            <SidebarText>
              <strong>⚠️ Importante:</strong>
              <br />
              Si falta un dato o es incorrecto, la respuesta se considera
              incorrecta.
            </SidebarText>

            <SidebarText>
              Consejo: responde con calma, revisa bien cada dato y apóyate en el
              callejero oficial.
            </SidebarText>
          </Sidebar>
        </MainGrid>
      )}
    </PageWrapper>
  );
}