import express from 'express'
import {connectDB} from "./lib/db/mongoose.js";
import cors from 'cors';
import { globalErrorHandler } from './lib/error/error.handler.js';
import { router } from './route.js';
import { correlationId } from './lib/correlation/correlationId.js';
import cookieParser from 'cookie-parser';

export async function createApp() {
const app = express();
app.use(cors({origin:'http://localhost:4200'}));

app.use(express.json())
app.use(cookieParser())

app.use(correlationId)

await connectDB()

app.use("/api",router)
app.use(globalErrorHandler)

return app;
}