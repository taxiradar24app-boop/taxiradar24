// src/PrivacyPolicies/LegalPageTemplate.js
import React from "react";
import {
  LegalPageShell,
  LegalPageContainer,
  BackButton,
  BackIcon,
  LegalHero,
  LegalEyebrow,
  LegalMainTitle,
  LegalLead,
  LegalMeta,
  LegalMetaItem,
  LegalBodyWrap,
  LegalSection,
  LegalSectionTitle,
  LegalParagraph,
  LegalList,
  LegalNote,
  LegalLinkGrid,
  LegalNavCard,
  LegalNavTitle,
  LegalNavText,
} from "./CookieConsentStyle";

export default function LegalPageTemplate({
  eyebrow = "Información legal",
  title,
  lead,
  updatedAt = "Pendiente de revisión final",
  sections = [],
}) {
  return (
    <LegalPageShell>
      <LegalPageContainer>
        <BackButton to="/">
          <BackIcon>←</BackIcon>
          Volver
        </BackButton>

        <LegalHero>
          <LegalEyebrow>🛡️ {eyebrow}</LegalEyebrow>
          <LegalMainTitle>{title}</LegalMainTitle>
          <LegalLead>{lead}</LegalLead>

          <LegalMeta>
            <LegalMetaItem>TaxiRadar24</LegalMetaItem>
            <LegalMetaItem>Última actualización: {updatedAt}</LegalMetaItem>
            <LegalMetaItem>Versión informativa</LegalMetaItem>
          </LegalMeta>
        </LegalHero>

        <LegalBodyWrap>
          {sections.map((section, index) => (
            <LegalSection key={`${section.title}-${index}`}>
              <LegalSectionTitle>{section.title}</LegalSectionTitle>

              {section.paragraphs?.map((paragraph, pIndex) => (
                <LegalParagraph key={pIndex}>{paragraph}</LegalParagraph>
              ))}

              {section.list?.length ? (
                <LegalList>
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex}>{item}</li>
                  ))}
                </LegalList>
              ) : null}

              {section.note ? <LegalNote>{section.note}</LegalNote> : null}
            </LegalSection>
          ))}

          <LegalSection>
            <LegalSectionTitle>Más información legal</LegalSectionTitle>

            <LegalLinkGrid>
              <LegalNavCard to="/privacidad">
                <LegalNavTitle>Política de Privacidad</LegalNavTitle>
                <LegalNavText>
                  Tratamiento de datos personales y derechos del usuario.
                </LegalNavText>
              </LegalNavCard>

              <LegalNavCard to="/cookies">
                <LegalNavTitle>Política de Cookies</LegalNavTitle>
                <LegalNavText>
                  Uso de cookies, preferencias y configuración del consentimiento.
                </LegalNavText>
              </LegalNavCard>

              <LegalNavCard to="/terminos">
                <LegalNavTitle>Términos y Condiciones</LegalNavTitle>
                <LegalNavText>
                  Reglas de acceso, uso y funcionamiento de la plataforma.
                </LegalNavText>
              </LegalNavCard>

              <LegalNavCard to="/pagos-y-suscripciones">
                <LegalNavTitle>Pagos y Suscripciones</LegalNavTitle>
                <LegalNavText>
                  Planes, renovaciones, cancelaciones y reembolsos.
                </LegalNavText>
              </LegalNavCard>

              <LegalNavCard to="/aviso-legal">
                <LegalNavTitle>Aviso Legal</LegalNavTitle>
                <LegalNavText>
                  Identidad del titular, contacto y marco legal general.
                </LegalNavText>
              </LegalNavCard>
            </LegalLinkGrid>
          </LegalSection>
        </LegalBodyWrap>
      </LegalPageContainer>
    </LegalPageShell>
  );
}