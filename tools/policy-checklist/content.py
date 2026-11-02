# Single source of truth for the NDIS policy checklist.
# Every page, the PDF and the structured data are generated from this file.
# Facts checked against official sources on 3 November 2026 (see SOURCES).

LAST_CHECKED = "3 November 2026"
LAST_CHECKED_ISO = "2026-11-03"
PAGE_URL = "https://vitalscaledigital.com.au/ndis-policy-checklist"
PDF_PATH = "/downloads/ndis-policy-checklist.pdf"
PDF_NAME = "NDIS-policy-checklist-VitalScale-Nov-2026.pdf"

SOURCES = {
    "unreg": ("NDIS Commission: Unregistered providers",
              "https://www.ndiscommission.gov.au/providers/unregistered-providers"),
    "mandatory": ("NDIS Commission: Mandatory compliance requirements for registered NDIS providers",
                  "https://ndiscommission.gov.au/mandatory-compliance-requirements-registered-ndis-providers"),
    "qi": ("NDIS (Quality Indicators for NDIS Practice Standards) Guidelines 2018, compilation of 1 July 2026",
           "https://www.legislation.gov.au/F2018N00041/latest/text"),
    "verif": ("NDIS Commission: Verification module required documentation",
              "https://www.ndiscommission.gov.au/sites/default/files/2025-05/ndis-verification-module-required-documentation.pdf"),
    "irules": ("NDIS (Incident Management and Reportable Incidents) Rules 2018",
               "https://www.legislation.gov.au/F2018L00633/latest/text"),
    "ercode": ("NDIS Commission: The NDIS Code of Conduct, Easy Read (April 2026)",
               "https://www.ndiscommission.gov.au/sites/default/files/2026-04/ER-Code-of-Conduct-PDF.pdf"),
    "fairpricing": ("NDIS Commission: Providers accountable for unfair pricing under new NDIS rules",
                    "https://www.ndiscommission.gov.au/media-centre/providers-accountable-unfair-pricing-under-new-ndis-rules"),
    "oaic": ("OAIC: What is a health service provider?",
             "https://www.oaic.gov.au/privacy/your-privacy-rights/health-information/what-is-a-health-service-provider"),
    "act": ("NDIS Amendment (Securing the NDIS for Future Generations) Act 2026",
            "https://www.legislation.gov.au/C2026A00066"),
    "finalchanges": ("Department of Health: Final changes to the Securing the NDIS for Future Generations Bill (Aug 2026)",
                     "https://www.health.gov.au/sites/default/files/2026-08/final-changes-to-the-ndis-amendment-securing-the-ndis-for-future-generations-bill-2026.pdf"),
    "faqs": ("Department of Health: Securing the NDIS provider FAQs (Jul 2026)",
             "https://www.health.gov.au/sites/default/files/2026-07/securing-the-future-of-the-ndis-for-future-generations-provider-faqs.pdf"),
    "mandreg": ("NDIS Commission: Mandatory registration",
                "https://www.ndiscommission.gov.au/about-us/ndis-commission-reform-hub/mandatory-registration"),
    "sil": ("NDIS Commission: Mandatory registration for supported independent living",
            "https://www.ndiscommission.gov.au/about-us/ndis-commission-reform-hub/mandatory-registration/mandatory-registration-sil/SIL-4"),
    "rp": ("NDIS Commission: Rules for implementing providers (restrictive practices)",
           "https://www.ndiscommission.gov.au/rules-and-standards/behaviour-support-and-restrictive-practices/rules-implementing-providers"),
    "reform": ("NDIS Commission: NDIS Practice Standards reform",
               "https://www.ndiscommission.gov.au/about-us/ndis-commission-reform-hub/ndis-practice-standards-reform"),
}

