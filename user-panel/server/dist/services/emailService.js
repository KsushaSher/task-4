"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("../utils/constants");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${constants_1.BASE_URL_CLIENT}/verify/${token}`;
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
exports.sendVerificationEmail = sendVerificationEmail;
