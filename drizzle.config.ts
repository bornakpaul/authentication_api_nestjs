import {defineConfig} from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
     throw new Error('DATABASE_URL environment variable is not set');
   }

export default defineConfig({
     schema: './src/**/schema.ts',
     out: './drizzle',
     dialect: 'postgresql',
     dbCredentials: {
          url: process.env.DATABASE_URL,
     },
});