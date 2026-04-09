# TaxiRadar24 — AUTH_SYSTEM.md

---

# 1. OBJETIVO DEL SISTEMA DE AUTENTICACIÓN

El sistema de autenticación de TaxiRadar24 debe ofrecer una experiencia:

* estable
* segura
* coherente
* escalable
* preparada para móvil web, PWA móvil y PWA escritorio

Su misión no es solo autenticar usuarios, sino también:

* recuperar sesión correctamente
* preservar la intención de navegación
* validar identidad
* decidir el destino final sin ambigüedad

---

# 2. PRINCIPIO CENTRAL

```text
AuthContext es la única fuente de verdad para sesión e identidad.
```

Ninguna pantalla debe tomar decisiones de autenticación complejas por su cuenta.

Toda resolución final debe pasar por:

* `AuthContext.js`
* `authIntentService.js`
* `postAuthResolver.js`

---

# 3. COMPONENTES PRINCIPALES

## 3.1 `AuthContext.js`

Responsable de:

* iniciar y recuperar sesión Firebase
* resolver Google redirect
* hidratar `users/{uid}`
* hidratar `progress/{uid}`
* hidratar suscripción
* exponer estado auth global
* activar la resolución central de navegación

Es el **orquestador global**.

---

## 3.2 `authIntentService.js`

Responsable de:

* guardar intención post-login
* recuperar intención tras redirect/reload
* limpiar intención cuando ya no es necesaria

Debe usar:

* `localStorage` para datos críticos de continuidad

Nunca debe depender únicamente de:

* `location.state`
* `sessionStorage`

---

## 3.3 `postAuthResolver.js`

Responsable de:

* recibir el estado auth e identidad
* decidir una única ruta final

Debe resolver, como mínimo:

* no autenticado
* conflicto de identidad
* email no verificado
* teléfono no verificado
* intención restaurada
* driver default
* pro default
* demo default

Es la **única capa de decisión final**.

---

## 3.4 `userIDService.js`

Responsable de:

* login Google
* login email/password
* verificación de email
* persistencia de datos auth mínimos
* gestión técnica del provider

No debe decidir navegación compleja de negocio.

---

## 3.5 `RequirePlan.js`

Responsable de:

* proteger rutas
* validar acceso por plan
* respetar el resultado del resolver

No debe convertirse en un segundo motor de auth.

---

## 3.6 `LoginScreen.js`

Responsable de:

* mostrar UI de acceso
* invocar login
* mostrar mensajes
* delegar el destino final al sistema central

No debe duplicar la lógica de resolución final.

---

# 4. PRINCIPIOS RECTORES

## 4.1 Redirect-first

La política oficial del proyecto es:

* desktop web: popup permitido
* móvil web: redirect
* PWA móvil: redirect
* PWA escritorio: redirect

El flujo base de TaxiRadar24 debe considerarse:

```text
redirect-first
```

Popup es una optimización, no la base del sistema.

---

## 4.2 Dominio unificado

El auth domain de producción debe permanecer alineado con el dominio principal:

```text
taxiradar24.com
```

Está prohibido reintroducir en producción flujos cruzados entre:

* dominio principal
* `firebaseapp.com`

salvo revisión explícita.

---

## 4.3 Nunca perder intención

Si el usuario inicia sesión desde:

* `/herramientas`
* `/herramientas/flights`
* `/academia/pro`
* `/academia/upgrade`

la app debe recordar esa intención y restaurarla tras login o verificación pendiente.

---

## 4.4 Una sola decisión final

Después del login, solo debe existir una respuesta final válida.

Está prohibido que varias capas naveguen simultáneamente.

---

# 5. MODELO DE ESTADOS

## Estados mínimos recomendados

* `anonymous`
* `auth_redirect_pending`
* `authenticated_unresolved`
* `email_verification_required`
* `phone_verification_required`
* `identity_conflict`
* `ready_demo`
* `ready_pro`
* `ready_tools`
* `ready_hybrid`

