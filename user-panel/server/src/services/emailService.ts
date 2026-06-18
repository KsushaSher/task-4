import nodemailer from 'nodemailer';
import { BASE_URL_CLIENT } from '../utils/constants';

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
  const verificationLink = `${BASE_URL_CLIENT}/verify/${token}`;

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
