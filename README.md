# 🧑‍🎨 Peeps Factory

**Generador de avatares SVG dinámicos, personalizables y exportables.**

## 📖 Descripción

**Peeps Factory** es una librería pensada para desarrolladores que necesitan crear avatares divertidos y únicos en sus aplicaciones.  
Con ella podés:

- 🎲 **Generar avatares aleatorios** o determinísticos usando un `seed`.
- 🎨 **Personalizar cada parte del avatar** (cabeza, cara, accesorios, barba/bigote, fondo, colores, etc).
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

En **Peeps Factory**, todo comienza con una sola función: `createPeep`.  
Es el núcleo de la librería: allí vive la lógica que genera los avatares peeps y compone cada una de sus partes.
Su resultado es un string que contiene un SVG completo, ya compuesto y listo para renderizar o exportar.

### Crea tu primer peep

```ts
import { createPeep } from "peeps-factory";

const svg = createPeep();
```

Este llamado genera un peep aleatorio con una configuración mínima, donde solo se renderizan las capas esenciales:

- un avatar monocromático
- sin background
- sin accesorios
- sin vello facial

---

### Controlar las capas del avatar (`enable*`)

Un peep se construye por capas.  
Cada capa puede existir o no, según tu intención.

Para eso están las opciones `enable*`.

```ts
import { createPeep } from "peeps-factory";

const svg = createPeep({
  enableAccessories: true,
  enableFacialHair: true,
  enableBackground: true,
  enableColors: true,
});
```

Estas opciones indican **qué partes pueden aparecer** en el avatar:

- `enableAccessories`  
  Permite que el peep incluya accesorios como anteojos.

- `enableFacialHair`  
  Habilita la generación de barba o bigote.

- `enableColors`  
  Permite que el sistema aplique colores de piel y cabello.

- `enableBackground`  
  Agrega un color de fondo al SVG.

Si una opción no está habilitada, esa capa simplemente no se renderiza.

---

### Usar `seed` generación reproducible

El `seed` permite que la generación del peep sea **determinística**.  
Esto significa que, usando la misma semilla, el resultado visual será siempre el mismo.

```ts
import { createPeep } from "peeps-factory";

const svg = createPeep({
  seed: "usuario123",
  enableAccessories: true,
  enableFacialHair: true,
});
```

En este ejemplo, el texto `"usuario123"` se utiliza como semilla para la generación.
Mientras el `seed` no cambie, el peep generado será idéntico en cada ejecución.

Esto es útil para:

- avatares asociados a un usuario
- identidades visuales persistentes
- sistemas donde el avatar no debe cambiar con el tiempo

Si no se especifica un seed, cada llamada a createPeep puede producir un peep distinto.

---

### Crear un peep personalizado o parcialmente aleatorio

Además de la generación automática, **Peeps Factory** permite definir manualmente algunas o todas las partes del peep y dejar que la librería complete el resto.

Esto se hace usando la opción `peep`.

```ts
import { createPeep } from "peeps-factory";

const svg = createPeep({
  peep: {
    head: "Bun",
    face: "Smile",
    hairColor: "#2E2E2E",
    skinColor: "#F1C27D",
  },
  enableAccessories: true,
  enableBackground: true,
});
```

En este ejemplo:

- la cabeza y la cara están definidas explícitamente
- el color de cabello y de piel se establecen manualmente
- los accesorios se generan de forma aleatoria
- el color de fondo se genera automáticamente

---

#### Opciones de personalización disponibles

Al crear un peep, podés definir de forma opcional cualquiera de las siguientes propiedades dentro de `peep`:

- **head**: tipo de cabeza o peinado
- **face**: expresión facial
- **hairColor**: color del cabello
- **skinColor**: color de piel
- **facialHair**: tipo de vello facial
- **accessories**: accesorios
- **background**: color de fondo

Estas opciones solo se aplican si la capa correspondiente está habilitada mediante las opciones `enable*`.

---

#### Personalización completa o parcial

- Si definís **todas** las propiedades, el peep será completamente personalizado y no habrá decisiones aleatorias.
- Si definís **solo algunas**, la librería generará automáticamente las partes faltantes.
- Si no definís **ninguna**, el peep se generará de forma completamente aleatoria.

El sistema solo decide aquellas partes que no fueron especificadas y que están habilitadas mediante las opciones `enable*`.

---

### Acceso a las partes de un peep

**Peeps Factory** expone el listado completo de partes disponibles para cada capa del avatar: cabezas, caras, accesorios y vello facial.

Estos listados contienen los nombres exactos de cada asset, y representan el universo visual con el que trabaja la biblioteca.  
Usarlos garantiza que cualquier combinación que elijas sea válida y renderizable.

Para acceder a estas partes, simplemente importalas desde la biblioteca:

```ts
import { peepParts } from "peeps-factory";

const { heads, faces, accessories, facialHair } = peepParts;
```

Tener acceso a estas partes permite, por ejemplo:

- construir editores visuales o configuradores de avatar
- crear selectores o formularios guiados
- validar entradas del usuario antes de generar un peep
- generar previews, catálogos o grids de avatares
- limitar o expandir opciones según reglas propias de tu aplicación

De esta forma, **Peeps Factory** no solo genera avatares:  
también te da las piezas para diseñar experiencias alrededor de ellos.

---

### ¿Qué puedo hacer con el SVG que devuelve?

El resultado de `createPeep` no es un objeto complejo ni una estructura opaca:  
es **un string SVG puro**.

Ese string es, al mismo tiempo:

- texto que podés guardar, enviar o transformar
- una imagen vectorial lista para renderizar
- un formato independiente de framework o plataforma

Con él podés:

- **Renderizarlo directamente en el DOM**:

  ```jsx
  <div dangerouslySetInnerHTML={{ __html: svg }} />
  ```

- **Usarlo como `src` de una imagen** (codificado en base64), sin archivos intermedios.
- **Guardarlo como archivo `.svg`**, tal como lo devuelve la función.
- **Convertirlo a otros formatos** como PNG, JPEG, WebP o AVIF, ya sea con las funciones `to*` de la biblioteca o con tus propias herramientas.
- **Enviarlo por API o almacenarlo en una base de datos**, ya que es solo texto

## 🖼️ Exportación de imágenes

El resultado de **createPeep** es siempre un SVG.  
Ese SVG es la fuente original del avatar.

Cuando necesitás trabajar con imágenes rasterizadas (píxeles), la biblioteca permite convertir ese SVG a distintos formatos de imagen mediante las funciones `to*`.

### Convertir a PNG

```ts
import { toPNG } from "peeps-factory";

const pngBuffer = await toPNG(svg);
```

### Convertir a JPEG

```ts
import { toJPEG } from "peeps-factory";

const jpegBuffer = await toJPEG(svg);
```

### Convertir a WebP

```ts
import { toWebP } from "peeps-factory";

const webpBuffer = await toWebP(svg);
```

### Convertir a AVIF

```ts
import { toAvif } from "peeps-factory";

const avifBuffer = await toAvif(svg);
```

Cada una de estas funciones recibe el string SVG y devuelve un buffer de imagen listo para:

- guardar en disco
- enviar por API
- subir a un CDN
- usar en procesos de generación de asset

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
