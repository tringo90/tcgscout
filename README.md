# TCGscout — Free AI Card Grading

## Local development

### 1. Install dependencies
```bash
npm install
npm install express cors dotenv  # for local proxy
```

### 2. Add your API key
```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
```
Get your key at: https://console.anthropic.com

### 3. Run locally (two terminals)

**Terminal 1 — proxy server:**
```bash
node proxy.js
```

**Terminal 2 — Vite dev server:**
```bash
npm run dev
```

Open http://localhost:5173

---

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create tcgscout --public --push
```

### 2. Deploy
```bash
npm install -g vercel
vercel
```

### 3. Add environment variable
In Vercel dashboard → Settings → Environment Variables:
- Key: `ANTHROPIC_API_KEY`
- Value: your key from console.anthropic.com

### 4. Redeploy
```bash
vercel --prod
```

---

## Project structure
```
tcgscout/
├── api/
│   └── analyse.js      # Vercel serverless proxy (keeps API key safe)
├── src/
│   ├── App.jsx         # Main app — all components
│   └── main.jsx        # React entry point
├── index.html
├── vite.config.js
├── vercel.json
├── proxy.js            # Local dev proxy
└── package.json
```
