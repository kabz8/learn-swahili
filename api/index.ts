import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { registerRoutes } from "../server/routes.js";

// Create an express app for serverless
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes (includes auth internally) - we don't need the server return value for Vercel
registerRoutes(app as unknown as any).catch(console.error);

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure Express sees the /api prefix even if Vercel strips it in routing
  if (!req.url?.startsWith('/api')) {
    req.url = `/api${req.url || ''}`;
  }
  (app as any)(req, res);
}


