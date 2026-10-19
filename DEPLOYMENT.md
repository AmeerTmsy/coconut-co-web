# Vercel deployment

Build command: npm run build. Output directory: dist.

Set VITE_API_URL=https://coconut-co-server.onrender.com/api in Vercel for the intended deployment environment, then redeploy. Vite embeds this value during the build. The local Vite proxy only runs during development.

The backend CLIENT_URL must equal the frontend origin (no trailing slash). If products fail, check Render /api/health and /api/products; HTTP 503 or a database connection failure requires fixing Render/Atlas settings.
