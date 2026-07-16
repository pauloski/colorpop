/* ============================================================
   Color Pop Store — interacciones mínimas (JS vanilla)
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

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

    var onScroll = function () {
      var show = window.scrollY > 500;
      waFloat.style.opacity = show ? "1" : "0";
      waFloat.style.pointerEvents = show ? "auto" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var video = document.querySelector(".hero-video");
  if (!video) return;

  // Respeta a quien pidió menos movimiento: deja el póster fijo.
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (calm.matches) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  // El clip solo gasta batería mientras el hero está a la vista.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var p = video.play();
          if (p) p.catch(function () {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 }).observe(video);
  }
})();
