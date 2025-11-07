# Wishboard Starter (Next.js 14, Tailwind)
Paste → Parse → Cards. A minimal foundation for your "living mood‑board" app with **LLM parsing** and **real images from Unsplash**.

## Quick start

### 1. Install dependencies
```bash
cd wishboard-starter
pnpm i    # or npm install / yarn
```

### 2. Set up API keys
Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add:
- **ANTHROPIC_API_KEY** (required): Get from [Anthropic Console](https://console.anthropic.com/)
- **UNSPLASH_ACCESS_KEY** (optional): Get from [Unsplash Developers](https://unsplash.com/developers)

### 3. Run the dev server
```bash
pnpm dev  # http://localhost:3000
```

Then open `http://localhost:3000`, paste your wishlist, and click **Generate board**.

## What it does
- `/api/ingest` uses **Claude (Anthropic LLM)** to intelligently parse your wishlist text
- Fetches **real images from Unsplash** based on your ideas
- Frontend shows a Pinterest-style masonry grid with a simple Plan Sheet modal
- Automatically categorizes items as "This Weekend", "Soon", or "Someday"

## Features
- ✅ LLM-powered wishlist parsing (Anthropic Claude)
- ✅ Real images from Unsplash API
- ✅ Responsive masonry grid layout
- ✅ Interactive plan sheet modal
- ✅ Priority tagging (now/soon/someday)

## Next steps
- Add tabs/filters for **This Weekend / Soon / Someday** with client-side filtering
- Add Google Maps + Calendar deep links
- Persist to Supabase (ideas/cards tables)
- Add image caching and optimization

Made for Miguel's wishlist: camping with Niko, hiking, canoeing, teach biking, Costa Rica, Hill Country, Starbase road trip.