# Short labels for the source line under each item
SOURCE_SHORT = {
    "unreg": "NDIS Commission: unregistered providers",
    "mandatory": "NDIS Commission: registered provider requirements",
    "qi": "Practice Standards quality indicators (1 Jul 2026)",
    "verif": "NDIS Commission: verification module",
    "irules": "Incident Management Rules 2018",
    "ercode": "NDIS Code of Conduct (Easy Read)",
    "fairpricing": "NDIS Commission: fair pricing",
    "oaic": "OAIC: health service providers",
    "act": "Securing the NDIS Act 2026",
    "finalchanges": "Department of Health fact sheet",
    "faqs": "Department of Health provider FAQs",
    "mandreg": "NDIS Commission: mandatory registration",
    "sil": "NDIS Commission: SIL registration",
    "rp": "NDIS Commission: restrictive practices rules",
    "reform": "NDIS Commission: Practice Standards reform",
}

# Tag kinds: all (every provider), reg (registered), ver (checked at a verification audit),
# enc (encouraged if unregistered), only (only if you deliver a support), must (registration required)
TAG_TEXT = {
    "all": "All providers",
    "reg": "Registered",
    "ver": "Verification audit",
    "enc": "Encouraged if unregistered",
    "must": "Registration required",
}

PARTS = [
    {
        "id": "part-1",
        "num": "Part 1",
        "title": "Every NDIS provider, registered or not",
        "short": "Every provider",
        "intro": "The NDIS Code of Conduct applies to every NDIS provider and worker, registered or not. So do the expectation that you can manage complaints well, and the new inducement and record-keeping rules. The rules are law. The policies and records below are the practical way to show you meet them.",
        "items": [
            {
                "title": "Code of Conduct",
                "tags": ["all"],
                "policy": "Code of Conduct policy, signed by every worker",
                "proof": [
                    "Every worker has read the NDIS Code of Conduct and signed to say so. That includes you, if you're a sole trader.",
                    "The Code is covered at induction and refreshed, not just filed.",
                    "Workers can say, in their own words, what they'd do if something didn't feel right.",
                ],
                "sources": ["unreg", "ercode"],
            },
            {
                "title": "Complaints",
                "tags": ["all", "ver"],
                "policy": "Complaints management policy, plus an easy-read \"How to make a complaint\" guide",
                "proof": [
                    "Participants get complaints information when they start, in a format they can use. It says they can also complain to the NDIS Commission.",
                    "A complaints register that's kept up to date, even if it's empty so far.",
                    "A fair process: the person a complaint is about is told and gets a chance to respond.",
                    "A note of what changed because of a complaint.",
                ],
                "sources": ["unreg", "mandatory", "verif"],
            },
            {
                "title": "Safeguarding",
                "tags": ["all"],
                "policy": "Safeguarding policy: preventing and responding to violence, abuse, neglect, exploitation and sexual misconduct",
                "proof": [
                    "Workers know the warning signs, who to tell and how fast.",
                    "Every allegation is recorded and acted on, even before it's proven.",
                    "Participants are told they can have an advocate, and how to reach one.",
                ],
                "sources": ["ercode", "qi"],
            },
            {
                "title": "Privacy and consent",
                "tags": ["all"],
                "policy": "Privacy and confidentiality policy, with consent forms for collecting and sharing information",
                "proof": [
                    "Signed consent that says what you collect, why, and who you share it with, including photos or recordings.",
                    "Participants know how to see or correct their information, and how to withdraw consent.",
                    "Records stored securely, with limited access and a plan for keeping and safely destroying them.",
                    "If you handle participants' health information, the Privacy Act covers you even as a small business.",
                ],
                "nurse": "Treat a participant's file like a patient's chart: only the people who need it see it. And keep participant details out of free public AI tools.",
                "sources": ["ercode", "oaic", "qi"],
            },
            {
                "title": "Records, notes and claims",
                "tags": ["all"],
                "policy": "Records and claiming procedure",
                "proof": [
                    "Every invoice or claim matches a support record: who, what, when and for how long.",
                    "Records of NDIS payments and receipts kept for 7 years. This has been law since 27 August 2026.",
                    "Invoices sent promptly. From 1 December 2026, NDIS claims must be made within 90 days of the support, so lodge any older claims before then.",
                ],
                "nurse": "Write notes the way nurses chart: at the time, factual and signed. A note written days later is weak evidence.",
                "sources": ["act", "faqs", "finalchanges"],
            },
            {
                "title": "Gifts, inducements and referrals",
                "tags": ["all"],
                "policy": "Gifts, benefits and conflicts of interest policy",
                "proof": [
                    "No gifts, payments or perks to win or keep participants, their families or anyone who refers to you. Inducements are banned from 20 November 2026.",
                    "Never cash or cash-like products (such as gift cards), alcohol, tobacco and related products, or electronic devices.",
                    "Still allowed: genuine pricing practices, and certain merchandise like a hat or tote bag.",
                    "A gifts register, and conflicts of interest written down and managed.",
                ],
                "more": ("Read our guide to the inducements ban", "/blog/ndis-inducements-gifts"),
                "sources": ["act", "finalchanges"],
            },
            {
                "title": "Fair pricing and service agreements",
                "tags": ["all"],
                "policy": "Pricing and service agreement procedure",
                "proof": [
                    "Prices are clear before support starts.",
                    "A service agreement, ideally written: what you'll provide, when, the cost and how either side can end it. Registered providers give the participant a signed copy, or record why there isn't one. Smart for everyone.",
                    "You don't charge participants more than other customers for the same goods, unless there's a reasonable justification. This is part of the Code of Conduct.",
                ],
                "sources": ["fairpricing", "qi"],
            },
            {
                "title": "Worker screening and checks",
                "tags": ["reg", "enc", "ver"],
                "policy": "Worker screening and pre-employment checks procedure",
                "proof": [
                    "Registered: an NDIS Worker Screening Check for every worker in a risk-assessed role, with a record you can show.",
                    "Unregistered: not legally required, but the NDIS Commission strongly encourages it, and self-managing participants can ask for it.",
                    "Identity, right to work, qualifications and references checked before the first shift.",
                ],
                "sources": ["mandatory", "unreg", "verif"],
            },
        ],
    },
    {
        "id": "part-2",
        "num": "Part 2",
        "title": "Registered providers: the Practice Standards Core Module",
        "short": "Registered providers",
        "intro": "Registered providers are audited against the NDIS Practice Standards. A certification audit uses the Core Module below. A verification audit, for lower-risk supports, checks workforce, incidents, complaints and risk: those items are marked. Unregistered? None of Part 2 is required of you today. It's still good practice, and the clearest way to get ready if mandatory registration reaches your supports (expected to phase in from July 2027 to the end of 2030, details not final).",
        "items": [
            {
                "title": "Incident management",
                "tags": ["reg", "ver"],
                "policy": "Incident management policy and procedure",
                "proof": [
                    "An incident register that records every incident, not just the serious ones.",
                    "Reportable incidents notified to the NDIS Commission on time. Some must be reported within 24 hours, others within 5 business days.",
                    "Participants told about incidents that involve them, and included in the response.",
                    "Incidents reviewed for causes and patterns, and workers trained in the process.",
                ],
                "nurse": "Count near misses and medication errors, including missed doses, as incidents. Near misses are the cheapest lessons you'll ever get.",
                "sources": ["mandatory", "irules", "qi"],
            },
            {
                "title": "Workforce: induction, training and supervision",
                "tags": ["reg", "ver"],
                "policy": "Human resources policy: recruitment, induction, training and supervision",
                "proof": [
                    "A certificate for the NDIS worker orientation module, \"Quality, Safety and You\", for every worker and key personnel.",
                    "Position descriptions, qualification records and a training register.",
                    "Regular supervision and performance check-ins, with notes.",
                    "Training in infection control, emergencies, complaints and incidents, plus medication or mealtimes where relevant.",
                ],
                "sources": ["mandatory", "qi", "verif"],
            },
            {
                "title": "Risk, work health and safety, and insurance",
                "tags": ["reg", "ver"],
                "policy": "Risk management and work health and safety policy, with a risk register",
                "proof": [
                    "A risk register covering participants, workers and the business, with actions and review dates.",
                    "Safety steps for working in people's homes and working alone.",
                    "Current certificates of currency for public liability, professional indemnity, and workers' compensation or accident cover.",
                ],
                "sources": ["qi", "verif"],
            },
            {
                "title": "Infection prevention and control",
                "tags": ["reg", "ver"],
                "policy": "Infection prevention and control policy",
                "proof": [
                    "Standard precautions in every setting: hand hygiene, PPE and routine cleaning.",
                    "Workers trained, and refreshed, in infection control and how to use PPE.",
                    "PPE available to workers and participants who need it.",
                ],
                "nurse": "Good infection control is mostly simple habits: hand hygiene before and after every contact, and the right PPE for the task. Watch one shift and you'll see whether the policy is real.",
                "sources": ["qi", "verif"],
            },
            {
                "title": "Emergency and disaster management",
                "tags": ["reg", "ver"],
                "policy": "Emergency and disaster management plan",
                "proof": [
                    "A plan to keep critical supports going in an emergency, such as a fire, flood, heatwave or disease outbreak.",
                    "Participants and their supporters consulted, with extra planning for people who rely on you most.",
                    "The plan tested, reviewed and explained to workers.",
                ],
                "sources": ["qi", "verif"],
            },
            {
                "title": "Governance, quality and conflicts of interest",
                "tags": ["reg"],
                "policy": "Governance and quality management policy",
                "proof": [
                    "Who is responsible for what, written down, even if it's just you.",
                    "A conflicts of interest register.",
                    "A continuous improvement register fed by feedback, complaints and incidents, plus an internal audit schedule.",
                    "Changes that affect your services, like a new business structure, notified through the NDIS Commission Portal.",
                ],
                "sources": ["qi", "mandatory"],
            },
            {
                "title": "Participant rights, choice and dignity of risk",
                "tags": ["reg"],
                "policy": "Participant rights policy: person-centred supports, choice and control",
                "proof": [
                    "Information given in the participant's language and way of communicating.",
                    "Choices respected, including risky ones, with the risks talked through and recorded.",
                    "Culture, values and beliefs recorded and respected.",
                    "Participants told how to get an advocate.",
                ],
                "sources": ["qi"],
            },
            {
                "title": "Intake, support planning and risk assessment",
                "tags": ["reg"],
                "policy": "Intake, support planning and review procedure",
                "proof": [
                    "Clear entry criteria and costs, and the reasons support might stop.",
                    "Support plans written with the participant, including a risk assessment.",
                    "Plans reviewed at least once a year, or sooner when needs change.",
                ],
                "sources": ["qi"],
            },
            {
                "title": "Continuity of supports and transitions",
                "tags": ["reg"],
                "policy": "Continuity of supports and transitions procedure",
                "proof": [
                    "Backup workers who know the participant's preferences before they arrive.",
                    "Planned, written handovers when a participant joins, leaves or changes provider.",
                    "A plan for temporary changes, like a hospital stay.",
                ],
                "nurse": "Hospital admissions and discharges are where things slip. Send a one-page profile with the participant: how they communicate, their medicines and supports, and who to call.",
                "sources": ["qi"],
            },
            {
                "title": "Safe environment and medical emergencies",
                "tags": ["reg"],
                "policy": "Safe environment and medical emergency procedure",
                "proof": [
                    "Participants can identify their workers, for example by name and photo ID.",
                    "Workers know what to do in a medical emergency, and when to escalate a change in someone's health.",
                    "Coordination with other providers who support the same participant.",
                ],
                "nurse": "Train workers to act on deterioration: changes in breathing, colour, confusion, eating or drinking. \"Not themselves today\" should trigger a call, not a note at the end of the shift.",
                "sources": ["qi"],
            },
        ],
    },
    {
        "id": "part-3",
        "num": "Part 3",
        "title": "Only if you deliver these supports",
        "short": "Specific supports",
        "intro": "Some standards apply only when you deliver a certain support. If you're registered, they're part of your audit. If you're not, they're still the safe way to work. Behaviour support with restrictive practices, and SIL, also need registration.",
        "items": [
            {
                "title": "Medication",
                "tags": ["only:If you support medication"],
                "policy": "Medication management policy",
                "proof": [
                    "A current medication record for each participant: the medicine, dose, how and when it's given, and the prescriber's instructions.",
                    "Workers trained and assessed as competent, who know what each medicine is for and its side effects.",
                    "Secure, clearly labelled storage for each participant, opened only by trained workers.",
                    "Medication errors and missed doses reported and managed as incidents.",
                ],
                "nurse": "Write down where \"assisting with\" ends and \"administering\" begins in your service, and train to that line. Work from the pharmacy label and the prescriber's instructions, never memory. \"As needed\" (PRN) medicines need written guidance on when to give them.",
                "sources": ["qi"],
            },
            {
                "title": "Mealtime management",
                "tags": ["only:If you support mealtimes"],
                "policy": "Mealtime management policy",
                "proof": [
                    "Mealtime plans for participants at risk, based on assessments by qualified practitioners such as a speech pathologist or dietitian.",
                    "Plans reviewed at least yearly, or as the practitioner advises, and when needs change. Easy to follow at the table.",
                    "Workers trained in safe mealtimes and what to do if someone chokes.",
                    "Texture-modified food checked before serving, and food stored safely.",
                ],
                "nurse": "Coughing during meals, a wet-sounding voice or repeated chest infections can be signs of swallowing trouble. Report them now. Don't wait for the next review.",
                "sources": ["qi"],
            },
            {
                "title": "Waste management",
                "tags": ["only:If you handle hazardous waste"],
                "policy": "Waste management policy, including used PPE and sharps",
                "proof": [
                    "Safe storage, handling and disposal of infectious and hazardous waste, including used PPE.",
                    "Incidents involving waste reported and investigated.",
                    "Workers trained in safe handling.",
                ],
                "sources": ["qi"],
            },
            {
                "title": "Participant money and property",
                "tags": ["only:If you handle participants' money"],
                "policy": "Participant money and property policy",
                "proof": [
                    "Participants decide how their money is used. You use it only with their consent and for its purpose.",
                    "Receipts and records that account for every dollar.",
                    "Workers don't give financial advice unless it's part of the participant's plan.",
                ],
                "sources": ["qi"],
            },
            {
                "title": "High intensity daily personal activities",
                "tags": ["only:If you deliver high intensity supports"],
                "policy": "A procedure and a worker training plan for each high intensity activity you deliver",
                "proof": [
                    "Covers any of: complex bowel care, enteral feeding, severe dysphagia, tracheostomy, urinary catheter, ventilator, subcutaneous injections and complex wound management.",
                    "A plan for each participant, developed with them, that sets out how risks, incidents and emergencies are managed.",
                    "Regular review by an appropriately qualified health practitioner.",
                    "Workers trained for that participant's needs by an appropriately qualified health practitioner or person.",
                ],
                "nurse": "Competency is person-specific. A worker signed off on one participant's PEG (tube) feeding isn't automatically safe with another's. Keep a sign-off for each participant and each activity.",
                "sources": ["qi"],
            },
            {
                "title": "Behaviour support and restrictive practices",
                "tags": ["must"],
                "policy": "Behaviour support and restrictive practices policy",
                "proof": [
                    "You're registered. Writing behaviour support plans, or using a regulated restrictive practice, isn't open to unregistered providers.",
                    "A behaviour support plan for each participant subject to a restrictive practice, and any state or territory authorisation.",
                    "Use of regulated restrictive practices reported to the NDIS Commission every month. Unauthorised use is a reportable incident.",
                    "Workers trained to carry out the plan, and use of restrictive practices monitored so it can be reduced.",
                ],
                "sources": ["unreg", "rp", "qi"],
            },
            {
                "title": "Supported independent living (SIL)",
                "tags": ["must"],
                "policy": "SIL policies: supported decision-making, safeguarding, practice governance, and tenancy and support agreements",
                "proof": [
                    "SIL needs registration. Providers already delivering SIL had to apply by 1 October 2026 and can keep going while their application is assessed. Registered SIL providers meet the SIL Practice Standards (Module 5A) from 1 July 2026.",
                    "Workers trained in supported decision-making, trauma-informed practice and active support, with refreshers.",
                    "Safeguards against bullying and conflict between housemates, developed with participants.",
                    "Participants have a say in who they live with, and are consulted before a new housemate moves in.",
                    "Where you provide both housing and support: separate tenancy and service agreements, and participants hold keys to their home.",
                ],
                "sources": ["sil", "qi"],
            },
            {
                "title": "Early childhood, SDA and specialised support coordination",
                "tags": ["only:If you're registered for these"],
                "policy": "Policies mapped to your extra module",
                "proof": [
                    "Early childhood supports (Module 3), specialised support coordination (Module 4) and specialist disability accommodation (Module 5) each have their own standards.",
                    "Check your registration groups to see which modules apply, then map a policy and its evidence to each standard.",
                ],
                "sources": ["qi"],
            },
        ],
    },
]

