const express = require("express");
const bodyParser = require("body-parser");
const domains = require("./domainIndex");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const splitIssues = (problem) => {
  if (!problem) {
    return [];
  }

  const normalized = problem
    .replace(/\s+\/\s+/g, " / ")
    .replace(/\s+/g, " ")
    .trim();

  const rawParts = normalized.split(/\s+(?:and|&|\+)\s+|[;]|\s+\/\s+/i);
  const parts = rawParts.map((part) => part.trim()).filter(Boolean);

  return parts.length ? parts : [normalized];
};

const scoreIssue = (issueText) => {
  const text = issueText.toLowerCase();

  const scored = domains
    .map((domain) => {
      let score = 0;
      domain.keywords.forEach((keyword) => {
        if (text.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });

      if (score === 0) {
        return null;
      }

      const confidence = Math.min(1, score / 3);

      return {
        domainId: domain.id,
        domainName: domain.name,
        confidence,
        expertType: domain.expertType,
        riskLevel: domain.riskLevel,
        clarifyingQuestions: domain.clarifyingQuestions
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence);

  return scored;
};

app.post("/route", (req, res) => {
  const problem = typeof req.body.problem === "string" ? req.body.problem.trim() : "";

  if (!problem) {
    return res.status(400).json({
      error: "Missing or empty 'problem' field.",
      nextActionGuidance: "Provide a concise description of the issue you want routed."
    });
  }

  const issues = splitIssues(problem);

  const routedIssues = issues.map((issue) => {
    const matches = scoreIssue(issue);

    if (!matches.length) {
      return {
        issue,
        matches: [],
        clarifyingQuestions: [
          "What is the primary symptom or failure?",
          "When did it start and what changed beforehand?",
          "What environment or equipment is involved?"
        ],
        nextActionGuidance: "Add more context so the router can map the issue to a domain."
      };
    }

    const topMatch = matches[0];

    return {
      issue,
      matches,
      clarifyingQuestions: topMatch.clarifyingQuestions,
      nextActionGuidance: `Gather answers to the clarifying questions before contacting a ${topMatch.expertType}.`
    };
  });

  const hasMatches = routedIssues.some((item) => item.matches.length > 0);

  return res.json({
    problem,
    issues: routedIssues,
    nextActionGuidance: hasMatches
      ? "Route each issue separately using the provided expert types and questions."
      : "No confident domain match. Provide more detail to enable routing."
  });
});

app.listen(port, () => {
  console.log(`Atlas Expert Router listening on port ${port}`);
});
