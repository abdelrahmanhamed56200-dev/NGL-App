import http from 'http';
import { createApp } from './app.js';
import { logger } from './pkg/logger/logger.js';
import mongoose from 'mongoose';
import { env } from './lib/config/env.js';


const app = await createApp();
const server = http.createServer(app);


server.listen(env.port, () => {
    logger.info(`Server is running on port ${env.port}`);
}
)
async function shutdown() {
    logger.info('Shutting down server...');
    server.close(async () => {
        
            await mongoose.disconnect();
            process.exit(0);
        
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);