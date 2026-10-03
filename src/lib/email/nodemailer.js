import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: env.nodemailer.user,
        pass: env.nodemailer.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});


export async function sendEmail(to, subject, html) {
    try {
        const info = await transporter.sendMail({
            from: `"NGL-APP" <${env.nodemailer.user}>`,
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