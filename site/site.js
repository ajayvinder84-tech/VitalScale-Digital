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