---

## Regla

El sistema debe poder explicar en qué estado se encuentra el usuario en cada momento.

No se permite un flujo basado en muchos `if` desordenados sin una noción clara de estado.

---

# 6. FLUJO GLOBAL OFICIAL

## 6.1 Inicio de login

1. usuario pulsa login
2. se guarda intención vía `authIntentService`
3. se inicia transport auth (`Google`, `email`, etc.)

---

## 6.2 Recuperación

1. `AuthContext` detecta sesión o redirect pendiente
2. resuelve `getRedirectResult()`
3. espera `onAuthStateChanged`
4. carga `users/{uid}`
5. carga `progress/{uid}`
6. carga suscripción

---

## 6.3 Resolución

1. recupera intención guardada
2. evalúa identidad
3. `postAuthResolver` decide ruta final
4. se navega una sola vez

---

# 7. REGLAS DE IDENTIDAD

## 7.1 Email verificado

El sistema debe poder saber si el usuario tiene email verificado.

Si no lo tiene:

```text
/check-email
```

---

## 7.2 Teléfono verificado

El sistema debe poder saber si el usuario tiene teléfono verificado.

Si no lo tiene:

```text
/verify
```

---

## 7.3 Conflicto de identidad

Si existe conflicto de identidad:

```text
/identity-merge
```

Debe tener prioridad sobre otros destinos.

---

## 7.4 Orden de prioridad

La prioridad recomendada es:

1. conflicto de identidad
2. email pendiente
3. teléfono pendiente
4. intención persistida
5. role-based destination
6. plan-based fallback
7. fallback general

---

# 8. REGLAS DE NAVEGACIÓN POST-AUTH

## 8.1 Tools primero si esa era la intención

Si el usuario venía desde Tools y completa identidad:

* debe volver a Tools

Ejemplo:

```text
/herramientas/flights
```

---

## 8.2 PRO primero si esa era la intención

Si el usuario venía desde upgrade o pro:

* debe volver al flujo correspondiente

---

## 8.3 Nunca mandar al usuario a un destino genérico si había intención válida

No se debe reemplazar una intención válida por:

* `/`
* `/academia/demo`
* `/academia/pro`

salvo que la intención ya no aplique.

---

# 9. REGLAS DE PERSISTENCIA

## 9.1 `localStorage`

Usar para:

* `postLoginIntent`
* contexto persistente post-redirect
* flags críticas resistentes a reload

---

## 9.2 `sessionStorage`

Usar solo para:

* flags temporales del flujo
* soporte secundario
* datos no críticos

---

## 9.3 Estado React

Usar solo para:

* loaders
* banners
* mensajes
* estado local de UI

---

# 10. REGLAS PARA `AuthContext`

`AuthContext` debe:

* separar `authLoading` de `identityLoading`
* no cerrar carga antes de terminar recovery real
* no delegar resolución final a múltiples pantallas
* mantener consistencia de sesión
* limpiar intención solo cuando ya no es necesaria

---

## Prohibido en `AuthContext`

* lógica visual innecesaria
* imports pesados no justificados
* navegación duplicada sin pasar por resolver
* sobrecargar el arranque con trabajo no crítico

---

# 11. REGLAS PARA `postAuthResolver`

`postAuthResolver` debe ser:

* puro
* determinista
* fácil de testear
* sin side-effects

Debe recibir contexto y devolver:

```js
{
  path: "/ruta",
  reason: "MOTIVO"
}
```

Nunca debe:

* llamar a Firebase
* tocar UI
* escribir storage
* hacer navegación por sí mismo

---

# 12. REGLAS PARA `authIntentService`

Debe ser obligatorio cuando:

* login se lanza desde ruta protegida
* login se lanza desde Tools
* login se lanza desde upgrade
* login se lanza desde PRO

