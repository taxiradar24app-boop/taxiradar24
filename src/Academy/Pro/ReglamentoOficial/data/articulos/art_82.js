// ======================================================================
// 📘 Artículo 82 — Régimen sancionador (Sanciones)
// Versión ENTERPRISE (Academia TaxiRadar24)
// TEXTO OFICIAL + versión explicada con importes convertidos a EUROS
// Ultra compatible con ReglamentoArticulo.js + Motor semántico
// ======================================================================

const art_82 = {
  id: "art_82",
  order: 15,
  rango: "Art. 82",
  title: "Régimen Sancionador: Importes de las Multas",
  dificultad: "Básico",
  tiempo: "6m",

  // ============================================================
  // 🧠 PALABRAS CLAVE
  // ============================================================
  keywords: [
    "sanciones taxi palma",
    "multas taxi",
    "infracciones leves",
    "infracciones graves",
    "infracciones muy graves",
    "importe sanciones",
    "LOTT sanciones",
    "régimen sancionador taxi"
  ],

  // ============================================================
  // 📍 1) PUNTOS CLAVE
  // ============================================================
  puntosClave: [
    "El artículo 82 fija los importes de las sanciones según la gravedad de la infracción.",
    "Las multas del reglamento original están expresadas en pesetas.",
    "En la versión didáctica se convierten a euros para uso académico.",
    "Existen tres rangos: leves, graves y muy graves."
  ],

  // ============================================================
  // 📍 2) INTRODUCCIÓN
  // ============================================================
  introduccion: `
El artículo 82 recoge el régimen sancionador económico del servicio de auto-taxi.  
El texto oficial usa importes expresados en **pesetas**, pero para el alumno se proporcionan 
las equivalencias en **euros**, ya que así se estudia en la Academia y así aparecen en la 
documentación moderna de apoyo.
  `,

  // ============================================================
  // 📍 3) CONTENIDO PRINCIPAL
  // ============================================================
  contenido: [
    {
      titulo: "Artículo 82 — Importes de las sanciones",

      texto: `
🔹 **Texto oficial PDF Reglamento Carnet Taxista:**  
${String.raw`
Artículo 82.  
82.1. Sin perjuicio de lo que resulte de lo dispuesto en el art. 78 de este Reglamento, conforme resulta de 
lo dispuesto en los art. 143 de la Ley 16/1987, de 30 de julio y 201 del Real Decreto 1211/1990, de 28 de 
septiembre, las infracciones leves se sancionarán con apercibimiento y/o multa de hasta 46.000 pesetas; 
las graves, con multa de 46.001 a 230.000; y las muy graves con multa de 230.001 a 460.000 pesetas.
`}  :contentReference[oaicite:4]{index=4}

---

🔹 **En lenguaje de Academia (importes convertidos a EUROS):**  

Según la conversión oficial (1 € = 166,386 pesetas), los importes quedan así:

### ✔ **Infracciones leves**  
Apercibimiento o multa de **hasta 276,47 €**  
(= 46.000 pesetas)  
→ :contentReference[oaicite:5]{index=5}

### ✔ **Infracciones graves**  
Multa desde **276,47 €** hasta **1.382,33 €**  
(= 46.001 a 230.000 pesetas)

### ✔ **Infracciones muy graves**  
Multa desde **1.382,33 €** hasta **2.764,66 €**  
(= 230.001 a 460.000 pesetas)

---

🔹 **Reglas clave para el examen:**  

• Leves → hasta 276,47 €  
• Graves → entre 276,47 € y 1.382,33 €  
• Muy graves → entre 1.382,33 € y 2.764,66 €  

El examen suele preguntar:

👉 “¿Qué importe máximo puede tener una infracción leve?”  
👉 “¿A partir de qué cantidad comienza una infracción muy grave?”  
👉 “¿Qué rango corresponde a las graves?”  
      `
    }
  ],

  // ============================================================
  // 📍 4) EJEMPLOS PRÁCTICOS
  // ============================================================
  ejemplos: [
    "Una infracción leve por documentación incompleta puede sancionarse hasta con 276,47 €.",
    "Cobrar un suplemento no tarifado puede ser infracción grave (hasta 1.382,33 €).",
    "Manipular el taxímetro puede ser infracción muy grave, sancionable hasta 2.764,66 €."
  ],

  // ============================================================
  // 📍 5) FAQ — Preguntas típicas de examen
  // ============================================================
  faq: [
    {
      pregunta: "¿Cuál es el importe máximo de una infracción leve?",
      respuesta: "Hasta 276,47 €."
    },
    {
      pregunta: "¿Qué multa mínima puede tener una infracción muy grave?",
      respuesta: "1.382,33 €."
    },
    {
      pregunta: "¿En qué moneda está redactado el Reglamento original?",
      respuesta: "En pesetas, pero en la Academia se estudia en euros."
    }
  ],

  // ============================================================
  // 📍 6) RESUMEN FINAL
  // ============================================================
  resumen: `
✔ Leves → hasta 276,47 €  
✔ Graves → 276,47 € → 1.382,33 €  
✔ Muy graves → 1.382,33 € → 2.764,66 €  
✔ Los importes oficiales del PDF están en pesetas; aquí se muestran en euros para facilitar el estudio.  
  `,
  // ============================================================
// 📝 QUIZ DE EVALUACIÓN
// ============================================================
quiz: {
  minToPass: 4,
  questions: [
    {
      id: "q1",
      question: "¿Qué establece el artículo 82 del Reglamento Municipal del Taxi?",
      options: [
        "La clasificación de las infracciones",
        "Los importes de las sanciones económicas",
        "Las causas de revocación de licencias",
        "Las medidas correctoras del servicio"
      ],
      correct: 1
    },
    {
      id: "q2",
      question: "¿Cuál es el importe máximo de una infracción leve, según la conversión a euros usada en la Academia?",
      options: [
        "Hasta 150 €",
        "Hasta 230 €",
        "Hasta 276,47 €",
        "Hasta 460 €"
      ],
      correct: 2
    },
    {
      id: "q3",
      question: "¿Entre qué importes se sancionan las infracciones graves?",
      options: [
        "Entre 150 € y 1.000 €",
        "Entre 230 € y 1.500 €",
        "Entre 276,47 € y 1.382,33 €",
        "Entre 1.382,33 € y 2.764,66 €"
      ],
      correct: 2
    },
    {
      id: "q4",
      question: "¿A partir de qué importe comienza la sanción por infracción muy grave?",
      options: [
        "Desde 1.000 €",
        "Desde 1.200 €",
        "Desde 1.382,33 €",
        "Desde 2.764,66 €"
      ],
      correct: 2
    },
    {
      id: "q5",
      question: "¿En qué moneda están expresados los importes del Reglamento original?",
      options: [
        "Euros",
        "Pesetas",
        "ECUs",
        "Dólares"
      ],
      correct: 1
    }
  ]
}
};

export default art_82;
