# ARCADE · Web para sala de Realidad Virtual 🥽

Landing page estática (HTML + CSS + JS puro, sin dependencias) lista para desplegar en **GitHub Pages**.

## 📁 Estructura

```
├── index.html      # Página principal
├── styles.css      # Estilos (tema neón/gaming, responsive)
├── script.js       # Menú móvil, animaciones, contadores y formulario
├── 404.html        # Página de error personalizada
├── .nojekyll       # Desactiva Jekyll en GitHub Pages
└── .github/workflows/deploy.yml  # Despliegue automático con GitHub Actions
```

## 🚀 Cómo desplegar en GitHub Pages

1. Sube este repositorio a GitHub.
2. Ve a **Settings → Pages → Build and deployment** y en **Source** selecciona **"GitHub Actions"** (el workflow ya está configurado).
3. Cada *push* a la rama `main` publica la web automáticamente.
4. La URL será `https://<tu-usuario>.github.io/<nombre-repo>/`.

> Alternativa sin Actions: Settings → Pages → Source: **Deploy from a branch** → rama `main` / carpeta `/ (root)`.

## ✏️ Personalizar

Edita estos datos antes de publicar:

- **Email del negocio**: en `script.js` (`EMAIL_NEGOCIO`) y en el footer de `index.html`.
- **Teléfono, dirección y horarios**: sección footer de `index.html`.
- **Precios y experiencias**: secciones `#precios` y `#experiencias` de `index.html`.
- **Redes sociales**: enlaces en el footer (ahora mismo `#`).

## 📬 Formulario de reservas

GitHub Pages es 100% estático, así que el formulario abre el cliente de correo
del visitante con la reserva rellenada (mailto). Si prefieres recibir las
reservas en un panel o email sin depender del correo del cliente, conecta el
`<form>` con un servicio gratuito como **Formspree**:

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

## 🖥️ Probar en local

```bash
python3 -m http.server 8080
# abre http://localhost:8080
```
