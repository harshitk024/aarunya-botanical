import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {

  console.log("Sending verification email.... to.. ",email)
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await sgMail.send({
    to: email,
    from: "kharshit020@gmail.com",
    subject: "Verify your email",
    html: `<p>Click <a href=${verifyUrl}>Verify</a></p>`,
  });
}

