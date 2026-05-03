import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

const SYSTEM_PROMPT = `You are VoteGuide AI, an election assistant for India. 
CRITICAL RULES:
1. NEVER write long paragraphs. 
2. ALWAYS use short, punchy bullet points.
3. Keep total responses under 100 words.
4. Use emojis to make it engaging.
5. Be completely neutral and factual. No political bias.`;

// API Route
app.post('/api/chat', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS
