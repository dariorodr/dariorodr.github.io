# Darío Rodríguez — Portfolio

Sitio de una sola página: hero, sobre mí, proyectos y contacto. HTML, CSS y JavaScript puro — sin frameworks ni build step, así que se puede publicar directo en GitHub Pages.

## Estructura

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── cv.pdf              ← agregar cuando esté listo
    └── projects/           ← capturas opcionales de los proyectos
```

## Cómo publicarlo en GitHub Pages (gratis)

1. Creá un repositorio nuevo en GitHub, por ejemplo `dariorodr.github.io` (ese nombre exacto hace que quede en `https://dariorodr.github.io`, sin subcarpeta).
2. Subí el contenido de esta carpeta a la raíz del repo:
   ```bash
   git init
   git add .
   git commit -m "primer commit del portfolio"
   git branch -M main
   git remote add origin https://github.com/dariorodr/dariorodr.github.io.git
   git push -u origin main
   ```
3. Si en cambio usás un nombre de repo distinto (por ejemplo `portfolio`), andá a **Settings → Pages** en GitHub, elegí la rama `main` y la carpeta `/ (root)`. El sitio queda en `https://dariorodr.github.io/portfolio/`.
4. Esperá uno o dos minutos y el sitio va a estar online.

## Pendientes para completar

- **CV**: colocar el archivo en `assets/cv.pdf` (el botón "Descargar CV" ya apunta ahí).
- **Video del segundo proyecto (Cocina de Temporada)**: subí el video a YouTube (puede ser "no listado") y reemplazá el `href="#"` del enlace con clase `video-pending` en `index.html` por la URL del video.
- **Capturas de proyectos** (opcional): si más adelante querés reemplazar los mockups CSS por capturas reales, agregalas en `assets/projects/` y cambiá los bloques `.project__visual` en `index.html` por una etiqueta `<img>`.

## Edición rápida

Todo el texto vive en `index.html`. Los colores, tipografías y espaciados están centralizados como variables CSS al inicio de `css/style.css` (bloque `:root`), así que cambiar el acento de color o la tipografía es cuestión de tocar esas pocas líneas.
