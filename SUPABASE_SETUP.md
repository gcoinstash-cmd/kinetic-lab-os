# KINETIC LAB — Supabase Database Integration Guide

## 🚀 Quick Connect in Under 3 Minutes

Follow these quick steps to hook up your PostgreSQL Supabase database to **KINETIC LAB**.

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a new project.
2. Select your preferred database region and set a strong database password.

### 2. Execute SQL Schemas
1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query**, paste the contents of `supabase/schema.sql`, and click **Run**.
3. Create another query, paste `supabase/seed.sql`, and click **Run** to preload live elite athlete rosters and force plate runs.

### 3. Configure Environment Variables
Copy `.env.example` to `.env` in the root of your project:
```bash
cp .env.example .env
```

Fill in your project credentials from **Project Settings > API**:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Tables Included in this OS
- `athlete_profiles`: Athlete roster, sports disciplines, top velocities, and Reactive Strength Index (RSI).
- `biomechanical_assessments`: Testing tickets, protocol assignments, dates, fee tracking, and status phases.
- `force_plate_runs`: 1000Hz ground reaction forces (GRF), contact times (GCT), and limb asymmetry percentages.
- `lab_billing_retainers`: Team retainers, combine cohort licensing, and contract escrow tracking.

### 5. Build and Deploy
```bash
npm install
npm run build
```
Deploy the generated `dist/` directory to Render, Vercel, Netlify, or Cloudflare Pages.
