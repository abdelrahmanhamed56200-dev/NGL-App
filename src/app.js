import express from 'express'
import {connectDB} from "./lib/db/mongoose.js";
import cors from 'cors';
import { globalErrorHandler } from './lib/error/error.handler.js';
import { router } from './route.js';

export async function createApp() {
const app = express();
app.use(cors({origin:'http://localhost:4200'}));

app.use(express.json())

await connectDB()

app.use("/api",router)
app.use(globalErrorHandler)

return app;
}