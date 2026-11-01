# ♻ EcoWaste AI — Sustainable Waste Management using Deep Learning

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2411cs010370%2Fecowaste-ai)

EcoWaste AI is an advanced, full-stack deep-learning waste classification and sustainability platform. It automatically categorizes discarded items into specific waste categories, calculates environmental impact (CO₂ saved, decomposition timelines), and provides actionable recycling and upcycling steps.

---

## 🌟 Key Features

- **⚡ Dual-Engine Deep Learning Inference**:
  - Cloud AI Gateway (Gemini 3.6 Flash / GPT-4o-vision) when API keys are configured.
  - Built-in **MobileNetV2 / WasteNet Vision Classifier** fallback with real-time RGB canvas spectrum feature extraction.
- **📊 7 Core Classification Classes**:
  1. **Plastic** (PET #1, HDPE #2, crushed water bottles)
  2. **Metal** (Aluminum beverage cans, tins)
  3. **Paper** (Corrugated cardboard, packaging)
  4. **Organic** (Fruit peels, food biomass, compost)
  5. **Glass** (Beverage bottles, jars)
  6. **E-Waste** (Printed circuit boards, electronics)
  7. **Hazardous** (Spent alkaline & lithium batteries)
- **🌿 Sustainability Metrics**:
  - Live sustainability score gauge (0–100)
  - Estimated kilograms of CO₂ avoided
  - Decomposition timeline projections
  - Color-coded municipal bin assignments
- **📸 1-Click Interactive Sample Gallery**:
  - Pre-loaded sample items on the Detection page for instant testing.
  - Dedicated offline high-resolution test photos in `sample_images/`.
- **📄 Printable PDF Environmental Reports**:
  - Generate formatted, printable disposal audit reports in one click.

---

## 🚀 One-Click 24/7 Free Cloud Deployment

Deploy free on **Vercel** with zero configuration:

1. Click the button below:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F2411cs010370%2Fecowaste-ai)

2. Sign in with GitHub (`2411cs010370`).
3. Click **"Create"** / **"Deploy"**.
4. In under 60 seconds, your site will be live 24/7 with a permanent HTTPS link (e.g. `https://ecowaste-ai.vercel.app`)!

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/2411cs010370/ecowaste-ai.git
cd ecowaste-ai

# Install dependencies
npm install

# Start the full-stack development server
npm run dev
```

Visit `http://localhost:8080` in your browser.

---

## 🛠 Tech Stack

- **Framework**: TanStack Start (React 19 + Nitro full-stack server functions)
- **Styling**: Tailwind CSS + Shadcn UI primitives + Lucide Icons
- **Language**: TypeScript
- **Hosting**: Vercel / Cloudflare Pages / Node.js
