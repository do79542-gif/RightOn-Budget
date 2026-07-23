// api/parse-receipt.js  —  Vercel serverless function (optional AI receipt reader)
//
// Setup:
//   1. Put this file at  api/parse-receipt.js  in your repo (Vercel auto-detects /api).
//   2. In Vercel → Project → Settings → Environment Variables, add:
//        ANTHROPIC_API_KEY = <your Anthropic API key>
//      (optional) RECEIPT_MODEL = claude-haiku-4-5-20251001
//   3. Redeploy. The "✨ Suggest" button in the Receipts flow will start working.
//
// If this endpoint is absent or the key isn't set, the app degrades gracefully:
// users just fill the transaction in manually.
//
// Cost note: Haiku is the cheapest vision-capable model and is plenty for receipts.
// Verify the current model string / pricing at https://docs.claude.com/en/docs/about-claude/models/overview

const MODEL = process.env.RECEIPT_MODEL || 'claude-haiku-4-5-20251001';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
    return;
  }

  try {
    const { image, mediaType, categories } = req.body || {};
    if (!image) { res.status(400).json({ error: 'No image provided' }); return; }

    const catList = (categories || []).map(c => `- ${c.key}: ${c.label}`).join('\n');
    const isPdf = String(mediaType || '').includes('pdf');

    const fileBlock = isPdf
      ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: image } }
      : { type: 'image',    source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: image } };

    const prompt =
`You are a bookkeeping assistant for a Canadian incorporated business. Read this receipt or invoice and extract the key details.

Return ONLY a JSON object (no prose, no markdown fences) with exactly these keys:
- "type": "expense" or "revenue"  (receipts are almost always "expense")
- "date": "YYYY-MM-DD"  (the transaction date; "" if you can't tell)
- "amount": number  (the PRE-TAX subtotal in dollars. If only a total and a GST/HST line are shown, subtract the tax from the total. If no tax is shown, use the total.)
- "tax": number  (the GST/HST amount in dollars; 0 if none is shown)
- "description": string  (short: vendor name + what was bought, max ~50 chars)
- "category": one of the category keys below that best fits, else "other_exp"

Category keys:
${catList}

Use "" for unknown text and 0 for unknown numbers. Respond with only the JSON object.`;

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        messages: [{ role: 'user', content: [fileBlock, { type: 'text', text: prompt }] }]
      })
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      res.status(502).json({ error: 'AI request failed', detail });
      return;
    }

    const json = await anthropicRes.json();
    const text = (json.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .trim();

    const clean = text.replace(/^```json/i, '').replace(/```$/,'').replace(/```/g, '').trim();
    let parsed;
    try { parsed = JSON.parse(clean); }
    catch (e) { res.status(200).json({}); return; } // couldn't parse — let the user fill manually

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
}
