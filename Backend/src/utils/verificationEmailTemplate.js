const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Returns { html, text } for the verification email
const verificationEmailTemplate = (link, expiryMinutes = 30) => {
  const safeLink = escapeHtml(link);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify your email - Thread Sutra</title>
</head>
<body style="margin:0;padding:0;background-color:#EFE7DA;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Confirm your email to start shopping at Thread Sutra.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EFE7DA;padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#FAF6F0;">
        <tr>
          <td style="padding:28px 32px 20px 32px;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#2B2622;">
            Thread <span style="color:#7B2A2A;font-style:italic;">Sutra</span>
          </td>
        </tr>
        <tr>
          <td style="border-top:4px dashed #C9A227;font-size:0;line-height:0;height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:32px 32px 8px 32px;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#2B2622;">
            Verify your email
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px 32px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#5A544F;">
            Welcome to Thread Sutra. Please confirm your email address to activate your account and start exploring our handwoven sarees.
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#7B2A2A" style="background-color:#7B2A2A;">
                  <a href="${safeLink}" style="display:inline-block;padding:14px 32px;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#FAF6F0;text-decoration:none;">Verify email</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 8px 32px;font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#5A544F;">
            This link expires in ${expiryMinutes} minutes.
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px 32px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#8A847F;">
            Button not working? Copy and paste this link into your browser:<br>
            <a href="${safeLink}" style="color:#1F4B43;word-break:break-all;">${safeLink}</a>
          </td>
        </tr>
        <tr>
          <td style="border-top:4px dashed #1F4B43;padding:20px 32px 28px 32px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#8A847F;">
            If you didn't create a Thread Sutra account, you can safely ignore this email.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text =
    `Verify your email - Thread Sutra\n\n` +
    `Open this link to confirm your email (valid for ${expiryMinutes} minutes):\n${link}\n\n` +
    `If you didn't create an account, you can ignore this email.`;

  return { html, text };
};

module.exports = verificationEmailTemplate;