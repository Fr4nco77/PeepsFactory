# 🧑‍🎨 Peeps Factory

**Generador de avatares SVG dinámicos, personalizables y exportables.**

## 📖 Descripción

**Peeps Factory** es una librería pensada para desarrolladores que necesitan crear avatares divertidos y únicos en sus aplicaciones.  
Con ella podés:

- 🎲 **Generar avatares aleatorios** o determinísticos usando un `seed`.
- 🎨 **Personalizar cada parte del avatar** (cabeza, cara, accesorios, barba/bigote, fondo).
- 🖼️ **Renderizar en SVG** para usar directamente en el frontend.
- 📤 **Exportar a PNG, JPEG, WebP o AVIF** para guardar o compartir en cualquier plataforma.
- ⚙️ **Integrar un editor visual** en tu frontend para que los usuarios creen y descarguen sus propios avatares.

La librería está diseñada para ser **simple, modular y extensible**: podés usarla tanto en proyectos Node.js como en aplicaciones web modernas.

## 📦 Instalación

Puedes instalar **Peeps Factory** con tu gestor de paquetes favorito:

### Usando pnpm

```bash
pnpm add peeps-factory
```

### Usando npm

```bash
npm install peeps-factory
```

### Usando yarn

```bash
yarn add peeps-factory
```

### Usando bun

```bash
bun add peeps-factory
```

## 🚀 Uso básico

En **Peeps Factory**, crear un avatar es un acto simple:  
elegir piezas y dejar que el SVG las una en un solo rostro.

### Crear un avatar con `createPeep`

```ts
import { createPeep } from "peeps-factory";

const svg = createPeep(
  {
    head: "Bun",
    face: "Smile",
    accesories: "Glasses", //OPCIONAL
    facialHair: "Goatee 1", //OPCIONAL
  },
  "#F2F2F2",
);
```

La función `createPeep` recibe dos argumentos:

- **La configuración del avatar**, donde cada propiedad corresponde a una parte visual.
- **Un color de fondo opcional**, que se renderiza como un rectángulo detrás del avatar.

Devuelve un **string SVG completo**, ya compuesto y listo para usar.

---

### ¿Qué puedo hacer con el SVG que devuelve?

El SVG resultante es un texto, pero también es una imagen viva.  
Con él podés:

- **Renderizarlo directamente en el DOM**:

  ```jsx
  <div dangerouslySetInnerHTML={{ __html: svg }} />
  ```

- **Usarlo como `src` en una imagen** (codificado en base64).
- **Guardarlo como archivo `.svg`**.
- **Convertirlo a PNG, JPEG, WebP o AVIF**.
- **Enviarlo por API o almacenarlo en una base de datos**.

Mientras sea texto, el avatar puede viajar.

---

### Acceder a las opciones disponibles

La librería expone todas las opciones visuales para que puedas construir selectores, editores o validaciones.

```ts
import { peepParts } from "peeps-factory";

const { heads, faces, accessories, facialHair } = peepParts;
```

## 🎲 Generación aleatoria y determinística

No siempre hace falta elegir cada rasgo.  
A veces, dejar decidir al azar es parte del encanto.

Para eso existe `createRandomPeep`.


### Crear un avatar aleatorio

```ts
import { createRandomPeep } from "peeps-factory";

const svg = createRandomPeep();
```

Este llamado genera un avatar completamente aleatorio, combinando las partes disponibles.

Cada ejecución produce un resultado distinto.

---

### Usar un seed para resultados reproducibles

Si le pasás un seed, el azar se vuelve predecible.
La misma semilla siempre genera el mismo rostro.

```ts
import { createRandomPeep } from "peeps-factory";

const svg = createRandomPeep("usuario123");
```

Esto es especialmente útil para:

- Avatares basados en username
- Perfiles persistentes
- Sistemas donde el avatar debe mantenerse estable en el tiempo

Mientras el seed sea el mismo,
el avatar no cambia.

---

### Agregar un color de fondo

Tanto en la generación aleatoria como en la determinística, podés agregar un color de fondo como segundo argumento.

```ts
import { createRandomPeep } from "peeps-factory";

const svg = createRandomPeep("usuario123", "#EFEFEF");
```

El fondo se renderiza como un rectángulo que ocupa todo el lienzo del SVG, detrás del avatar.

---

### ¿Cómo funciona internamente?

El seed se transforma en un número y se utiliza para seleccionar, de forma determinística, cada parte del avatar.

No hay estado interno.
No hay base de datos.
Solo una función pura que siempre responde igual.

## 🧩 Generar solo la configuración del avatar

A veces no necesitás la imagen todavía.  
Solo querés la idea del rostro, sus piezas, su estructura.

Para eso existe `randomPeep`.

### Obtener un avatar sin renderizar

```ts
import { randomPeep } from "peeps-factory";

const peep = randomPeep("usuario123");
```

Al igual que "createRandomPeep" usa opcionalmente una seed ramdomPeep tambien lo hace. Esto devuelve un objeto con la configuración del avatar:

```ts
{
  head: "Long Curly",
  face: "Calm",
  accesories: "Glasses 2",
  facialHair: "Moustache 4"
}
```

No se genera ningún SVG en este paso.
Solo datos

---

### ¿Para qué sirve randomPeep?

Separar la generación del render permite:

- Guardar la configuración en una base de datos
- Construir editores visuales
- Previsualizar cambios antes de renderizar
- Reutilizar el mismo avatar en distintos formatos

Cuando lo necesites, podés pasar esta configuración a createPeep.

```ts
import { createPeep, randomPeep } from "peeps-factory";

const svg = createPeep(peep, "#F5F5F5");
```

## 🖼️ Exportación de imágenes

El SVG es el origen.
Pero a veces necesitás píxeles.

Peeps Factory permite convertir el SVG generado a distintos formatos de imagen.

Convertir SVG a PNG

```ts
import { toPNG } from "peeps-factory";

const pngBuffer = await toPNG(svg);
```

Convertir SVG a JPEG

```ts
import { toJPEG } from "peeps-factory";

const jpegBuffer = await toJPEG(svg);
```

Convertir SVG a WebP

```ts
import { toWebP } from "peeps-factory";

const webpBuffer = await toWebP(svg);
```

Convertir SVG a AVIF

```ts
import { toAvif } from "peeps-factory";

const avifBuffer = await toAvif(svg);
```

---

### Notas importantes sobre la exportación

- Las funciones de exportación funcionan en Node.js.
- Internamente utilizan sharp.
- Devuelven un Buffer listo para guardar en disco, enviar por red o procesar.

## 🪶 Créditos y atribución

Los assets visuales utilizados por **Peeps Factory** están inspirados en  
**Open Peeps**, una colección de ilustraciones creada por Pablo Stanley.

Proyecto original:  
https://www.openpeeps.com/

Esta librería no busca reemplazar ni redistribuir el proyecto original,  
sino ofrecer una forma programática de **componer, combinar y generar avatares**  
a partir de ilustraciones modulares.

Todo el mérito artístico pertenece a su autor original.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Esto significa que podés:

- Usarlo en proyectos personales o comerciales
- Modificarlo libremente
- Redistribuirlo
- Integrarlo en tus propias aplicaciones

Siempre que se mantenga la nota de copyright y la licencia original.

El código es libre.  
Los rostros también.
