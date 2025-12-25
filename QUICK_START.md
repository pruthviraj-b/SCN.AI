# Quick Start: ML Career Engine

## 🚀 Run the System (2 Commands)

### Terminal 1: Start ML Service
```bash
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Terminal 2: Start Next.js
```bash
npm run dev
```

## ✅ Verify It's Working

1. **ML Service Health Check**
   - Visit: `http://localhost:8000/health`
   - Should see: `{"status": "healthy"}`

2. **Next.js App**
   - Visit: `http://localhost:4000`
   - Navigate to onboarding/assessment page

## 📍 Where to Use Components

### In Your Existing App

Add these routes to your Next.js app:

**1. Onboarding/Assessment Page**
```tsx
// src/app/assessment/page.tsx
import Wizard from '@/components/onboarding/Wizard';

export default function AssessmentPage() {
  return <Wizard />;
}
```
**URL:** `http://localhost:4000/assessment`

**2. Results Page**
```tsx
// src/app/results/page.tsx
import CareerMatchResults from '@/components/results/CareerMatchResults';

export default function ResultsPage() {
  // Get recommendations from API or localStorage
  return <CareerMatchResults matches={recommendations} />;
}
```
**URL:** `http://localhost:4000/results`

**3. Roadmap Page**
```tsx
// src/app/roadmap/page.tsx
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';

export default function RoadmapPage() {
  return <RoadmapTimeline roadmap={roadmap} />;
}
```
**URL:** `http://localhost:4000/roadmap`

**4. Placement Dashboard**
```tsx
// src/app/placement/page.tsx
import PlacementDashboard from '@/components/placement/PlacementDashboard';

export default function PlacementPage() {
  return <PlacementDashboard prediction={prediction} />;
}
```
**URL:** `http://localhost:4000/placement`

## 🔗 Add to Your Navigation

```tsx
// src/components/Navigation.tsx
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Career Assessment', href: '/assessment' },  // NEW
  { name: 'My Results', href: '/results' },            // NEW
  { name: 'My Roadmap', href: '/roadmap' },            // NEW
  { name: 'Placement Probability', href: '/placement' }, // NEW
  { name: 'Dashboard', href: '/dashboard' }
];
```

## 📊 Complete User Flow

```
Homepage
   ↓ (Click "Get Started")
Assessment/Onboarding (/assessment)
   ↓ (Complete 7 steps)
Results Page (/results)
   ↓ (Select career)
Roadmap Page (/roadmap)
   ↓ (Track progress)
Placement Dashboard (/placement)
```

## 🎯 Integration Points

### Option 1: Standalone Pages (Recommended)
Create separate pages for each component as shown above.

### Option 2: Dashboard Integration
Add components to your existing dashboard:

```tsx
// src/app/dashboard/page.tsx
import CareerMatchResults from '@/components/results/CareerMatchResults';
import PlacementDashboard from '@/components/placement/PlacementDashboard';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <CareerMatchResults matches={recommendations} />
      <PlacementDashboard prediction={prediction} />
      <RoadmapTimeline roadmap={roadmap} />
    </div>
  );
}
```

### Option 3: Modal/Popup
Use components in modals for inline experience:

```tsx
import { Dialog } from '@/components/ui/dialog';
import Wizard from '@/components/onboarding/Wizard';

<Dialog>
  <Wizard />
</Dialog>
```

## 🗂️ File Locations

```
Your Project/
├── ml-service/              ← Python ML Service
│   ├── app/
│   │   ├── main.py         ← FastAPI app (port 8000)
│   │   ├── models/
│   │   │   ├── hybrid.py   ← Recommendation algorithm
│   │   │   └── placement.py ← Placement predictor
│   │   └── utils/
│   │       └── data_loader.py
│   └── requirements.txt
│
├── src/
│   ├── app/
│   │   ├── api/ml/         ← Next.js API routes
│   │   │   ├── recommendations/route.ts
│   │   │   └── placement/route.ts
│   │   ├── assessment/     ← NEW: Wizard page
│   │   ├── results/        ← NEW: Results page
│   │   ├── roadmap/        ← NEW: Roadmap page
│   │   └── placement/      ← NEW: Placement page
│   │
│   ├── components/
│   │   ├── onboarding/
│   │   │   └── Wizard.tsx  ← 7-step wizard
│   │   ├── results/
│   │   │   └── CareerMatchResults.tsx
│   │   ├── roadmap/
│   │   │   └── RoadmapTimeline.tsx
│   │   └── placement/
│   │       └── PlacementDashboard.tsx
│   │
│   ├── lib/
│   │   └── roadmap-generator.ts
│   │
│   ├── types/
│   │   └── enhanced-profile.ts
│   │
│   └── data/
│       └── careers-enhanced.json
│
└── .env.local              ← Add ML_SERVICE_URL=http://localhost:8000
```

## ⚙️ Environment Setup

Create `.env.local`:
```bash
ML_SERVICE_URL=http://localhost:8000
```

## 🧪 Test the System

1. **Start both services** (ML + Next.js)
2. **Visit** `http://localhost:4000/assessment`
3. **Complete wizard** (all 7 steps)
4. **View results** at `/results`
5. **Select career** → See roadmap at `/roadmap`
6. **Check placement** at `/placement`

## 🎨 Styling

All components use:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Glassmorphism** design
- **Responsive** (mobile-first)

Make sure you have these in your `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        // ... your colors
      }
    }
  }
}
```

## 🚨 Common Issues

**Port 8000 already in use?**
```bash
# Change port in ML service
uvicorn app.main:app --reload --port 8001

# Update .env.local
ML_SERVICE_URL=http://localhost:8001
```

**Components not found?**
- Check import paths match your file structure
- Ensure all files are in correct directories

**No data showing?**
- Verify ML service is running
- Check browser console for errors
- Ensure API routes are accessible

## 📞 Support

Check the full guide: `ML_ENGINE_GUIDE.md`
Check implementation details: `walkthrough.md`

---

**You're all set! 🎉** The ML Career Engine is ready to use in your application!
