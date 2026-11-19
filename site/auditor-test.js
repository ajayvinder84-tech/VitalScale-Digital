// The Auditor Test (/auditor-test): one area per screen, then "about you", then details, then the
// results. No cookies and nothing stored in the browser. The wording and scoring come from
// auditor-test-data.js; the answers are sent once, to /api/enquiry, when "Show my results" is pressed.
(function () {
  var T = window.AUDITOR_TEST;
  var form = document.getElementById("at-form");
  var screensBox = document.getElementById("at-screens");
  var resultsBox = document.getElementById("at-results");
  var intro = document.getElementById("at-intro");
  var test = document.getElementById("at-test");
  var startBtn = document.getElementById("at-start");
  if (!T || !form || !startBtn) return;

  var loadedAt = Date.now();
  var HINT = "Please don't include participant names or details.";
  // Where the visitor came from (?from=...), saved with the answers.
  var from = (new URLSearchParams(window.location.search).get("from") || "").replace(/[^\w-]/g, "").slice(0, 60);
  form.elements.from.value = from;

  function esc(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function radios(name, options, legendHtml, cls) {
    return '<fieldset class="at-q ' + (cls || "") + '" data-field="' + name + '"><legend>' + legendHtml + "</legend>" +
      '<div class="at-options">' + options.map(function (option, i) {
        var id = "at-" + name + "-" + i;
        return '<label class="at-option" for="' + id + '"><input type="radio" id="' + id + '" name="' + name + '" value="' + esc(option[0]) + '" required><span>' + esc(option[1]) + "</span></label>";
      }).join("") + '</div><p class="at-error" role="alert" hidden>Please choose an answer.</p></fieldset>';
  }
  function same(options) { return options.map(function (o) { return [o, o]; }); }
  function nav(back, next) {
    return '<div class="at-nav">' + (back ? '<button class="btn btn-ghost" type="button" data-back>Back</button>' : "") +
      '<button class="btn btn-primary" type="' + (next === "Show my results" ? "submit" : "button") + '"' + (next === "Show my results" ? "" : " data-next") + ">" + next + "</button></div>";
  }

  var html = T.AREAS.map(function (area, a) {
    return '<section class="at-screen" hidden><p class="eyebrow at-step">Area ' + (a + 1) + " of 4</p>" +
      '<h2 tabindex="-1">Area ' + (a + 1) + " of 4: " + esc(area.name) + "</h2>" +
      area.questions.map(function (q, i) {
        var n = a * 3 + i + 1;
        return radios("q" + n, T.ANSWERS, '<span class="at-num">' + n + '.</span> <strong>' + esc(q[0]) + "</strong> " + q[1]);
      }).join("") + nav(true, "Next") + "</section>";
  }).join("");

  var A = T.ABOUT;
  html += '<section class="at-screen" hidden><p class="eyebrow at-step">About you</p><h2 tabindex="-1">About you</h2>' +
    radios("type", same(A.type.options), "1. " + esc(A.type.label), "at-q-list") +
    radios("audit", same(A.audit.options), "2. " + esc(A.audit.label), "at-q-list") +
    '<div class="at-q at-field" data-field="worry"><label for="at-worry">3. ' + esc(A.worry.label) + '</label><p class="at-hint" id="at-worry-hint">' + HINT + '</p><textarea id="at-worry" name="worry" rows="3" maxlength="600" aria-describedby="at-worry-hint" required></textarea><p class="at-error" role="alert" hidden>Please write a short answer.</p></div>' +
    radios("help", same(A.help.options), "4. " + esc(A.help.label), "at-q-list") +
    '<div class="at-q at-field"><label for="at-other">5. ' + esc(A.other.label) + ' <span class="at-optional">(optional)</span></label><p class="at-hint" id="at-other-hint">' + HINT + '</p><textarea id="at-other" name="other" rows="3" maxlength="600" aria-describedby="at-other-hint"></textarea></div>' +
    nav(true, "Next") + "</section>";

  html += '<section class="at-screen" hidden><p class="eyebrow at-step">Last step</p><h2 tabindex="-1">Where should we send your results?</h2>' +
    '<div class="at-q at-field" data-field="name"><label for="at-name">First name</label><input id="at-name" name="name" type="text" autocomplete="given-name" maxlength="100" required><p class="at-error" role="alert" hidden>Please enter your first name.</p></div>' +
    '<div class="at-q at-field" data-field="email"><label for="at-email">Email</label><input id="at-email" name="email" type="email" autocomplete="email" maxlength="255" required><p class="at-error" role="alert" hidden>Please enter a valid email address.</p></div>' +
    '<div class="at-q at-field" data-field="business"><label for="at-business">Business name</label><input id="at-business" name="business" type="text" autocomplete="organization" maxlength="150" required><p class="at-error" role="alert" hidden>Please enter your business name.</p></div>' +
    '<div class="at-q at-field"><label for="at-phone">Phone <span class="at-optional">(optional)</span></label><input id="at-phone" name="phone" type="tel" autocomplete="tel" maxlength="30"></div>' +
    '<label class="at-check" for="at-follow"><input type="checkbox" id="at-follow" name="follow_up" value="yes"><span>Also send me 2 short follow-up emails with tips for my weakest area. I can unsubscribe at any time.</span></label>' +
    '<p class="at-note">We use your answers and details to show and email your results, and to follow up if you ask us to. We never sell or share them. Read our <a href="privacy.html">privacy policy</a>.</p>' +
    nav(true, "Show my results") + '<p class="at-status" role="status" aria-live="polite"></p></section>';

  screensBox.innerHTML = html;
  var screens = Array.prototype.slice.call(screensBox.querySelectorAll(".at-screen"));
  var current = 0;
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(index) {
    screens.forEach(function (s, i) { s.hidden = i !== index; });
    current = index;
    var heading = screens[index].querySelector("h2");
    test.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    heading.focus({ preventScroll: true });
  }

  // Checks one screen. Shows a message under anything missed and moves to the first one.
  function valid(screen) {
    var first = null;
    Array.prototype.forEach.call(screen.querySelectorAll(".at-q[data-field]"), function (q) {
      var name = q.getAttribute("data-field");
      var field = form.elements[name];
      var ok;
      if (field instanceof RadioNodeList) ok = field.value !== "";
      else if (name === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      else ok = field.value.trim() !== "";
      q.querySelector(".at-error").hidden = ok;
      q.classList.toggle("at-missing", !ok);
      if (!ok && !first) first = field instanceof RadioNodeList ? field[0] : field;
    });
    if (first) first.focus();
    return !first;
  }

  startBtn.addEventListener("click", function () {
    intro.hidden = true;
    test.hidden = false;
    show(0);
  });
  form.addEventListener("click", function (e) {
    if (e.target.closest("[data-next]")) { if (valid(screens[current])) show(current + 1); }
    else if (e.target.closest("[data-back]")) {
      if (current === 0) { test.hidden = true; intro.hidden = false; startBtn.focus(); }
      else show(current - 1);
    }
  });
  // Once something is answered, its "please answer" message goes away.
  form.addEventListener("change", function (e) {
    var q = e.target.closest(".at-q");
    if (q && q.classList.contains("at-missing")) { q.classList.remove("at-missing"); q.querySelector(".at-error").hidden = true; }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid(screens[current])) return;
    var answers = [];
    for (var n = 1; n <= 12; n++) answers.push(Number(form.elements["q" + n].value));
    var result = T.score(answers);
    var type = form.elements.type.value;
    var btn = form.querySelector("button[type=submit]");
    var status = form.querySelector(".at-status");
    form.elements.elapsed.value = String(Date.now() - loadedAt);
    btn.disabled = true;
    status.textContent = "Working out your results…";
    // The results show whether or not the answers could be sent.
    fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; })
      .then(function (sent) { results(result, type, sent); });
  });

  function results(result, type, sent) {
    var weak = result.weakest.map(function (a) { return T.AREAS[a]; });
    var weakHtml;
    if (!weak.length) weakHtml = "<p>" + esc(T.FULL_MARKS) + "</p>";
    else if (weak.length === 1) weakHtml = "<h3>Your weakest area: " + esc(weak[0].name) + "</h3><p>" + esc(weak[0].message) + "</p>";
    else {
      var names = weak.map(function (area) { return area.name; });
      weakHtml = "<h3>Your weakest areas: " + esc(names.slice(0, -1).join(", ") + " and " + names[names.length - 1]) + "</h3>" +
        weak.map(function (area) { return "<h4>" + esc(area.name) + "</h4><p>" + esc(area.message) + "</p>"; }).join("");
    }
    resultsBox.innerHTML =
      (sent ? "" : '<p class="at-unsent" role="alert">We couldn\'t send your answers just now. Your results are below.</p>') +
      '<p class="eyebrow at-step">Your results</p>' +
      '<h2 tabindex="-1">Your score: ' + result.pct + "%</h2>" +
      '<p class="at-band">' + esc(result.band.name) + "</p>" +
      '<ul class="at-bars">' + T.AREAS.map(function (area, a) {
        return '<li><span class="at-bar-label">' + esc(area.name) + '</span><span class="at-bar-score">' + result.areas[a] + ' out of 6</span><span class="at-bar" aria-hidden="true"><span style="width:' + Math.round((result.areas[a] / 6) * 100) + '%"></span></span></li>';
      }).join("") + "</ul>" +
      '<p class="at-band-message">' + esc(result.band.message) + "</p>" +
      '<div class="at-weak">' + weakHtml + "</div>" +
      (T.NOT_REGISTERED_TYPES.indexOf(type) >= 0 ? '<p class="at-not-registered">' + esc(T.NOT_REGISTERED) + "</p>" : "") +
      '<div class="at-next"><h3>What next?</h3>' +
      "<p>Our $166 Policy vs Practice Gap Check is the next step. A Registered Nurse reads up to 5 of your policies, compares them with how your team actually works, and shows you where they don't match. You get a written gap report with a plain-English fix for each gap, and a 30-minute call with Ajay. If you go ahead with our Policy + Evidence System within 30 days, the full $166 comes off.</p>" +
      '<div class="btn-row"><a class="btn btn-primary" href="/policy-check?from=auditor-test">Book the Gap Check</a></div>' +
      '<p class="at-alt">Not ready for that? <a href="/ndis-policy-checklist">Get the free NDIS policy checklist</a></p></div>';
    form.hidden = true;
    resultsBox.hidden = false;
    test.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    resultsBox.querySelector("h2").focus({ preventScroll: true });
  }
})();
