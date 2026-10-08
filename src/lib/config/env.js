import {z} from "zod";
import {config} from "dotenv";
config();

const schema = z.object({
    PORT: z.string().default('3000'),
    MONGODB_URL: z.string().trim(),
    JWT_SECRET: z.string().trim(),
    MAIL_USER : z.string().trim().toLowerCase(),
    MAIL_PASS: z.string().trim(),
    GOOGLE_WEB_OAUTH_CLIENT_ID: z.string().trim(),
    REDIS_PORT: z.string().default('6379'),
    REDIS_HOST: z.string(),
    REDIS_PASSWORD: z.string(),
    MAILJET_API_KEY:z.string().trim(),
    MAILJET_SECRET_KEY:z.string().trim(),
    MAILJET_FROM_EMAIL:z.string(),
    MAILJET_FROM_NAME:z.string(),
});
const parsed = schema.parse(process.env);
export const env = {
    port: Number(parsed.PORT),
    db:{
        url: parsed.MONGODB_URL,
    },
    google: {
        webClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
    },
    redis: {
        host: parsed.REDIS_HOST,
        port: Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD,
    },
    nodemailer: {
        user: parsed.MAIL_USER,
        pass: parsed.MAIL_PASS,
    },
    jwt: {
        secret: parsed.JWT_SECRET,
    },
    mailjet:{
        apiKey:parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_SECRET_KEY,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
        fromName: parsed.MAILJET_FROM_NAME,
    },
    payment: {},
    aws: {},
}