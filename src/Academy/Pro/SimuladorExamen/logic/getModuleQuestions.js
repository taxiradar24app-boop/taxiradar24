// ======================================================================
// 🧠 getExamQuestions.js — SIMULADOR GLOBAL TAXIRADAR24
// Selección aleatoria de preguntas desde TODOS los exámenes guardados
// ======================================================================

// Importamos exámenes oficiales
import examen_12_11_24 from "./../examenes/12.11.24_Examen.json";
import examen_20_02_24 from "./../examenes/20.02.24_Examen.json";
import examen_30_01_25 from "./../examenes/30.01.25_Examen.json";

// 👉 Añade aquí futuros exámenes
const EXAMS = [
  examen_12_11_24,
  examen_20_02_24,
  examen_30_01_25,
];

// ------------------------------------------------------
// Normaliza cualquier formato de pregunta
// ------------------------------------------------------
function normalize(q, origen) {
  if (!q) return null;

  return {
    id: q.id || `${origen}_${q.numero || Math.random()}`,
    pregunta: q.pregunta,
    opciones: {
      A: q.opciones?.A || q.opcion_a,
      B: q.opciones?.B || q.opcion_b,
      C: q.opciones?.C || q.opcion_c,
    },
    correcta: q.correcta,
    origen,
  };
}

// ------------------------------------------------------
// Mezcla aleatoria (Fisher–Yates)
// ------------------------------------------------------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ------------------------------------------------------
// API PRINCIPAL
// ------------------------------------------------------
export default function getExamQuestions(limit = 15) {
  let pool = [];

  EXAMS.forEach((exam, index) => {
    exam.forEach((q) => {
      const normalized = normalize(q, `exam_${index + 1}`);
      if (
        normalized &&
        normalized.pregunta &&
        normalized.opciones.A &&
        normalized.opciones.B &&
        normalized.opciones.C &&
        ["A", "B", "C"].includes(normalized.correcta)
      ) {
        pool.push(normalized);
      }
    });
  });

  return shuffle(pool).slice(0, limit);
}
