import { NextRequest, NextResponse } from "next/server";

/**
 * Receives survey submissions from the Coming Soon page.
 *
 * Works out of the box: it validates the payload and logs it to your
 * Vercel function logs, so the form is fully functional end-to-end
 * immediately after deploy.
 *
 * To actually collect responses somewhere durable, set ONE of these
 * environment variables in your Vercel project (Settings -> Environment
 * Variables) and redeploy — no code changes needed:
 *
 *  - SURVEY_WEBHOOK_URL   A Discord or Slack "Incoming Webhook" URL.
 *                         Each submission is posted there as a message.
 *  - SURVEY_FORWARD_URL   Any URL (e.g. a Formspree/Google Sheets Web
 *                         App endpoint) that accepts a JSON POST — the
 *                         raw payload is forwarded as-is.
 *
 * Both are optional and can be set together; if neither is set, the
 * route still returns success and just logs the entry.
 */

type SurveyPayload = {
  firstName: string;
  anonymous: boolean;
  country: string;
  email: string;
  booksWanted: string;
  expectations: string;
  commonIssues: string;
  additionalNotes: string;
};

function isValidPayload(body: unknown): body is SurveyPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.country === "string" &&
    b.country.trim().length > 0 &&
    typeof b.booksWanted === "string" &&
    b.booksWanted.trim().length > 0 &&
    typeof b.expectations === "string" &&
    b.expectations.trim().length > 0 &&
    typeof b.commonIssues === "string" &&
    b.commonIssues.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const entry = {
    ...body,
    submittedAt: new Date().toISOString(),
  };

  // Always logged — visible in Vercel's function logs for this route.
  console.log("[survey submission]", JSON.stringify(entry));

  const webhookUrl = process.env.SURVEY_WEBHOOK_URL;
  const forwardUrl = process.env.SURVEY_FORWARD_URL;

  const tasks: Promise<unknown>[] = [];

  if (webhookUrl) {
    const name = entry.anonymous ? "Anonymous" : entry.firstName || "Anonymous";
    tasks.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content:
            `New survey response from **${name}** (${entry.country})\n` +
            `Email: ${entry.email}\n` +
            `Books wanted: ${entry.booksWanted}\n` +
            `Expectations: ${entry.expectations}\n` +
            `Common issues: ${entry.commonIssues}\n` +
            (entry.additionalNotes ? `Notes: ${entry.additionalNotes}\n` : ""),
        }),
      }).catch((e) => console.error("[survey webhook error]", e))
    );
  }

  if (forwardUrl) {
    tasks.push(
      fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }).catch((e) => console.error("[survey forward error]", e))
    );
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }

  return NextResponse.json({ ok: true });
}
