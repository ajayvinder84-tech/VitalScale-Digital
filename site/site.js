var loadedAt = Date.now();

document.addEventListener("submit", function (e) {
  var form = e.target.closest("form.enquiry");
  if (!form) return;
  e.preventDefault();
  // Bot check: how long the form was open, measured on the visitor's own clock.
  if (form.elements.elapsed) form.elements.elapsed.value = String(Date.now() - loadedAt);
  var status = form.querySelector(".form-status");
  var btn = form.querySelector("button[type=submit]");
  btn.disabled = true; status.textContent = "Sending…";
  fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
    .then(function (r) {
      if (!r.ok) throw new Error();
      form.reset(); status.textContent = "Thanks, your enquiry has been sent. Ajay will reply to you personally.";
    })
    .catch(function () { status.textContent = "Sorry, that didn't send. Please try again in a moment."; })
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
