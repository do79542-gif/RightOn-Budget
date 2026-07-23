// api/feedback.js  —  Vercel serverless function
//
// Receives the in-app feedback form and emails it to you via Resend
// (the same provider you already use for Supabase auth email).
//
// Setup — Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY   = re_xxxxxxxx        (from resend.com → API Keys)
//   FEEDBACK_TO      = you@yourdomain.com (where feedback lands)
//   FEEDBACK_FROM    = feedback@yourdomain.com
//
// FEEDBACK_FROM must be on a domain you've verified in Resend.
// If you haven't set up a domain yet, use:  onboarding@resend.dev
// That test sender only delivers to the email on your own Resend account —
// which is fine here, since feedback is going to you anyway.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FEEDBACK_TO;
  const from = process.env.FEEDBACK_FROM || 'onboarding@resend.dev';
  if (!apiKey || !to) {
    res.status(500).json({ error: 'Feedback email is not configured' });
    return;
  }

  try {
    const { type, message, email, household, page, userAgent } = req.body || {};

    if (!message || !String(message).trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }
    // Keep the payload sane — this endpoint is public.
    const msg = String(message).slice(0, 5000);
    const kind = String(type || 'Feedback').slice(0, 40);
    const replyTo = String(email || '').slice(0, 200);

    const html =
      `<h2 style="margin:0 0 12px;font-family:system-ui,sans-serif;">RightOn Budget — ${esc(kind)}</h2>` +
      `<p style="white-space:pre-wrap;font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;">${esc(msg)}</p>` +
      `<hr style="border:none;border-top:1px solid #ddd;margin:18px 0;">` +
      `<table style="font-family:system-ui,sans-serif;font-size:12px;color:#555;">` +
      `<tr><td><strong>From</strong></td><td>${esc(replyTo || 'not provided')}</td></tr>` +
      `<tr><td><strong>Household</strong></td><td>${esc(household || '—')}</td></tr>` +
      `<tr><td><strong>Page</strong></td><td>${esc(page || '—')}</td></tr>` +
      `<tr><td><strong>Browser</strong></td><td>${esc(String(userAgent || '').slice(0, 300))}</td></tr>` +
      `<tr><td><strong>Received</strong></td><td>${new Date().toISOString()}</td></tr>` +
      `</table>`;

    const payload = {
      from: `RightOn Budget <${from}>`,
      to: [to],
      subject: `[RightOn Budget] ${kind}${replyTo ? ' from ' + replyTo : ''}`,
      html
    };
    // Lets you hit reply and respond directly to the user.
    if (replyTo && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(replyTo)) {
      payload.reply_to = replyTo;
    }

    const r = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ error: 'Email service rejected the message', detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
}
