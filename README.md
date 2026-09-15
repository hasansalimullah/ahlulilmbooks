# كُتُب أهل العلم — Coming Soon page

A 7-step bilingual (EN/AR) launch survey, matching the flow of the
reference site: First Name → Country → Email → Books You Want →
Your Expectations → Common Issues with Other Bookstores → Additional
Notes → Submit → thank-you screen.

## Files

- `app/page.tsx` — the Coming Soon page itself (this becomes your
  homepage). If you'd rather keep your current homepage and put this
  at a separate URL instead, move it to `app/coming-soon/page.tsx` —
  it'll then live at `/coming-soon`.
- `app/api/survey/route.ts` — the endpoint the form submits to. It
  works immediately (validates + logs every submission to your Vercel
  function logs), and you can wire it to real storage with **zero
  code changes** — see below.

## Adding this to your existing AhlulIlmBooks repo

1. Copy `app/page.tsx` and `app/api/survey/route.ts` into the matching
   paths in your existing project (overwriting your current
   `app/page.tsx` if you want this to be the homepage).
2. Commit and push to your existing GitHub repo as usual:
   ```
   git add app/page.tsx app/api/survey/route.ts
   git commit -m "Add coming soon launch survey"
   git push
   ```
3. Vercel will auto-deploy from the push, same as always — no new
   project or settings needed.

## Making submissions actually go somewhere

Right now every submission is validated and logged, so the form is
fully functional the moment you deploy — but the responses only live
in Vercel's function logs. To have them land somewhere you'll actually
check, set **one** of these in Vercel (Project → Settings →
Environment Variables), then redeploy:

- `SURVEY_WEBHOOK_URL` — a Discord or Slack incoming-webhook URL.
  Each response gets posted there as a message the moment someone
  submits.
- `SURVEY_FORWARD_URL` — any endpoint that accepts a JSON POST
  (a Formspree endpoint, a Google Sheets Apps Script web app, etc.).
  The full response is forwarded there as-is.

No code changes needed for either — the route already checks for
these at request time.

## Notes

- The Arabic name used throughout is **كُتُب أهل العلم** as you asked.
- Colors reuse your existing espresso/gold palette (`#3B2B26` wood-dark,
  `#C9A227` gold, cream background) so it matches the rest of
  AhlulIlmBooks.
- All copy is original — none of it is copied from the reference site.
