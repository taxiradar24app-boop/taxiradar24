// src/PrivacyPolicies/CookieConsent.js
import React, { useEffect, useMemo, useState } from "react";
import {
  Overlay,
  Modal,
  TopBar,
  SummaryBar,
  SummaryLeft,
  SummaryIcon,
  SummaryTextWrap,
  SummaryTitle,
  SummaryText,
  SummaryActions,
  SummaryButton,
  SummaryConfigButton,
  DetailChevron,
  Content,
  Hero,
  Title,
  Subtitle,
  Highlight,
  Grid,
  LeftColumn,
  RightColumn,
  Card,
  CardTitle,
  CardText,
  CategoryList,
  CategoryRow,
  CategoryInfo,
  CategoryName,
  CategoryDesc,
  AlwaysOn,
  Toggle,
  SectionTitle,
  LegalAccordion,
  LegalItem,
  LegalHeader,
  LegalHeaderLeft,
  LegalHeaderTitle,
  LegalHeaderSub,
  Plus,
  LegalBody,
  Footer,
  FooterText,
  ActionRow,
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  ButtonIcon,
  ButtonTextWrap,
  ButtonLabel,
  ButtonSub,
} from "./CookieConsentStyle";

const STORAGE_KEY = "taxiradar24_cookie_consent_v1";
const STATUS_KEY = "taxiradar24_cookie_consent_status_v1";

