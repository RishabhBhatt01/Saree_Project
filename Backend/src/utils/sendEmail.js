const { Resend } = require("resend");
const verificationEmailTemplate = require("./verificationEmailTemplate");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, verificationLink) => {
  const { html, text } = verificationEmailTemplate(verificationLink);

  const { data, error } = await resend.emails.send({
    from: "Thread Sutra <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email - Thread Sutra",
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = sendVerificationEmail;