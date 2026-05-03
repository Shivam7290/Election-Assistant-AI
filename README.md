<div align="center">
  <h1>🗳️ VoteGuide AI</h1>
  <p><b>Your Intelligent Companion for the Indian Election Process</b></p>
  
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://voteguide-ai-five.vercel.app/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
  [![Gemini](https://img.shields.io/badge/Powered_by-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)]()
  
  <p>Created for the <b>Prompt War Challenge</b></p>
</div>

Live Demo: https://electionassistantai7351.vercel.app/
<br />

## 🌟 Elevator Pitch
Navigating the democratic process can be intimidating, especially for first-time voters. **VoteGuide AI** bridges this gap by providing an accessible, bilingual, and highly interactive web platform. Powered by Google's Gemini AI, it delivers strictly neutral, factual, and easy-to-understand guidance on voting timelines, registration, and required documents.

## ✨ Core Features
- **🤖 Floating AI Assistant**: A sleek, non-intrusive chat widget powered by the Gemini 2.5 Flash model. It remembers context and is strictly prompted to avoid bias and provide step-by-step assistance.
- **🌗 Premium UI & Dark Mode**: A stunning, modern interface featuring glassmorphism, responsive CSS variables, and seamless light/dark theme switching that remembers user preferences.
- **✨ Micro-interactions & Animations**: Built with `framer-motion`, the site feels alive. Elements stagger into view, buttons scale playfully, and a confetti celebration rewards positive civic actions like registering to vote.
- **🔍 Voter ID Verification (Simulated)**: A dedicated, interactive UI flow that demonstrates how users could instantly verify their electoral status.
- **🌐 Bilingual Support**: Instant English/Hindi toggle that translates both the static UI and dynamically changes the system prompts sent to the AI.

## 🛠️ Tech Stack
- **Frontend Framework**: React 19 + Vite
- **Animations**: Framer Motion & Canvas Confetti
- **Styling**: Modern Vanilla CSS with CSS Variables & Grid/Flexbox layouts.
- **Icons**: Lucide React
- **Backend / API**: Vercel Serverless Functions (`api/chat.js`)
- **AI Model**: `@google/genai` SDK (Gemini API)

## 🚀 How to Run Locally

### 1. Clone & Install
```bash
git clone https://github.com/Shivam7290/Prompt-bar.git
cd voteguide-ai
npm install
```

### 2. Add Your AI Key
Create a `.env` file in the root of the `voteguide-ai` directory and add your Google Gemini API Key:
```env
GEMINI_API_KEY=your_actual_key_here
```

### 3. Start the Server
Because the app uses Vercel Serverless Functions for the backend, use the Vercel CLI to run it locally:
```bash
npm run dev
# This runs `vercel dev`, seamlessly hosting both the Vite frontend and the /api/chat backend.
```

## 🔮 Future Roadmap
- Integration with actual Election Commission APIs (when available publicly).
- Voice-to-text input for the AI Assistant to help rural demographics.
- Regional language expansion beyond Hindi (Tamil, Bengali, Marathi).

<br />
<div align="center">
  <i>Made with ❤️ for democracy and technology.</i>
</div>
