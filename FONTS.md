# Agent Fonts — TaxiRadar24

## Objetivo

Este documento reúne las reglas tipográficas para mejorar la experiencia de lectura larga con un nivel profesional inspirado en interfaces como ChatGPT, sin romper el diseño visual ya construido de TaxiRadar24.

## Regla principal

La prioridad es mejorar la lectura, no rediseñar la interfaz.

### Nunca tocar

* fondos
* colores corporativos
* degradados
* sombras
* bordes
* radios
* espaciado estructural
* layout
* hover visual
* efectos ya aprobados

### Sí tocar

* font-size
* font-weight
* line-height
* letter-spacing
* jerarquía tipográfica
* consistencia entre títulos, subtítulos y párrafos

## Base tipográfica oficial

Usar siempre la familia tipográfica del theme:

```js
font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Tokens oficiales del theme

Usar siempre los tokens ya definidos en `themes.js`.

### Font sizes

* `xs` = 0.8125rem (13px)
* `sm` = 0.9375rem (15px)
* `md` = 1rem (16px)
* `lg` = 1.125rem (18px)
* `xl` = 1.75rem (28px)
* `xxl` = 2.25rem (36px)
* `hero` = 2.75rem (44px aprox)

### Font weights

* `regular` = 400
* `medium` = 500
* `semibold` = 600
* `bold` = 700
* `heavy` = 800

### Line heights

* `tight` = 1.15
* `heading` = 1.22
* `title` = 1.28
* `body` = 1.65
* `relaxed` = 1.75

### Letter spacings

* `tighter` = -0.03em
* `tight` = -0.02em
* `normal` = -0.01em
* `wide` = 0em

## Principios de lectura larga estilo ChatGPT

### 1. Párrafos cómodos

Para texto de lectura real, usar siempre:

```js
font-size: ${({ theme }) => theme.fontSizes.md};
font-weight: ${({ theme }) => theme.fontWeights.regular};
line-height: ${({ theme }) => theme.lineHeights.body};
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### 2. Subtítulos claros

Para subtítulos o bloques introductorios:

```js
font-size: ${({ theme }) => theme.fontSizes.lg};
font-weight: ${({ theme }) => theme.fontWeights.regular};
line-height: ${({ theme }) => theme.lineHeights.body};
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### 3. Títulos firmes

Para títulos de sección:

```js
font-size: ${({ theme }) => theme.fontSizes.xl};
font-weight: ${({ theme }) => theme.fontWeights.bold};
line-height: ${({ theme }) => theme.lineHeights.heading};
letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
```

### 4. Hero con presencia

Para hero titles:

```js
font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes.hero});
font-weight: ${({ theme }) => theme.fontWeights.heavy};
line-height: 1.04;
letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
```

## Escala recomendada por tipo de elemento

### Etiquetas pequeñas / badges / tags

Usar:

```js
font-size: ${({ theme }) => theme.fontSizes.xs};
font-weight: ${({ theme }) => theme.fontWeights.medium};
line-height: 1.2;
letter-spacing: 0.08em;
text-transform: uppercase;
```

### Botones

Solo mejorar legibilidad, no el look visual:

```js
font-size: ${({ theme }) => theme.fontSizes.md};
font-weight: ${({ theme }) => theme.fontWeights.semibold};
line-height: 1.2;
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### Stats / números destacados

```js
font-weight: ${({ theme }) => theme.fontWeights.heavy};
line-height: 1;
letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
```

### Labels pequeños debajo de números

