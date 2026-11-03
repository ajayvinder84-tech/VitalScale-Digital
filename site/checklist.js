// NDIS policy checklist page: counts the ticks and clears them (nothing is saved or sent anywhere),
// and starts the PDF download once the "Get the checklist" form has been sent.
(function () {
  var boxes = document.querySelectorAll(".cl-box");
  var count = document.querySelector("[data-cl-count]");
  var clear = document.querySelector(".cl-clear");
  if (!boxes.length || !count) return;
  function update() {
    var n = 0;
    for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) n++;
    count.textContent = String(n);
  }
  document.addEventListener("change", function (e) {
    if (e.target.classList && e.target.classList.contains("cl-box")) update();
  });
  if (clear) clear.addEventListener("click", function () {
    for (var i = 0; i < boxes.length; i++) boxes[i].checked = false;
    update();
  });
  update();
})();
(function () {
  var unlock = document.getElementById("cl-unlock");
  if (!unlock) return;
  document.addEventListener("enquiry:sent", function (e) {
    if (!e.target.closest || !e.target.closest("#updates")) return;
    unlock.hidden = false;
    var link = unlock.querySelector("a[download]");
    if (link) link.click();
  });
})();
