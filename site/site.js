var loadedAt = Date.now();

document.addEventListener("submit", function (e) {
  var form = e.target.closest("form.enquiry");
  if (!form) return;
  e.preventDefault();
  // Bot check: how long the form was open, measured on the visitor's own clock.
  if (form.elements.elapsed) form.elements.elapsed.value = String(Date.now() - loadedAt);
  var status = form.querySelector(".form-status");
  var btn = form.querySelector("button[type=submit]");
  // A logo has to be a PNG, JPG or PDF under 3 MB (the same limit the server checks).
  var logo = form.elements.logo && form.elements.logo.files && form.elements.logo.files[0];
  if (logo && (logo.size > 3 * 1024 * 1024 || !/^(image\/png|image\/jpeg|application\/pdf)$/.test(logo.type))) {
    status.textContent = "Please choose a PNG, JPG or PDF logo under 3 MB, or leave it out.";
    form.elements.logo.focus();
    return;
  }
  btn.disabled = true; status.textContent = "Sending…";
  fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
    .then(function (r) {
      if (!r.ok) {
        // A 400 explains what to fix (for example the logo); anything else is a sending problem.
        return r.json().catch(function () { return {}; }).then(function (body) {
          var problem = new Error("not sent");
          problem.userMessage = r.status === 400 && body.error ? body.error : "";
          throw problem;
        });
      }
      // The start-offer forms go to their own thank-you page, which says what happens next.
      var thanks = form.getAttribute("data-thanks");
      if (thanks) { window.location.assign(thanks); return; }
      form.reset(); status.textContent = form.getAttribute("data-success") || "Thanks, your enquiry has been sent. Ajay will reply to you personally.";
      form.dispatchEvent(new CustomEvent("enquiry:sent", { bubbles: true }));
    })
    .catch(function (err) { status.textContent = (err && err.userMessage) || "Sorry, that didn't send. Please try again in a moment."; })
    .finally(function () { btn.disabled = false; });
});

// Phone menu: the three-line button opens and closes the links. Choosing a link,
// or pressing Escape, closes it again.
var header = document.querySelector(".site-header");
var navToggle = header && header.querySelector(".nav-toggle");
if (navToggle) {
  var setMenu = function (open) {
    header.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };
  navToggle.addEventListener("click", function () { setMenu(!header.classList.contains("nav-open")); });
  header.querySelector(".nav").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
}

// Soft fade-up as sections come into view. Skipped when the visitor has turned motion off,
// and everything stays visible if the browser has no IntersectionObserver.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var revealItems = document.querySelectorAll("main section:not(.hero) :is(.section-head, .service, .facts li, .split > *, .cta, .other-card, .work-card, .price-card, .price-row, .change, .faq details)");
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add("in"); revealObserver.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  revealItems.forEach(function (el) {
    // Things already on screen when the page opens are shown straight away
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("reveal");
    // Cards in the same row arrive one after another, not all at once
    var place = Array.prototype.indexOf.call(el.parentNode.children, el);
    if (place > 0 && place < 6) el.style.transitionDelay = (place * 80) + "ms";
    revealObserver.observe(el);
  });
}
