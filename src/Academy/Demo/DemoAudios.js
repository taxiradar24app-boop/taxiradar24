import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  PageContainer,
  PageTitle,
  IntroText,
  AudioGrid,
  AudioCard,
  AudioTitle,
  AudioDescription,
  AudioPlayer,
  LockedOverlay,
  LockedBadge,
  CTABox,
  CTAText,
  CTAButton,
} from "../Pro/AudioLectura/AudioStyle";

import { AUDIO_LIST, buildDemoAudioUrl } from "../share/audioData";

const AUDIO_HTML_PROPS = {
  controls: true,
  preload: "metadata",
  controlsList: "nodownload noplaybackrate noremoteplayback",
  disablePictureInPicture: true,
  disableRemotePlayback: true,
};

export default function DemoAudios() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>🎧 Audios del Reglamento (DEMO)</PageTitle>

        <IntroText>
          Escucha ejemplos reales del Reglamento Municipal del Taxi.
          En la versión DEMO puedes acceder a una muestra.
        </IntroText>

        <AudioGrid>
          {AUDIO_LIST.map((audio, index) => {
            const isUnlocked = index < 2;
            const src = isUnlocked ? buildDemoAudioUrl(audio.key) : "";

            return (
              <AudioCard key={audio.id} locked={!isUnlocked}>
                <AudioTitle>{audio.title}</AudioTitle>

                <AudioDescription>{audio.description}</AudioDescription>

                {isUnlocked ? (
                  <AudioPlayer
                    {...AUDIO_HTML_PROPS}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={src} type="audio/mpeg" />
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

        <CTABox>
          <CTAText>
            Accede a <strong>todos los audios completos</strong>, repite
            lecciones sin límite y sigue tu progreso real.
          </CTAText>

          <CTAButton onClick={() => navigate("/academia/upgrade")}>
            Desbloquear Academia PRO
          </CTAButton>
        </CTABox>
      </PageContainer>
    </PageWrapper>
  );
}