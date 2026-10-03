import {RedisCacheProvider} from '../../pkg/cache/redis.js';
import { env } from '../config/env.js';
export const cacheProvider = new RedisCacheProvider({
    host: env.redis.host || 'localhost',
    port: env.redis.port || 6379,
    password: env.redis.password || '',
});