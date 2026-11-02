// NDIS policy checklist page: counts the ticks and clears them. Nothing is saved or sent anywhere.
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
