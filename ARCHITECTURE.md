# TaxiRadar24 — ARCHITECTURE.md

---

# 1. VISIÓN DEL SISTEMA

TaxiRadar24 es una plataforma SaaS profesional orientada a:

* Formación (Academia Taxi)
* Herramientas operativas para taxistas
* Escalabilidad hacia múltiples verticales (tools, ecommerce, analytics)

El sistema está diseñado como una **arquitectura modular, desacoplada y escalable**, donde cada capa tiene una responsabilidad clara.

---

# 2. PRINCIPIOS DE ARQUITECTURA

## 2.1 Un solo origen de verdad

* Auth → Firebase Authentication
* Datos → Firestore + D1
* Navegación → AuthContext + postAuthResolver
* Dominio → taxiradar24.com

## 2.2 Dominio único para experiencia estable

Toda la experiencia del usuario debe vivir bajo:

https://taxiradar24.com

Evitar:

* múltiples dominios en auth
* cross-domain OAuth
* inconsistencias entre entornos

## 2.3 Separación clara de responsabilidades

El sistema se divide en capas:

1. Frontend (React SPA)
2. Auth Layer (Firebase)
3. Backend APIs (Cloudflare Workers)
4. Data Layer (Firestore + D1)
5. Payments (Stripe)

---

# 3. STACK TECNOLÓGICO

## Frontend

* React
* React Router v6
* Styled Components
* Webpack
* JavaScript (NO TypeScript)

## Backend / Servicios

* Firebase Authentication
* Firebase Firestore
* Cloudflare Workers
* Cloudflare D1
* Stripe

## Infraestructura

* Firebase Hosting (principal frontend + auth domain)
* Cloudflare (DNS + CDN + Workers)
* GitHub (control de versiones)

---

# 4. ARQUITECTURA GENERAL

## 4.1 Flujo principal del sistema

```text
Usuario
   ↓
Frontend (React SPA)
   ↓
AuthContext (estado global)
   ↓
Firebase Auth
   ↓
Firestore / D1 / Worker
   ↓
UI renderizada
```

---

## 4.2 Capas del sistema

### Capa 1 — Frontend (UI)

Responsabilidad:

* renderizar interfaz
* capturar interacción del usuario
* delegar lógica

No debe:

* contener lógica de negocio crítica de auth
* decidir navegación compleja

---

### Capa 2 — Auth Orchestration (CRÍTICA)

Componentes:

* AuthContext.js
* authIntentService.js
* postAuthResolver.js

Responsabilidad:

* recuperar sesión
* resolver identidad
* decidir destino final

👉 Es el **cerebro del sistema**

---

### Capa 3 — Auth Transport

Responsabilidad:

* login Google
* login email/password
* login SMS

No decide navegación.

---

### Capa 4 — Backend

Responsabilidad:

* lógica de negocio
* validación
* integración Stripe
* APIs

Tecnología:

* Cloudflare Workers

---

### Capa 5 — Data

Responsabilidad:

* persistencia

Tecnología:

* Firestore (usuarios, progreso)
* D1 (suscripciones, logs)

---

### Capa 6 — Payments

Responsabilidad:

* suscripciones
* facturación

Tecnología:

* Stripe

---

# 5. DOMINIOS Y HOSTING

## Regla crítica

```text
Frontend + Auth deben compartir dominio
```

Dominio oficial:

https://taxiradar24.com

---

## Distribución

* Firebase Hosting → frontend principal
* Firebase Auth → auth domain
* Cloudflare → DNS + proxy + APIs

---

## Prohibido

* usar firebaseapp.com en producción como dominio visible
* mezclar múltiples dominios en OAuth
* redirecciones cruzadas sin control

---

# 6. NAVEGACIÓN GLOBAL

La navegación se basa en:

* SmartNavigation
* AuthContext
* postAuthResolver

## Regla principal

```text
Solo una capa decide el destino final
```

👉 postAuthResolver

---

## Flujo de navegación

1. Usuario intenta acceder a ruta
2. Si requiere auth → login
3. Se guarda intención (authIntentService)
4. Tras login:

   * AuthContext recupera sesión
   * postAuthResolver decide destino
5. Navegación final única

---

# 7. VERTICALES DEL PRODUCTO

TaxiRadar24 está dividido en:

## 7.1 Academia

* DEMO
* PRO (Stripe)

Rutas:

* /academia/demo
* /academia/pro

---

## 7.2 Herramientas

* uso operativo para taxistas

Rutas:

* /herramientas
* /herramientas/flights
* etc.

---

## Regla

El sistema debe respetar siempre la intención del usuario:

```text
Si vino a Tools → vuelve a Tools
Si vino a Academia → vuelve a Academia
```

---

# 8. CONTROL DE ACCESO

El acceso depende de:

* estado auth
* email verificado
* teléfono verificado
* suscripción activa

---

## Flujo lógico

```text
NO AUTH → login
AUTH sin email → check-email
AUTH sin teléfono → verify
AUTH OK + sin PRO → demo/upgrade
AUTH OK + PRO → acceso completo
```

---

# 9. SISTEMA DE SUSCRIPCIÓN

Stripe controla:

* planes
* pagos
* renovación

Datos almacenados en:

* D1 → academy_subscriptions

El frontend consulta estado antes de permitir acceso PRO.

---

# 10. ESCALABILIDAD

La arquitectura está diseñada para soportar:

* nuevos providers de auth
* nuevos planes
* nuevas verticales
* marketplace
* herramientas premium
* dashboards avanzados

---

# 11. PRINCIPIOS CLAVE

## 11.1 No duplicar lógica

Especialmente en:

* auth
* navegación
* routing

---

## 11.2 Centralizar decisiones

Todo debe pasar por:

* AuthContext
* postAuthResolver

---

## 11.3 Evitar acoplamiento

UI no debe depender de:

* Firebase directamente
* Workers directamente
* lógica de negocio compleja

---

## 11.4 Pensar en móvil y PWA primero

El sistema debe funcionar perfectamente en:

* móvil web
* PWA móvil
* PWA escritorio

---

# 12. ANTI-PATTERNS (PROHIBIDO)

❌ múltiples capas navegando a la vez
❌ lógica auth repartida
❌ usar popup como único método
❌ depender de location.state para redirect
❌ mezclar dominios en OAuth
❌ romper AuthContext

---

# 13. FILOSOFÍA FINAL

TaxiRadar24 no es una web.

Es una plataforma SaaS profesional.

Por tanto:

* la arquitectura manda sobre el código
* la consistencia manda sobre la velocidad
* la escalabilidad manda sobre soluciones rápidas

---

# 14. CONTROL DE NAVEGACIÓN (CRÍTICO)

El sistema debe garantizar que solo una capa controle la navegación.

---

## Regla absoluta

```text
postAuthResolver decide
AuthContext ejecuta
el resto NO navega
---

# FIN
