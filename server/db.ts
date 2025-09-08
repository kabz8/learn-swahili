import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString })
  : undefined as unknown as Pool;

export const db = connectionString
  ? drizzle({ client: pool as Pool, schema })
  : (new Proxy({}, {
      get() {
        throw new Error("DATABASE_URL is not configured. Set it in your environment (e.g. Vercel Project Settings) to enable database operations.");
      }
    }) as any);