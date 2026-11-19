// The Auditor Test: the approved wording (Ajay, 20 Nov 2026) and the scoring, in one place.
// The page (/auditor-test) and the Worker (src/worker.js, which writes the email to Ajay) both read
// this file, so the score on screen and the score in the email can never disagree.
// Don't reword anything here without Ajay's approval.
(function (root) {
  var AREAS = [
    {
      name: "People and training",
      questions: [
        ["The interview test.", "An auditor picks one of your casual workers at random and asks, \"Walk me through what you'd do if a participant told you someone had hurt them.\" Would they answer confidently in their own words, including who they'd tell and how fast?"],
        ["The forgotten worker.", "Your agency staff, contractors and volunteers have the same screening checks, induction and training records on file as your employees."],
        ["The expiry you didn't see coming.", "If a worker's screening check, first aid or required training expired next month, someone would be alerted <em>before</em> it expired."],
      ],
      message: "Auditors choose which workers they talk to. You can't pick for them. So every worker, casuals included, needs to know what to do if a participant is hurt and who to tell straight away, because most reportable incidents have to reach the NDIS Commission within 24 hours. Practise the big scenarios often. Short and regular beats another training module. And keep every worker's checks and training dates in one place, with a reminder before anything expires.",
    },
    {
      name: "Incidents and risk",
      questions: [
        ["The empty register.", "Your incident register includes near-misses and minor incidents, not just serious ones."],
        ["The incident that changed something.", "For your last real incident, you can show what happened, who was notified and when, what you investigated, and what you changed."],
        ["The living risk register.", "Your risk register has been updated in the last 3 months because of something real: an incident, a complaint, a new participant or a new service."],
      ],
      message: "A register with only serious incidents in it can look like things are being missed. The NDIS incident rules ask registered providers to record incidents that caused harm or could have. So near-misses belong there too. For each real incident, you should be able to show who was told and when, what you looked into and what changed. Then update your risk register when something real happens: an incident, a complaint, a new participant.",
    },
    {
      name: "Participant voice",
      questions: [
        ["The participant interview.", "If an auditor asked a participant, \"Who decided what your support looks like?\", they (or their family) would say \"I did\" or \"we worked it out together\"."],
        ["The progress note test.", "A random progress note from last week shows what the participant did and how it links to their goals, not just \"attended shift, no concerns\"."],
        ["The complaint that made you better.", "You can show a complaint or piece of feedback from the last 12 months that led to a real change."],
      ],
      message: "At a certification audit, auditors usually talk to some participants and read a sample of their files. Do the two match? Progress notes that link each shift to the participant's goals, and a complaint that led to a real change, are how you show their voice shapes your service.",
    },
    {
      name: "Policies and records",
      questions: [
        ["The policy that matches reality.", "Your policies describe how your business actually works today, not a template or how you ran two years ago."],
        ["The policy trail.", "For your last policy update, you can show what changed, why it changed, and that staff read it."],
        ["The new rules check.", "Your policies and processes have been updated for the 2026 NDIS changes that apply to you, such as the 90-day claiming window and the ban on inducements."],
      ],
      message: "Your policies should describe how your business works today. Not two years ago. If they came from a template, or haven't changed since the 2026 NDIS changes (like the ban on inducements from 20 November and 90 days to claim from 1 December), start there. For every update, keep a short note of what changed, why, and proof your staff read it.",
    },
  ];

  // Answers: Yes = 2, Partly = 1, No or not sure = 0.
  var ANSWERS = [["2", "Yes"], ["1", "Partly"], ["0", "No or not sure"]];

  var BANDS = [
    { min: 80, name: "Audit-aware", message: "You're in good shape. Most of what an auditor checks is already happening in your business, and it's written down too. Still, look at your weakest area. That's where a small gap is most likely to show up on the day." },
    { min: 50, name: "Strong on paper, exposed in practice", message: "Your paperwork is probably ahead of your day-to-day. Auditors check both. They talk to your team and read your records, so the gap between the two is what to close. Start with your weakest area below." },
    { min: 0, name: "At risk", message: "Some of the basics an auditor checks aren't in place yet. That's fixable. Far better to find out now than on audit day. Start with your weakest area below, one area at a time." },
  ];

  var ABOUT = {
    type: { label: "Which best describes you?", options: ["Registered NDIS provider", "Unregistered NDIS provider", "Starting out (not delivering supports yet)", "Support coordinator"] },
    audit: { label: "When is your next audit?", options: ["Within 3 months", "3 to 6 months", "6 to 12 months", "Not booked yet", "Not sure", "I'm not registered"] },
    worry: { label: "What's your biggest worry right now?" },
    help: { label: "What help would suit you best?", options: ["A check of my current policies", "Policies written for my business", "A website families and coordinators trust", "Just the results for now"] },
    other: { label: "Anything else you'd like us to know?" },
  };

  // answers: 12 values, each 0, 1 or 2, in question order.
  function score(answers) {
    var areas = AREAS.map(function (_, a) { return answers[a * 3] + answers[a * 3 + 1] + answers[a * 3 + 2]; });
    var total = areas.reduce(function (sum, n) { return sum + n; }, 0);
    var pct = Math.round((total / 24) * 100);
    var band = BANDS.filter(function (b) { return pct >= b.min; })[0];
    var lowest = Math.min.apply(null, areas);
    // Full marks: no weak area. Otherwise every area on the lowest score (ties are all named).
    var weakest = total === 24 ? [] : areas.map(function (n, a) { return n === lowest ? a : -1; }).filter(function (a) { return a >= 0; });
    return { areas: areas, total: total, pct: pct, band: band, weakest: weakest };
  }

  root.AUDITOR_TEST = {
    AREAS: AREAS,
    ANSWERS: ANSWERS,
    BANDS: BANDS,
    ABOUT: ABOUT,
    FULL_MARKS: "No weak area showed up. Nice work. Take the test again after your next policy review or any big change in your team.",
    NOT_REGISTERED: "Not registered? You won't have an NDIS audit, and some of these rules only apply to registered providers. The 12 checks are still a good picture of how safe and well run your service is.",
    // The "Not registered?" line shows for these two answers to "Which best describes you?".
    NOT_REGISTERED_TYPES: ["Unregistered NDIS provider", "Starting out (not delivering supports yet)"],
    score: score,
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
