# ✍️ Peeps Generator

![Peeps Generator](https://res.cloudinary.com/dcav0ojcf/image/upload/v1767064041/videos%20de%20webs%28en%20uso%2C%20no%20borrar%29/hero_kkpcfd.jpg)

**Peeps Generator** es una librería pensada para desarrolladores que necesitan crear avatares divertidos y únicos en sus aplicaciones.  
Con ella podés:

- 🎲 **Generar avatares aleatorios** o determinísticos usando un `seed`.
- 🎨 **Personalizar cada parte del avatar** (cabeza, cara, accesorios, barba/bigote, fondo, colores, etc).
- 🖼️ **Renderizar en SVG** listo para ser enviado al frontend y renderizado en el navegador.
- 📤 **Exportar a PNG, JPEG, WebP o AVIF** para guardar o compartir en cualquier plataforma.
- ⚙️ **Integrar un editor visual en tu frontend**, generando los avatares desde el servidor.

La librería está diseñada para ser **simple, modular y extensible**: podés usarla tanto en proyectos Node.js como en aplicaciones web modernas.

## 🔗 Enlaces oficiales

- 📦 **Repositorio en GitHub**  
  https://github.com/Fr4nco77/Peeps-Generator

- 🎨 **Editor visual online (demo)**  
  https://peep-generator.vercel.app/

## 📦 Instalación

Puedes instalar **Peeps Generator** con tu gestor de paquetes favorito:

### Usando pnpm

```bash
pnpm add peeps-generator
```

### Usando npm

```bash
npm install peeps-generator
```

### Usando yarn

```bash
yarn add peeps-generator
```

### Usando bun

```bash
bun add peeps-generator
```

## 🧠 Entorno de ejecución (importante)

**Peeps Generator está diseñada para ejecutarse en entornos Node.js.**

La librería utiliza APIs nativas de Node para funcionar correctamente, entre ellas:

- Acceso al sistema de archivos para cargar los assets SVG
- Procesamiento y composición de imágenes
- Exportación a formatos rasterizados mediante `sharp`

Por esta razón, la generación del avatar **no ocurre en el navegador**, sino en el entorno donde corre Node.

### ✔️ Entornos soportados

- Node.js
- Backends (Express, Fastify, Nest, etc.)
- Server-Side Rendering (SSR) ejecutado en Node, por ejemplo:
  - Next.js (`runtime: "nodejs"`)
  - Remix (Node adapter)
  - Astro con SSR en Node
- Scripts, workers o pipelines de generación de imágenes

### ❌ Entornos no soportados directamente

- Navegador (browser puro)
- Aplicaciones React/Vite ejecutadas solo del lado del cliente
- Edge runtimes (Cloudflare Workers, Vercel Edge, etc.)

> Si querés usar Peeps Generator en una aplicación web,  
> la generación del avatar debe realizarse **del lado del servidor**,  
> y luego enviar el SVG o la imagen resultante al frontend.

Esta decisión es intencional y permite que la librería sea **simple, predecible y consistente**, evitando duplicar lógica o introducir dependencias específicas del navegador.

## 🎨 Editor visual (demo interactiva)

Si estás construyendo un frontend o tenés dudas sobre cómo integrar **Peeps Generator** en una aplicación web,  
podés probar el **editor visual online**:

👉 https://peep-generator.vercel.app/

Este editor:

- Genera los avatares desde el **servidor**
- Renderiza el SVG en el navegador
- Permite activar o desactivar capas
- Cambiar tamaños, seed y combinaciones
- Descargar el avatar en distintos formatos

Es un ejemplo real de cómo usar la librería en un entorno **Next.js con SSR**,  
y puede servirte como referencia arquitectónica si querés implementar tu propio editor o configurador.

## 🧩 Uso

Con **Peeps Generator**, todo comienza con una sola función: `createPeep`.  
Es el núcleo de la librería: allí vive la lógica que genera los avatares peeps y compone cada una de sus partes.
Su resultado es un string que contiene un SVG completo, ya compuesto y listo para renderizar o exportar.

### Crea tu primer peep

```ts
import { createPeep } from "peeps-generator";

const svg = createPeep();
```

Este llamado genera un peep aleatorio con una configuración mínima, donde solo se renderizan las capas esenciales:

- Un avatar monocromático
- Sin background
- Sin accesorios
- Sin vello facial

---

### Controlar las capas del avatar (`enable*`)

Un peep se construye por capas.  
Cada capa puede existir o no, según tu intención.

Para eso están las opciones `enable*`.

```ts
import { createPeep } from "peeps-generator";

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

### Controlar el tamaño del avatar

Podés definir el tamaño final del avatar usando la opción `size`.

```ts
import { createPeep } from "peeps-generator";

const svg = createPeep({
  size: 128,
});
```

Esto genera un avatar de **128 × 128 píxeles.**

#### ¿Qué hace size?

- Define el ancho y alto del SVG final.
- Mantiene todas las proporciones del avatar.
- No afecta la lógica de generación ni las partes internas.

#### Valor por defecto

Si no se especifica size, se genera un avatar de **600x600 pixeles**.

#### Ejemplos comunes

```ts
createPeep({ size: 64 }); // iconos, listas
createPeep({ size: 256 }); // previews
createPeep({ size: 1024 }); // exportación o impresión
```

---

### Usar `seed` generación reproducible

El `seed` permite que la generación del peep sea **determinística**.  
Esto significa que, usando la misma semilla, el resultado visual será siempre el mismo.

```ts
import { createPeep } from "peeps-generator";

const svg = createPeep({
  seed: "usuario123",
  enableAccessories: true,
  enableFacialHair: true,
});
```

En este ejemplo, el texto `"usuario123"` se utiliza como semilla para la generación.
Mientras el `seed` no cambie, el peep generado será idéntico en cada ejecución.

Esto es útil para:

- Avatares asociados a un usuario
- Identidades visuales persistentes
- Sistemas donde el avatar no debe cambiar con el tiempo

Si no se especifica un seed, cada llamada a createPeep puede producir un peep distinto.

---

### Crear un peep personalizado o parcialmente aleatorio

Además de la generación automática, **Peeps Generator** permite definir manualmente algunas o todas las partes del peep y dejar que la librería complete el resto.

Esto se hace usando la opción `peep`.

```ts
import { createPeep } from "peeps-generator";

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

- La cabeza y la cara están definidas explícitamente
- El color de cabello y de piel se establecen manualmente
- Los accesorios se generan de forma aleatoria
- El color de fondo se genera automáticamente

---

#### Opciones de personalización disponibles

Al crear un peep, podés definir de forma opcional cualquiera de las siguientes propiedades dentro de `peep`:

| Propiedad     | Descripción               | Tipo de valor                     |
| ------------- | ------------------------- | --------------------------------- |
| `head`        | Tipo de cabeza o peinado  | String de `peepParts.heads`       |
| `face`        | Expresión facial          | String de `peepParts.faces`       |
| `hairColor`   | Color del cabello         | String (color CSS)                |
| `skinColor`   | Color de piel             | String (color CSS)                |
| `facialHair`  | Tipo de vello facial      | String de `peepParts.facialHair`  |
| `accessories` | Accesorios                | String de `peepParts.accessories` |
| `background`  | Color de fondo del avatar | String (color CSS)                |

Estas opciones solo se aplican si la capa correspondiente está habilitada mediante las opciones `enable*`.

---

#### Personalización completa o parcial

- Si definís **todas** las propiedades, el peep será completamente personalizado y no habrá decisiones aleatorias.
- Si definís **solo algunas**, la librería generará automáticamente las partes faltantes.
- Si no definís **ninguna**, el peep se generará de forma completamente aleatoria.

El sistema solo decide aquellas partes que no fueron especificadas y que están habilitadas mediante las opciones `enable*`.

---

### Acceso a las partes de un peep

**Peeps Generator** expone el listado completo de partes disponibles para cada capa del avatar: cabezas, caras, accesorios y vello facial.

Estos listados contienen los nombres exactos de cada asset, y representan el universo visual con el que trabaja la biblioteca.  
Usarlos garantiza que cualquier combinación que elijas sea válida y renderizable.

Para acceder a estas partes, simplemente importalas desde la biblioteca:

```ts
import { peepParts } from "peeps-generator";

const { heads, faces, accessories, facialHair } = peepParts;
```

Tener acceso a estas partes permite, por ejemplo:

- Construir editores visuales o configuradores de avatar
- Crear selectores o formularios guiados
- Validar entradas del usuario antes de generar un peep
- Generar previews, catálogos o grids de avatares
- Limitar o expandir opciones según reglas propias de tu aplicación

De esta forma, **Peeps Generator** no solo genera avatares:  
también te da las piezas para diseñar experiencias alrededor de ellos.

---

### ¿Qué puedo hacer con el SVG que devuelve?

El resultado de `createPeep` no es un objeto complejo ni una estructura opaca:  
es **un string SVG puro**.

Ese string es, al mismo tiempo:

- Texto que podés guardar, enviar o transformar
- Una imagen vectorial lista para renderizar
- Un formato independiente de framework o plataforma

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
import { toPNG } from "peeps-generator";

const pngBuffer = await toPNG(svg);
```

### Convertir a JPEG

```ts
import { toJPEG } from "peeps-generator";

const jpegBuffer = await toJPEG(svg);
```

### Convertir a WebP

```ts
import { toWebP } from "peeps-generator";

const webpBuffer = await toWebP(svg);
```

### Convertir a AVIF

```ts
import { toAvif } from "peeps-generator";

const avifBuffer = await toAvif(svg);
```

Cada una de estas funciones recibe el string SVG y devuelve un buffer de imagen listo para:

- Guardar en disco
- Enviar por API
- Subir a un CDN
- Usar en procesos de generación de asset

---

### Notas importantes sobre la exportación

- Las funciones de exportación funcionan en Node.js.
- Internamente utilizan sharp.
- Devuelven un Buffer listo para guardar en disco, enviar por red o procesar.

## ⚠️ Errores comunes y soluciones

### Error 500 en `/api` en producción (funciona en local)

**Síntomas**

- `POST /api 500 (Internal Server Error)`
- La aplicación funciona correctamente en desarrollo local
- En los logs de Vercel aparece un error similar a:

```text
ENOENT: no such file or directory, open
.../node_modules/peeps-generator/dist/assets/heads/SomeFile.svg
```

### Causa

`peeps-generator` carga archivos SVG desde su carpeta interna
`dist/assets`.

En entornos serverless (como Vercel), **Next.js no incluye automáticamente
archivos estáticos que están dentro de `node_modules`**, a menos que se
indique explícitamente durante el build.

Por eso, en producción la API no encuentra los SVG necesarios y falla.

---

### Solución

1. **Forzar runtime Node.js en la ruta API**

   ```ts
   export const runtime = "nodejs";
   ```

   **`peeps-generator` no es compatible con Edge Runtime.**

2. **Incluir los assets del generador en next.config.ts**

   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     outputFileTracingIncludes: {
       "/api/**": ["node_modules/peeps-generator/dist/assets/**/\*"],
     },
   };

   export default nextConfig;
   ```

3. **Volver a desplegar el proyecto**

Luego de aplicar los cambios:

- Si es necesario, limpiar la caché del build
- Hacer un nuevo deploy en Vercel

## 🪶 Créditos y atribución

Los assets visuales utilizados por **Peeps Generator** están inspirados en
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
