# Akshat Portfolio

Futuristic developer portfolio built with React + Vite. Showcases projects, skills, certifications, and LeetCode progress with interactive particle backgrounds and smooth animations.

## Quick Start

```bash
git clone <repo-url>
cd portfolio
cp .env.example .env.local  # Add your EmailJS & LeetCode credentials
npm install
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Environment Variables

Create `.env.local` from `.env.example`:

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_LEETCODE_USERNAME` | LeetCode username |
| `VITE_SITE_URL` | Deployed site URL |

## Project Structure

```
src/
├── components/     # React components
├── data/          # Extracted data (projects, skills, etc.)
├── hooks/         # Custom React hooks
├── styles/        # Global CSS
├── assets/        # Static assets
├── App.jsx        # Root component
└── main.jsx       # Entry point
```

## Deployment

Deploy to Vercel, Netlify, or any static host. Set the env vars in your hosting dashboard.

## Built With

- React 19 + Vite
- Lucide React (icons)
- EmailJS (contact form)
- Google Fonts (Inter, JetBrains Mono, Orbitron)