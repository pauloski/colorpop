/* ============================================================
   Color Pop Store — interacciones mínimas (JS vanilla)
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    // Abre / cierra el menú móvil
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    // Cierra el menú al pulsar un enlace
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  // Muestra el botón flotante solo tras hacer scroll fuera del hero
  var waFloat = document.querySelector(".wa-float");
  if (waFloat) {
    waFloat.style.opacity = "0";
    waFloat.style.pointerEvents = "none";
    waFloat.style.transition = "opacity .3s ease, transform .18s ease";

    var onScroll = function () {
      var show = window.scrollY > 500;
      waFloat.style.opacity = show ? "1" : "0";
      waFloat.style.pointerEvents = show ? "auto" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
