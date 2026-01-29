import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await sgMail.send({
    to: email,
    from: "Aarunya Botanicals <no-reply@aarunyabotanicals.com>",
    replyTo: "support@aarunyabotanicals.com",
    subject: "Verify your email address",
    text: `Verify your email: ${verifyUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Welcome to Aarunya Botanicals 🌿</h2>
        <p>Thanks for signing up.</p>
        <p>Please verify your email address:</p>
        <a href="${verifyUrl}" 
           style="display:inline-block;padding:10px 16px;background:#166534;color:#fff;text-decoration:none;border-radius:4px">
           Verify Email
        </a>
        <p style="margin-top:16px;font-size:12px;color:#666">
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