const legalItemsSeed = [
  {
    id: "privacy",
    title: "Política de Privacidad",
    subtitle: "Cómo tratamos tus datos personales en TaxiRadar24.",
    body: (
      <>
        Explica cómo se recogen, usan, almacenan y protegen los datos personales
        del usuario dentro de la plataforma.
        <br />
        <br />
        <a href="/#/privacidad">Leer política completa</a>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Política de Cookies",
    subtitle: "Qué cookies utilizamos, para qué sirven y cómo configurarlas.",
    body: (
      <>
        Detalla las cookies necesarias y las opcionales, así como la forma de
        aceptar, rechazar o guardar preferencias.
        <br />
        <br />
        <a href="/#/cookies">Leer política completa</a>
      </>
    ),
  },
  {
    id: "terms",
    title: "Términos y Condiciones de Uso",
    subtitle:
      "Normas de acceso, uso de la plataforma y condiciones del servicio.",
    body: (
      <>
        Regula las condiciones de acceso a TaxiRadar24, uso permitido, cuenta del
        usuario, contenidos, propiedad intelectual y límites de responsabilidad.
        <br />
        <br />
        <a href="/#/terminos">Leer términos completos</a>
      </>
    ),
  },
  {
    id: "payments",
    title: "Pagos, Suscripciones y Stripe",
    subtitle: "Cobros, renovaciones, cancelaciones y reembolsos.",
    body: (
      <>
        Describe cómo funcionan las suscripciones, los pagos, la renovación, la
        cancelación y la relación con Stripe como proveedor de pago.
        <br />
        <br />
        <a href="/#/pagos-y-suscripciones">Leer política de pagos</a>
      </>
    ),
  },
  {
    id: "legal",
    title: "Aviso Legal",
    subtitle: "Identidad del responsable, contacto y datos legales del sitio.",
    body: (
      <>
        Incluye la identificación del titular del sitio, contacto y aspectos
        legales básicos del servicio.
        <br />
        <br />
        <a href="/#/aviso-legal">Leer aviso legal</a>
      </>
    ),
  },
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [openItems, setOpenItems] = useState({
    privacy: false,
    cookies: true,
    terms: false,
    payments: false,
    legal: false,
  });

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  });

  useEffect(() => {
    const status = localStorage.getItem(STATUS_KEY);
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          necessary: true,
          analytics: !!parsed.analytics,
          preferences: !!parsed.preferences,
          marketing: !!parsed.marketing,
        });
      } catch (error) {
        console.error("No se pudieron leer las preferencias de cookies:", error);
      }
    }

    if (!status) {
      setVisible(true);
    }
  }, []);

  const legalItems = useMemo(() => legalItemsSeed, []);

  const saveConsent = (newPrefs, status) => {
    const safePrefs = {
      necessary: true,
      analytics: !!newPrefs.analytics,
      preferences: !!newPrefs.preferences,
      marketing: !!newPrefs.marketing,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(safePrefs));
    localStorage.setItem(STATUS_KEY, status);
    setVisible(false);
    setDetailsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent(
      {
        necessary: true,
        analytics: true,
        preferences: true,
        marketing: true,
      },
      "accepted_all"
    );
  };

  const handleRejectAll = () => {
    saveConsent(
      {
        necessary: true,
        analytics: false,
        preferences: false,
        marketing: false,
      },
      "rejected_all"
    );
  };

  const handleSavePreferences = () => {
    saveConsent(preferences, "customized");
  };

  const toggleLegalItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const togglePreference = (key) => {
    if (key === "necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };



  if (!visible) return null;

  return (
    <Overlay>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <TopBar>
          <SummaryBar>
            <SummaryLeft>
              <SummaryIcon>🛡️</SummaryIcon>

              <SummaryTextWrap>
                <SummaryTitle>Configurar privacidad</SummaryTitle>
                <SummaryText>
                  Puedes activar las cookies opcionales, mantener solo las
                  necesarias o revisar el centro de privacidad.
                </SummaryText>
              </SummaryTextWrap>
            </SummaryLeft>

            <SummaryActions>
              <SummaryButton type="button" onClick={handleAcceptAll}>
                Activar opcionales
              </SummaryButton>

              <SummaryButton type="button" onClick={handleRejectAll}>
                Solo necesarias
              </SummaryButton>

              <SummaryConfigButton
                type="button"
                onClick={() => setDetailsOpen((prev) => !prev)}
                aria-expanded={detailsOpen}
                aria-controls="cookie-consent-details"
              >
                Ver centro de privacidad y consentimiento
                <DetailChevron $open={detailsOpen}>⌄</DetailChevron>
              </SummaryConfigButton>
            </SummaryActions>
          </SummaryBar>


        </TopBar>

        {detailsOpen && (
          <Content id="cookie-consent-details">
            <Hero>
              <Title id="cookie-consent-title">
                Tu privacidad también forma parte de la experiencia.
              </Title>

              <Subtitle>
                Utilizamos tecnologías necesarias para el funcionamiento de la
                plataforma y, si tú lo autorizas, también para{" "}
                <Highlight>analítica</Highlight>,{" "}
                <Highlight>preferencias</Highlight> y{" "}
                <Highlight>medición</Highlight>. Puedes aceptar, rechazar o
                configurar tu consentimiento con total claridad.
              </Subtitle>
            </Hero>

            <Grid>
              <LeftColumn>
                <Card>
                  <CardTitle>Configuración de cookies</CardTitle>
                  <CardText>
                    Las cookies necesarias permanecen activas para que la web
                    funcione correctamente. El resto solo se activarán si tú lo
                    decides.
                  </CardText>

                  <CategoryList>
                    <CategoryRow>
                      <CategoryInfo>
                        <CategoryName>Necesarias</CategoryName>
                        <CategoryDesc>
                          Seguridad, navegación, autenticación y funcionamiento
                          esencial del sitio.
                        </CategoryDesc>
                      </CategoryInfo>
                      <AlwaysOn>Siempre activas</AlwaysOn>
                    </CategoryRow>

                    <CategoryRow>
                      <CategoryInfo>
                        <CategoryName>Preferencias</CategoryName>
                        <CategoryDesc>
                          Guardan ajustes como idioma, visualización o
                          experiencia personalizada.
                        </CategoryDesc>
                      </CategoryInfo>
                      <Toggle
                        type="button"
                        aria-label="Activar o desactivar preferencias"
                        $active={preferences.preferences}
                        onClick={() => togglePreference("preferences")}
                      />
                    </CategoryRow>

                    <CategoryRow>
                      <CategoryInfo>
                        <CategoryName>Analítica</CategoryName>
                        <CategoryDesc>
                          Nos ayudan a entender el uso de la plataforma para
                          mejorar contenidos y rendimiento.
                        </CategoryDesc>
                      </CategoryInfo>
                      <Toggle
                        type="button"
                        aria-label="Activar o desactivar analítica"
                        $active={preferences.analytics}
                        onClick={() => togglePreference("analytics")}
                      />
                    </CategoryRow>

                    <CategoryRow>
                      <CategoryInfo>
                        <CategoryName>Marketing y medición</CategoryName>
                        <CategoryDesc>
                          Permiten medir campañas o acciones promocionales si
                          las activas expresamente.
                        </CategoryDesc>
                      </CategoryInfo>
                      <Toggle
                        type="button"
                        aria-label="Activar o desactivar marketing"
                        $active={preferences.marketing}
                        onClick={() => togglePreference("marketing")}
                      />
                    </CategoryRow>
                  </CategoryList>
                </Card>
              </LeftColumn>

              <RightColumn>
                <Card>
                  <SectionTitle>Información legal</SectionTitle>

                  <LegalAccordion>
                    {legalItems.map((item) => {
                      const isOpen = openItems[item.id];

                      return (
                        <LegalItem key={item.id}>
                          <LegalHeader
                            type="button"
                            onClick={() => toggleLegalItem(item.id)}
                            aria-expanded={isOpen}
                          >
                            <LegalHeaderLeft>
                              <LegalHeaderTitle>
                                {item.title}
                              </LegalHeaderTitle>
                              <LegalHeaderSub>{item.subtitle}</LegalHeaderSub>
                            </LegalHeaderLeft>

                            <Plus $open={isOpen}>{isOpen ? "−" : "+"}</Plus>
                          </LegalHeader>

                          {isOpen && <LegalBody>{item.body}</LegalBody>}
                        </LegalItem>
                      );
                    })}
                  </LegalAccordion>
                </Card>
              </RightColumn>
            </Grid>

            <Footer>
              <FooterText>
                Puedes cambiar tu consentimiento más adelante desde la
                configuración de privacidad o el pie de página.
              </FooterText>

              <ActionRow>
                <PrimaryButton type="button" onClick={handleAcceptAll}>
                  <ButtonIcon>✓</ButtonIcon>
                  <ButtonTextWrap>
                    <ButtonLabel>Activar opcionales</ButtonLabel>
                    <ButtonSub>
                      Aceptar preferencias, analítica y medición
                    </ButtonSub>
                  </ButtonTextWrap>
                </PrimaryButton>

                <SecondaryButton type="button" onClick={handleRejectAll}>
                  <ButtonIcon $light>✕</ButtonIcon>
                  <ButtonTextWrap>
                    <ButtonLabel>Solo necesarias</ButtonLabel>
                    <ButtonSub>
                      Desactivar todas las categorías opcionales
                    </ButtonSub>
                  </ButtonTextWrap>
                </SecondaryButton>

                <TertiaryButton type="button" onClick={handleSavePreferences}>
                  <ButtonTextWrap>
                    <ButtonLabel>Guardar selección</ButtonLabel>
                    <ButtonSub>
                      Aplicar solo lo que has elegido
                    </ButtonSub>
                  </ButtonTextWrap>
                </TertiaryButton>
              </ActionRow>
            </Footer>
          </Content>
        )}
      </Modal>
    </Overlay>
  );
}