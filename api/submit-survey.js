const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
      firstName,
      anonymous,
      country,
      email,
      booksWanted,
      expectations,
      commonIssues,
      additionalNotes
    } = req.body || {};

    const nameLine = anonymous || !firstName ? 'Anonymous' : firstName;

    const { error } = await resend.emails.send({
      // "from" must be on a domain you've verified in Resend.
      // Until you verify ahlulilmbooks.com (or your domain), you can use
      // Resend's shared testing address below.
      from: 'Ahlulilmbooks Survey <survey@ahlulilmbooks.com>',
      to: process.env.SURVEY_RECIPIENT_EMAIL, // set this in Vercel env vars
      reply_to: email || undefined,
      subject: `New survey response from ${nameLine}`,
      text: [
        `Name: ${nameLine}`,
        `Country: ${country || 'N/A'}`,
        `Email: ${email || 'N/A'}`,
        '',
        'Books wanted:',
        booksWanted || '—',
        '',
        'Expectations:',
        expectations || '—',
        '',
        'Common issues with other bookstores:',
        commonIssues || '—',
        '',
        'Additional notes:',
        additionalNotes || '—'
      ].join('\n')
    });

    if (error) {
      console.error('Resend error:', error);
      res.status(500).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Submit survey error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
