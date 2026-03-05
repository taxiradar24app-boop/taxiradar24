import React from "react";
import {
PageWrapper,
PageContainer,
AudioGrid,
AudioCard,
AudioTitle,
AudioDescription,
AudioPlayer,
LockedOverlay,
LockedBadge,
CTABox,
CTAButton,
} from "./DemoAudioStyle";

import { useNavigate } from "react-router-dom";

/* ================= WORKER AUDIO ================= */

const AUDIO_BASE =
"https://taxiradar24-academy-api.taxiradar24audio.workers.dev/audio";

const AUDIO_TOKEN = "TR24_AUDIO_2026_SUPERSEGURO";

/* ================= DATA (MISMA QUE PRO) ================= */

const audios = [
{
id: 0,
title: "Curso Oficial del Reglamento del Taxi de Palma",
file: `${AUDIO_BASE}?key=0-curso-oficial-reglamento-taxi-palma.mp3&token=${AUDIO_TOKEN}`,
},
{
id: 1,
title: "1: Artículos 1 al 3 – Introducción, Objeto y Ámbito",
file: `${AUDIO_BASE}?key=1-articulos-1-al-3-introduccion-reglamento-objeto-obligacion-ambito.mp3&token=${AUDIO_TOKEN}`,
},
{
id: 2,
title: "2: Artículos 4 al 9 – Número de Licencias, Aumentos y Tasas",
},
{
id: 3,
title: "3: Artículos 10 al 15 – Creación y Otorgamiento de Licencias",
},
{
id: 4,
title: "4: Artículo 16 – Rescate de Licencias",
},
{
id: 5,
title: "5: Artículos 17 al 20 – Listas de Conductores y Transmisiones",
},
{
id: 6,
title: "6: Artículos 21 al 25 – Titulares y Requisitos",
},
{
id: 7,
title: "7: Artículos 26 al 27 – Conductores y Permiso Municipal",
},
{
id: 8,
title: "8: Artículos 28 al 32 – Revisión y Suspensión",
},
{
id: 9,
title: "9: Artículos 33 al 45 – Vehículos y Señalización",
},
{
id: 10,
title: "10: Artículo 46 – Tarifas Oficiales",
},
{
id: 11,
title: "11: Artículos 47 al 65 – Prestación del Servicio",
},
{
id: 12,
title: "12: Artículos 66 al 68 – Revocación de Licencias",
},
{
id: 13,
title: "13: Artículos 69 al 74 – Medidas Correctoras",
},
{
id: 14,
title: "14: Artículos 77 al 81 – Infracciones",
},
{
id: 15,
title: "15: Artículo 82 – Régimen Sancionador",
},
];

/* ================= SCREEN ================= */

export default function DemoAudios() {
const navigate = useNavigate();

return ( <PageWrapper> <PageContainer>
<h1 style={{ color: "#10a37f", marginBottom: "0.6rem" }}>
🎧 Audios del Reglamento (DEMO) </h1>

```
    <p style={{ marginBottom: "2.2rem", color: "#cbd5e1" }}>
      Escucha ejemplos reales del Reglamento Municipal del Taxi.
      En la versión DEMO puedes acceder a una muestra.
    </p>

    <AudioGrid>
      {audios.map((audio, index) => {
        const isUnlocked = index < 2;

        return (
          <AudioCard key={audio.id} locked={!isUnlocked}>
            <AudioTitle>{audio.title}</AudioTitle>

            <AudioDescription>
              Audio explicativo del Reglamento Municipal
            </AudioDescription>

            {isUnlocked ? (
              <AudioPlayer controls>
                <source src={audio.file} type="audio/mpeg" />
                Tu navegador no soporta audio HTML5.
              </AudioPlayer>
            ) : (
              <>
                <LockedOverlay />
                <LockedBadge>🔒 Disponible en PRO</LockedBadge>
              </>
            )}
          </AudioCard>
        );
      })}
    </AudioGrid>

    {/* ================= CTA ================= */}

    <CTABox>
      <p>
        Accede a <strong>todos los audios completos</strong>, repite
        lecciones sin límite y sigue tu progreso real.
      </p>

      <CTAButton onClick={() => navigate("/academia/upgrade")}>
        Desbloquear Academia PRO
      </CTAButton>
    </CTABox>
  </PageContainer>
</PageWrapper>

);
}
