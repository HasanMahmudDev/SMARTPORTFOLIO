import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV:z.enum(['development','test','production']).default('development'), PORT:z.coerce.number().default(3000),
  DB_HOST:z.string().default('localhost'), DB_PORT:z.coerce.number().default(3306), DB_NAME:z.string().default('smartportfolio'),
  DB_USER:z.string().default('root'), DB_PASSWORD:z.string().default(''), JWT_SECRET:z.string().min(16).default('development-secret-change-me-now'),
  JWT_EXPIRES_IN:z.string().default('1h'), JWT_REFRESH_SECRET:z.string().min(16).default('development-refresh-change-me'),
  JWT_REFRESH_EXPIRES_IN:z.string().default('7d'), APP_URL:z.string().default('http://localhost:5173'),
  CORS_ORIGINS:z.string().default('http://localhost:5173'), UPLOAD_DIR:z.string().default('uploads'), UPLOAD_MAX_SIZE_MB:z.coerce.number().default(5)
});
export const env = schema.parse(process.env);