Debe guardar como mínimo:

```json
{
  "redirectTo": "/ruta",
  "source": "origen",
  "createdAt": "timestamp"
}
```

---

# 13. ROLES Y DESTINOS

## Driver

Si no hay intención pendiente y el usuario es driver:

```text
/herramientas
```

---

## PRO

Si no hay intención pendiente y el usuario es PRO:

```text
/academia/pro
```

---

## DEMO

Si no hay intención pendiente y no es PRO:

```text
/academia/demo
```

---

# 14. REGLAS DE UX

## 14.1 Nunca dejar al usuario sin feedback

Mientras se resuelve auth:

* mostrar estado visual claro

Ejemplos:

* “Comprobando sesión…”
* “Recuperando tu acceso…”
* “Preparando tu espacio…”

---

## 14.2 Nunca pedir dos veces lo mismo sin explicación

No duplicar:

* verificación de email
* verificación de teléfono

---

## 14.3 No usar alerts como solución final

Preferir:

* banners
* cards
* mensajes integrados
* toasts

---

# 15. REGLAS DE INFRAESTRUCTURA

## 15.1 Auth domain

Producción debe usar:

```text
taxiradar24.com
```

---

## 15.2 Handler OAuth

Debe permanecer bajo el mismo dominio de producto.

---

## 15.3 Google OAuth

Cualquier cambio en:

* `authDomain`
* authorized origins
* redirect URIs
* Firebase Hosting

debe considerarse **cambio crítico de arquitectura auth**.

---

# 16. MATRIZ DE PRUEBAS OBLIGATORIA

## Entornos

* Chrome desktop
* Safari iPhone
* Chrome Android
* PWA iPhone
* PWA Android
* PWA escritorio

---

## Casos mínimos

* login Google desde home
* login Google desde Tools
* login Google desde PRO
* login email/password
* email no verificado
* teléfono no verificado
* conflicto de identidad
* logout + nuevo login
* refresh tras redirect
* reapertura de app en mitad del flujo

---

## Resultado esperado

* una sola resolución final
* cero rutas muertas
* cero navegación errática
* recuperación correcta de intención
* identidad correctamente respetada

---

# 17. ANTI-PATTERNS (PROHIBIDO)

❌ depender solo de `location.state.redirectTo`
❌ usar `sessionStorage` como única base de continuidad
❌ duplicar resolución en `LoginScreen`, `RequirePlan`, `CheckEmailScreen`
❌ reintroducir cross-domain auth
❌ múltiples listeners compitiendo por navegar
❌ hacer de cada guard un motor auth paralelo

---

# 18. FILOSOFÍA FINAL

TaxiRadar24 no debe “hacer login”.

TaxiRadar24 debe:

* recuperar contexto
* reconstruir intención
* validar identidad
* decidir una única ruta coherente
* dar al usuario una experiencia sólida y premium

La consigna del sistema es:

```text
una sola sesión, una sola intención, una sola resolución final
```

---

# 19. SINGLE NAVIGATION LOCK (CRÍTICO)

Para evitar navegación duplicada y comportamientos erráticos:

Solo una capa puede ejecutar navegación después del login.

Regla:

* AuthContext ejecuta navegación UNA sola vez
* postAuthResolver decide el destino
* ningún otro componente puede navegar en paralelo

---

## Implementación recomendada

Se debe usar un flag global:

authNavigationResolved

Mientras este flag no sea true:

* ninguna pantalla debe navegar
* ningún guard debe redirigir

Una vez se navega:

* se marca como true
* se bloquean nuevas navegaciones

---

## Prohibido

❌ navegar desde LoginScreen después de login  
❌ navegar desde RequirePlan durante resolución  
❌ usar useEffect con navigate sin control  
❌ múltiples navigate() tras auth  

---

## Objetivo

Garantizar:

```text
UNA sesión → UNA decisión → UNA navegación

# FIN
