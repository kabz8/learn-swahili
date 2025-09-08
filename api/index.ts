import express from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { registerRoutes } from "../server/routes";
import { setupAuth } from "../server/auth";

// Create an express app for serverless
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup auth/session and routes
setupAuth(app);
registerRoutes(app as unknown as any);

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Delegate to express
  (app as any)(req, res);
}