```js
font-size: ${({ theme }) => theme.fontSizes.sm};
font-weight: ${({ theme }) => theme.fontWeights.regular};
line-height: 1.35;
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### Cards

En cards, priorizar claridad:

* título de card: `lg` o `xl` según tamaño visual actual
* texto de card: `md`
* pills: `xs`

## Reglas de seguridad para no romper diseño

### Prohibido

* aumentar un título si eso cambia el equilibrio del layout
* cambiar un `color` aunque parezca mejorar contraste
* meter blur, glass o transparencias nuevas por una mejora tipográfica
* modificar paddings para compensar una mala tipografía sin permiso
* sustituir fondos sólidos por gradientes
* tocar `background`, `box-shadow`, `border`, `hover`

### Permitido

* reemplazar valores hardcodeados por tokens del theme
* ajustar `font-size` un escalón arriba o abajo si mejora lectura sin mover layout
* corregir line-height demasiado apretado
* corregir letter-spacing excesivo o ausente
* cambiar pesos 650/750 irregulares por `semibold`, `bold` o `heavy`

## Criterios prácticos por pantalla

### Home

Mantener exactamente:

* fondo profundo TaxiRadar24
* colores amarillo, verde, azul y grises corporativos
* sombras y bordes actuales

Solo mejorar:

* hero subtitle
* section subtitles
* textos de cards
* stats labels
* pills si están demasiado pequeñas

### En todas las pantallas 

Mantener:

* fondo ya aprobado
* cards y CTA actuales

Mejorar:

* HeroTitle
* HeroSubtitle
* títulos de card
* textos de explicación

### En todas las pantallas 

Mantener:

* color de fondo institucional
* navegación ya aprobada

Mejorar:

* lectura de módulos
* labels y bloques de ayuda
* cards explicativas
* listados largos

## Método correcto de actualización

Siempre aplicar en este orden:

1. revisar si el estilo actual ya funciona visualmente
2. no tocar color ni fondo
3. pasar font-size a tokens del theme
4. pasar font-weight a tokens del theme
5. ajustar line-height
6. ajustar letter-spacing
7. comprobar que el layout no cambió
8. comprobar que el contraste visual sigue igual

## Plantillas recomendadas

### Párrafo profesional largo

```js
font-size: ${({ theme }) => theme.fontSizes.md};
font-weight: ${({ theme }) => theme.fontWeights.regular};
line-height: ${({ theme }) => theme.lineHeights.body};
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### Subtítulo destacado

```js
font-size: ${({ theme }) => theme.fontSizes.lg};
font-weight: ${({ theme }) => theme.fontWeights.regular};
line-height: ${({ theme }) => theme.lineHeights.body};
letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
```

### Título de sección

```js
font-size: ${({ theme }) => theme.fontSizes.xl};
font-weight: ${({ theme }) => theme.fontWeights.bold};
line-height: ${({ theme }) => theme.lineHeights.heading};
letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
```

### HeroTitle premium

```js
font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes.hero});
font-weight: ${({ theme }) => theme.fontWeights.heavy};
line-height: 1.04;
letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
```

### Card title

```js
font-size: ${({ theme }) => theme.fontSizes.lg};
font-weight: ${({ theme }) => theme.fontWeights.semibold};
line-height: ${({ theme }) => theme.lineHeights.title};
letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
```

### Micro label

```js
font-size: ${({ theme }) => theme.fontSizes.xs};
font-weight: ${({ theme }) => theme.fontWeights.medium};
line-height: 1.2;
letter-spacing: 0.08em;
text-transform: uppercase;
```

## Señales de que una tipografía está mal

* párrafos cansan al leer más de 10 segundos
* texto parece bonito pero cuesta seguirlo
* títulos se ven “pesados” o demasiado negros
* subtítulos compiten con títulos
* labels parecen débiles o borrosos
* cards con demasiado texto se sienten densas
* en móvil todo se ve correcto pero no cómodo

## Señales de que está bien

* el ojo sigue la lectura sin esfuerzo
* hay aire entre líneas
* la jerarquía se entiende sin pensar
* el usuario puede leer varios bloques seguidos sin fatiga
* el diseño se siente premium sin que sepamos exactamente por qué

## Filosofía final

La tipografía en TaxiRadar24 no debe llamar la atención por sí sola.
Debe hacer que todo se entienda mejor, durante más tiempo, sin cansancio y sin tocar la identidad visual de la marca.

La consigna es:

**mejorar lectura, no rediseñar interfaz**
