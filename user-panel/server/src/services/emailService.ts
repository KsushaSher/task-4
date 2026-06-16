import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `http://localhost:5173/verify/${token}`;

  await transporter.sendMail({
    to: email,
    subject: 'Confirm your email',
    html: `
      <h2>Email verification</h2>
      <a href="${verificationLink}">
        Confirm email
      </a>
    `,
  });
};
