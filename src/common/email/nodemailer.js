import { config } from "dotenv";
config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


export async function sendEmail(to, subject, html) {
    try {
        const info = await transporter.sendMail({
            from: `"NGL-APP" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html
        });

        return info;
    } catch (error) {
        console.error("Email error:", error);
        throw error;
    }
}