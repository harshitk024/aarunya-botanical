import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <h3>Email Verification</h3>
      <p>Please verify your email to continue:</p>
      <a href="${verifyUrl}">Verify Email</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
};
