# TaxiRadar24 — ENGINEERING_RULES.md

---

# 1. OBJETIVO

Este documento define las reglas de desarrollo, rendimiento, arquitectura técnica y UI para TaxiRadar24.

Su propósito es garantizar:

* estabilidad
* rendimiento
* coherencia
* escalabilidad
* calidad profesional tipo SaaS

---

# 2. REGLAS PRINCIPALES

## 2.1 No romper la arquitectura

Está prohibido:

* duplicar lógica de auth
* crear navegación paralela
* romper AuthContext
* saltarse postAuthResolver
* modificar rutas sin control

---

## 2.2 Extender, no reescribir

Cuando modifiques código:

* preservar lógica existente
* extender comportamiento
* evitar refactors innecesarios

---

## 2.3 Una sola fuente de verdad

Siempre respetar:

* Auth → AuthContext
* navegación → postAuthResolver
* intención → authIntentService

---

## 2.4 Mobile-first real

Todo debe funcionar correctamente en:

* móvil web
* PWA móvil
* PWA escritorio

No diseñar solo para desktop.

---

# 3. REGLAS DE IMPORTS Y BUNDLE

## 3.1 Nunca importar librerías pesadas globalmente

Evitar en:

* App.js
* AuthContext.js
* layouts globales

Especial cuidado con:

* firebase/*
* leaflet
* react-leaflet
* JSON grandes

---

## 3.2 Lazy loading obligatorio

Pantallas grandes deben cargarse así:

```js
const Screen = lazy(() => import("./Screen"));
```

---

## 3.3 Carga diferida interna

Dentro de componentes pesados:

```js
const { getAuth } = await import("firebase/auth");
```

---

## 3.4 No romper code splitting

No hacer:

```js
import BigScreen from "./BigScreen";
```

en rutas principales.

---

# 4. REGLAS DE FIREBASE

## 4.1 Nunca usar Firebase directamente en UI

❌ Prohibido:

```js
import { getAuth } from "firebase/auth";
```

---

## 4.2 Usar servicios centralizados

Siempre usar:

* firebaseConfig.js
* firestoreService.js

---

## 4.3 Todo Firebase debe ser lazy

Ejemplo:

```js
const auth = await getAuth();
```

---

## 4.4 No duplicar lógica Firebase

Centralizar siempre en servicios.

---

# 5. REGLAS DE MAPAS (LEAFLET)

## 5.1 Nunca cargar mapas en arranque

Leaflet solo debe cargar:

* dentro de su pantalla
* bajo demanda

---

## 5.2 Componentes de mapa lazy

El mapa debe ser un módulo separado.

---

# 6. REGLAS DE IMÁGENES

## 6.1 Usar public/assets

```js
const logo = "/assets/logo.png";
```

---

## 6.2 No importar imágenes pesadas desde src

---

## 6.3 Optimización obligatoria

Preferir:

* webp
* png ligero

---

# 7. REGLAS DE RUTAS

## 7.1 Todas las rutas grandes deben ser lazy

Especialmente:

* Academia
* Tools
* Perfil
* Mapas

---

## 7.2 No mezclar DEMO y PRO en bundle inicial

---

## 7.3 Mantener consistencia de rutas

```text
/academia
/academia/demo
/academia/pro
/herramientas
/perfil
```

---

# 8. REGLAS DE CONTEXTOS

## 8.1 Contextos ligeros

AuthContext debe:

* cargar solo lo necesario
* usar async controlado

---

## 8.2 No bloquear UI sin feedback

Nunca devolver null en cargas críticas.

---

# 9. REGLAS DE PERFORMANCE

## 9.1 Objetivos

* main bundle ligero
* carga rápida en móvil
* evitar re-render innecesario

---

## 9.2 Límites orientativos

* main < 300kb gzip
* chunks grandes revisados

---

## 9.3 Revisar siempre después de cambios

Si crece el bundle:

* analizar
* optimizar
* no ignorar

---

# 10. REGLAS DE UI / STYLES

## 10.1 Usar Styled Components

Prohibido:

* CSS modules
* inline styles
* Tailwind

---

## 10.2 Usar theme.js

Ejemplo:

```js
color: ${({ theme }) => theme.pro.text};
```

---

## 10.3 No romper diseño visual

No modificar:

* fondos
* colores corporativos
* sombras
* bordes

---

## 10.4 Tipografía

Seguir reglas de:

* FONTS.md

---

# 11. REGLAS DE UX

## 11.1 Experiencia SaaS

Inspiración:

* Stripe
* Notion
* Binance

---

## 11.2 No usar soluciones básicas

Evitar:

* alert()
* UX pobre
* mensajes sin contexto

---

## 11.3 Feedback constante

Siempre mostrar:

* loading
* estado
* progreso

---

# 12. REGLAS DE STORAGE

## 12.1 localStorage

Usar para:

* intención post-login
* Comportamiento correcto
si el usuario inicia sesión desde Home, volver a Home
si inicia sesión desde Herramientas, volver a Herramientas
si inicia sesión desde Academia, volver a Academia
si cierra sesión, quedarse en la zona que estaba viendo, no mandarlo siempre al Home

---

## 12.2 sessionStorage

Solo para:

* flags temporales

---

# 13. REGLAS DE DEPENDENCIAS

Antes de añadir una librería:

* revisar tamaño
* evaluar alternativas
* comprobar tree-shaking
* evaluar carga lazy

---

# 14. REGLAS DE BUILD

## 14.1 Mantener Webpack optimizado

No romper:

* splitChunks
* runtimeChunk

---

## 14.2 Revisar duplicados

Evitar assets duplicados en:

* src/
* public/

---

# 15. REGLAS DE DEBUG

Cuando algo falla:

1. revisar consola
2. revisar network
3. revisar bundle
4. revisar imports
5. revisar rutas
6. revisar auth flow

---

# 16. ANTI-PATTERNS (PROHIBIDO)

❌ lógica pesada en App.js
❌ Firebase directo en componentes
❌ rutas no lazy
❌ duplicar lógica auth
❌ romper AuthContext
❌ múltiples sistemas de navegación
❌ mezclar dominios en auth

---

# 17. CHECKLIST ANTES DE SUBIR CÓDIGO

Antes de cada cambio:

* ¿esto afecta al arranque?
* ¿es lazy?
* ¿rompe navegación?
* ¿rompe auth?
* ¿duplica lógica?
* ¿impacta bundle?

---

# 18. FILOSOFÍA FINAL

TaxiRadar24 debe comportarse como una plataforma profesional.

Cada decisión debe responder:

```text
¿esto escala y mantiene estabilidad?
```

Si la respuesta es no:

👉 no es válido

---

# 19. NAVIGATION CONTROL RULE (CRÍTICO)

## Regla

Nunca permitir múltiples llamadas a navigate() durante el flujo de autenticación.



## Problema típico

```text
AuthContext → navigate
LoginScreen → navigate
RequirePlan → navigate

---
# FIN
