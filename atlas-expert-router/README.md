# Atlas Expert Router

Atlas Expert Router is a keyword-based index and routing service. It does **not** solve problems. It only determines:

- what domain(s) a problem belongs to
- what expert type should handle each domain
- what clarifying questions are needed before consulting that expert

This is inspired by Henry Ford’s principle: “I don’t know everything, but I know who to ask.” The system is an **index + router**, not an answer engine.

## What this is

- A lightweight HTTP service that classifies issues by domain.
- A multi-issue router that can split one input into multiple routed issues.
- A clarifying-question generator that helps you gather the right details before escalation.

## What this is NOT

- **Not** an SLM or LLM.
- **Not** RAG.
- **Not** a diagnostic system.
- **Not** a chatbot that answers questions.

## Why this avoids “WebMD syndrome”

The medical domain is **triage-only** and explicitly avoids diagnosis or treatment guidance. It only frames questions so a qualified professional can evaluate the situation. This keeps the system within a routing role instead of becoming a medical answer engine.

## Run the server

```bash
npm install
npm start
```

Server starts on port `3000` by default.

## Test with curl

```bash
curl -X POST http://localhost:3000/route \
  -H "Content-Type: application/json" \
  -d '{"problem":"Strange noise in right front wheel AND losing oil"}'
```

## Example response

```json
{
  "problem": "Strange noise in right front wheel AND losing oil",
  "issues": [
    {
      "issue": "Strange noise in right front wheel",
      "matches": [
        {
          "domainId": "automotive-mechanical",
          "domainName": "Automotive – Mechanical",
          "confidence": 0.66,
          "expertType": "Automotive mechanic",
          "riskLevel": "medium",
          "clarifyingQuestions": [
            "When does the symptom occur (speed, temperature, braking, turning)?",
            "Is there any fluid leaking or unusual smell associated with the issue?",
            "Has any recent maintenance or repair been performed?"
          ]
        }
      ],
      "clarifyingQuestions": [
        "When does the symptom occur (speed, temperature, braking, turning)?",
        "Is there any fluid leaking or unusual smell associated with the issue?",
        "Has any recent maintenance or repair been performed?"
      ],
      "nextActionGuidance": "Gather answers to the clarifying questions before contacting a Automotive mechanic."
    },
    {
      "issue": "losing oil",
      "matches": [
        {
          "domainId": "automotive-mechanical",
          "domainName": "Automotive – Mechanical",
          "confidence": 0.66,
          "expertType": "Automotive mechanic",
          "riskLevel": "medium",
          "clarifyingQuestions": [
            "When does the symptom occur (speed, temperature, braking, turning)?",
            "Is there any fluid leaking or unusual smell associated with the issue?",
            "Has any recent maintenance or repair been performed?"
          ]
        }
      ],
      "clarifyingQuestions": [
        "When does the symptom occur (speed, temperature, braking, turning)?",
        "Is there any fluid leaking or unusual smell associated with the issue?",
        "Has any recent maintenance or repair been performed?"
      ],
      "nextActionGuidance": "Gather answers to the clarifying questions before contacting a Automotive mechanic."
    }
  ],
  "nextActionGuidance": "Route each issue separately using the provided expert types and questions."
}
```
