/* ============ ARCADE VR · Interacción ============ */
(function () {
  "use strict";

  /* ---- Menú móvil ---- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });
    // Cerrar el menú al pulsar un enlace
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- Animaciones al hacer scroll (IntersectionObserver) ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Contadores animados del hero ---- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".stat-num[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---- Formulario de reservas ----
     GitHub Pages es estático: no hay servidor. Abrimos el cliente de correo
     con la solicitud rellenada. Si quieres recibir los datos en un formulario
     real, conecta el action del form con Formspree, Getform o Google Forms. */
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");
  const EMAIL_NEGOCIO = "hola@arcadevr.es"; // <-- cambia por tu email real

  if (form && status) {
    // Fecha mínima = hoy
    const fecha = form.querySelector("#fecha");
    if (fecha) fecha.min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validación simple
      let valid = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const empty = !input.value.trim();
        input.classList.toggle("invalid", empty);
        if (empty) valid = false;
      });

      if (!valid) {
        status.textContent = "⚠️ Rellena los campos obligatorios (nombre, email y fecha).";
        status.className = "form-status err";
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      const cuerpo =
        `Nombre: ${data.nombre}\n` +
        `Email: ${data.email}\n` +
        `Fecha preferida: ${data.fecha}\n` +
        `Nº de jugadores: ${data.personas}\n\n` +
        `Mensaje:\n${data.mensaje || "(sin mensaje)"}`;

      const mailto =
        `mailto:${EMAIL_NEGOCIO}` +
        `?subject=${encodeURIComponent("Reserva VR - " + data.nombre)}` +
        `&body=${encodeURIComponent(cuerpo)}`;

      window.location.href = mailto;

      status.textContent = "✅ ¡Gracias! Se ha abierto tu cliente de correo para enviar la solicitud. Si no se abre, escríbenos a " + EMAIL_NEGOCIO;
      status.className = "form-status ok";
      form.reset();
    });

    // Quitar marca de error al escribir
    form.querySelectorAll("input, select, textarea").forEach((el) =>
      el.addEventListener("input", () => el.classList.remove("invalid"))
    );
  }

  /* ---- Año dinámico en el footer ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