HOW_TO = [
    ("Start with Part 1", "It applies to every NDIS provider, registered or not."),
    ("Add what fits you", "Registered? Work through Part 2. Then Part 3 for the supports you deliver."),
    ("Tick only what you can prove", "An item is done when you have the policy and the records that show it's happening."),
]

def _count(tag):
    return sum(1 for p in PARTS for i in p["items"] if tag in i["tags"])

TOTAL = sum(len(p["items"]) for p in PARTS)
VER_COUNT = _count("ver")
VER_COUNT_P2 = sum(1 for i in PARTS[1]["items"] if "ver" in i["tags"])

WHO = [
    ("Unregistered provider",
     "Part 1 applies to you now. Parts 2 and 3 are good practice, and your head start if mandatory registration reaches your supports (expected to phase in from July 2027, details not final)."),
    ("Registered, verification audit",
     f"Part 1, plus the {VER_COUNT_P2} Part 2 items marked \"Verification audit\". Your auditor checks workforce, incidents, complaints and risk."),
    ("Registered, certification audit",
     "All of Part 1 and Part 2, plus the Part 3 items for the supports you deliver."),
]

FAQ = [
    ("Do unregistered NDIS providers need policies?",
     "Yes, some. Every NDIS provider must follow the NDIS Code of Conduct and be able to handle complaints fairly, and the new inducement and record-keeping rules apply to everyone. You won't be audited against the Practice Standards, but written policies are the easiest way to show you meet these rules."),
    ("What policies does a registered NDIS provider need?",
     "Policies that cover the Code of Conduct and the NDIS Practice Standards for your registration groups, including incident management, complaints and worker screening. For a certification audit that means the Core Module (Part 2 of this checklist), plus Part 3 items for supports like medication, high intensity care, behaviour support or SIL. A verification audit focuses on workforce, incidents, complaints and risk."),
    ("What does an NDIS auditor look for?",
     "Proof that each policy is actually happening, not just that it exists. Auditors look at records, consent, incident and complaints registers, and worker files, and they may ask workers to explain a process. A common gap is a policy the records don't back up."),
    ("Will this checklist get me through my audit?",
     "No checklist can promise that, and nobody can guarantee an audit result. This is a general guide to help you find gaps early. Your auditor works from the official standards, so check the sources on this page and get advice for your own situation."),
    ("Are the NDIS Practice Standards changing?",
     "Partly. New SIL Practice Standards started on 1 July 2026. The wider review of the Practice Standards has finished its consultation, and the NDIS Commission hasn't announced the next version yet. We'll update this checklist when the standards change, and the date at the top shows when we last checked."),
]

DISCLAIMER = ("This checklist is a general guide, not legal advice, and it doesn't guarantee an audit or "
              "registration result. It's based on official NDIS sources, which change, so always check "
              "them for your own situation.")

# Source order for the full list at the bottom of the page and the PDF
SOURCE_ORDER = ["unreg", "mandatory", "qi", "verif", "irules", "ercode", "fairpricing", "oaic",
                "act", "finalchanges", "faqs", "rp", "sil", "reform"]
