const domains = [
  {
    id: "automotive-mechanical",
    name: "Automotive – Mechanical",
    keywords: [
      "engine",
      "brake",
      "transmission",
      "suspension",
      "wheel",
      "noise",
      "oil leak",
      "overheating",
      "steering",
      "belt",
      "bearing",
      "vibration",
      "clunk",
      "rattle"
    ],
    clarifyingQuestions: [
      "When does the symptom occur (speed, temperature, braking, turning)?",
      "Is there any fluid leaking or unusual smell associated with the issue?",
      "Has any recent maintenance or repair been performed?"
    ],
    expertType: "Automotive mechanic",
    riskLevel: "medium"
  },
  {
    id: "automotive-electrical",
    name: "Automotive – Electrical",
    keywords: [
      "battery",
      "alternator",
      "starter",
      "wiring",
      "headlight",
      "fuse",
      "dashboard",
      "warning light",
      "sensor",
      "short",
      "no start",
      "stall",
      "charging"
    ],
    clarifyingQuestions: [
      "Are there any warning lights or error messages on the dashboard?",
      "Does the problem happen consistently or intermittently?",
      "Have you noticed dim lights or slow cranking?"
    ],
    expertType: "Automotive electrical technician",
    riskLevel: "medium"
  },
  {
    id: "computers-windows",
    name: "Computers – Windows",
    keywords: [
      "windows",
      "blue screen",
      "driver",
      "update",
      "startup",
      "slow",
      "crash",
      "error code",
      "malware",
      "registry",
      "disk",
      "freeze"
    ],
    clarifyingQuestions: [
      "What is the exact error message or code, if any?",
      "What changed right before the issue started (update, install, hardware)?",
      "Is the issue affecting startup, performance, or a specific app?"
    ],
    expertType: "Windows support technician",
    riskLevel: "low"
  },
  {
    id: "networking",
    name: "Networking",
    keywords: [
      "wifi",
      "router",
      "network",
      "internet",
      "latency",
      "packet loss",
      "dns",
      "ip address",
      "ethernet",
      "connection",
      "firewall",
      "modem"
    ],
    clarifyingQuestions: [
      "Is the issue happening on one device or all devices?",
      "Are you using Wi-Fi, Ethernet, or both?",
      "What is the error or symptom (no connection, slow speed, dropouts)?"
    ],
    expertType: "Network administrator",
    riskLevel: "medium"
  },
  {
    id: "home-plumbing",
    name: "Home – Plumbing",
    keywords: [
      "leak",
      "pipe",
      "drain",
      "clog",
      "faucet",
      "toilet",
      "water heater",
      "sewer",
      "overflow",
      "low pressure",
      "valve",
      "sink"
    ],
    clarifyingQuestions: [
      "Where is the issue located (fixture or room)?",
      "Is water actively leaking or just slow/dripping?",
      "When did the problem start and has it worsened?"
    ],
    expertType: "Licensed plumber",
    riskLevel: "medium"
  },
  {
    id: "medical-triage",
    name: "Medical – Triage Only",
    keywords: [
      "pain",
      "fever",
      "rash",
      "shortness of breath",
      "dizziness",
      "injury",
      "bleeding",
      "nausea",
      "chest",
      "headache",
      "infection",
      "swelling"
    ],
    clarifyingQuestions: [
      "How long have the symptoms been present?",
      "Are there any severe or rapidly worsening symptoms?",
      "What is the age and general health context of the person affected?"
    ],
    expertType: "Medical triage professional (question framing only; not diagnostic)",
    riskLevel: "high"
  }
];

module.exports = domains;
