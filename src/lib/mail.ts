import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.CONTACT_EMAIL,
    subject: `New Inquiry via Website —  ${name}`,
    html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #222;">
      Website Inquiry Notification
    </h2>

    <p>
      You have received a new message through your website contact form.
      The details of the inquiry are provided below:
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <p><strong>Sender Name:</strong> ${name}</p>
    <p><strong>Email Address:</strong> ${email}</p>

    <p><strong>Message:</strong></p>
    <div style="
      background: #f9f9f9;
      padding: 15px;
      border-left: 4px solid #ccc;
      border-radius: 4px;
    ">
      ${message.replace(/\n/g, "<br>")}
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <p style="font-size: 13px; color: #666;">
      This message was submitted via your website contact form.
      You may reply directly to this email to respond to the sender.
    </p>
  </div>
`,
  });
}


