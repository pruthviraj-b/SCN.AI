# 🚀 ML Career Recommendation Engine - User Guide

## How It Works: Complete Flow

### **Step-by-Step User Journey**

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER VISITS HOMEPAGE                                         │
│    → Clicks "Get Started" or "Career Assessment"                │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. ONBOARDING WIZARD (7 Steps)                                  │
│    Step 1: Profile (name, education, status)                    │
│    Step 2: Skills (AI analysis + manual selection)              │
│    Step 3: Goals (objectives, domains, learning style)          │
│    Step 4: Professional (experience, salary, industries)        │
│    Step 5: Timeline (career goals, risk tolerance)              │
│    Step 6: Personality (work style, learning pace)              │
│    Step 7: Review & Confirm                                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. ML PROCESSING (Python Service)                               │
│    → Profile sent to /api/ml/recommendations                    │
│    → Hybrid algorithm calculates matches                        │
│    → Placement predictor analyzes probability                   │
│    → Roadmap generator creates personalized plan                │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. RESULTS DISPLAY                                              │
│    → Top 5 career matches with percentages                      │
│    → Placement probability dashboard                            │
│    → Personalized learning roadmap                              │
│    → Actionable improvement suggestions                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. USER SELECTS CAREER PATH                                     │
│    → Views detailed roadmap                                     │
│    → Tracks milestone progress                                  │
│    → Accesses learning resources                                │
│    → Monitors improvement over time                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗺️ Where Components Live

### **Frontend (Next.js)**

#### **1. Onboarding Wizard**
**Location:** `src/components/onboarding/Wizard.tsx`
**Route:** `/onboarding` or `/assessment`
**What it does:**
- Collects 32+ data points from user
- 7-step progressive form with validation
- Real-time error checking
- Progress bar showing completion

**Integration:**
```tsx
// In your page component
import Wizard from '@/components/onboarding/Wizard';

export default function OnboardingPage() {
  return <Wizard />;
}
```

#### **2. Career Match Results**
**Location:** `src/components/results/CareerMatchResults.tsx`
**Route:** `/results` or `/dashboard/recommendations`
**What it does:**
- Displays top 5 career matches
- Shows match percentages (0-100%)
- Expandable cards with details
- Missing skills analysis
- Target companies list

**Integration:**
```tsx
import CareerMatchResults from '@/components/results/CareerMatchResults';

// After getting recommendations from API
const [matches, setMatches] = useState([]);

<CareerMatchResults 
  matches={matches}
  onSelectCareer={(career) => {
    // Navigate to roadmap or save selection
    router.push(`/roadmap/${career.id}`);
  }}
  userSkills={userProfile.skills}
/>
```

#### **3. Roadmap Timeline**
**Location:** `src/components/roadmap/RoadmapTimeline.tsx`
**Route:** `/roadmap` or `/dashboard/my-roadmap`
**What it does:**
- Interactive milestone timeline
- Progress tracking
- Resource links
- Completion criteria
- Locked/unlocked states

**Integration:**
```tsx
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import { generateRoadmap } from '@/lib/roadmap-generator';

// Generate roadmap
const roadmap = generateRoadmap(userProfile, selectedCareer, missingSkills);

<RoadmapTimeline 
  roadmap={roadmap}
  onMilestoneComplete={(id) => {
    // Save progress to database
    saveMilestoneProgress(userId, id);
  }}
  completedMilestones={new Set(userProgress)}
/>
```

#### **4. Placement Dashboard**
**Location:** `src/components/placement/PlacementDashboard.tsx`
**Route:** `/dashboard/placement` or `/placement-probability`
**What it does:**
- Circular probability display
- Profile strength metrics
- Personalized insights
- Improvement suggestions with impact

**Integration:**
```tsx
import PlacementDashboard from '@/components/placement/PlacementDashboard';

// Get prediction from API
const [prediction, setPrediction] = useState(null);

<PlacementDashboard 
  prediction={prediction}
  onImprove={(area) => {
    // Navigate to improvement resources
    router.push(`/improve/${area.toLowerCase()}`);
  }}
/>
```

---

### **Backend (API Routes)**

#### **1. ML Recommendations Endpoint**
**Location:** `src/app/api/ml/recommendations/route.ts`
**URL:** `POST /api/ml/recommendations`
**What it does:**
- Receives user profile
- Calls Python ML service
- Returns top 5 career matches
- Fallback to basic algorithm if ML service down

**Usage:**
```typescript
const response = await fetch('/api/ml/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userProfile)
});

const { recommendations } = await response.json();
```

#### **2. Placement Prediction Endpoint**
**Location:** `src/app/api/ml/placement/route.ts`
**URL:** `POST /api/ml/placement`
**What it does:**
- Receives user profile
- Calls Python ML service
- Returns placement probability + insights

**Usage:**
```typescript
const response = await fetch('/api/ml/placement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userProfile)
});

const { prediction } = await response.json();
```

---

### **Python ML Service**

#### **Service Location:** `ml-service/`
**Port:** `8000` (configurable)
**Framework:** FastAPI

**Main Components:**

1. **`app/main.py`** - FastAPI application
   - Endpoints: `/api/ml/recommendations`, `/api/ml/placement-probability`
   - CORS configuration
   - Health checks

2. **`app/models/hybrid.py`** - Recommendation algorithm
   - Content-based filtering
   - Collaborative filtering
   - Hybrid scoring

3. **`app/models/placement.py`** - Placement predictor
   - Feature extraction
   - Probability calculation
   - Insights generation

4. **`app/utils/data_loader.py`** - Data utilities
   - Loads career database
   - Enhances career data
   - Mock data fallback

---

### **Data Files**

#### **Career Database**
**Location:** `src/data/careers-enhanced.json`
**Contains:** 5 detailed career paths
**Used by:** Python ML service, roadmap generator

**Structure:**
```json
{
  "id": "1",
  "title": "Full Stack Developer",
  "category": "Software Development",
  "requiredSkills": ["React", "Node.js", "SQL"],
  "salaryRange": { "min": 60000, "max": 140000 },
  "topCompanies": ["Google", "Microsoft", ...],
  "learningResources": [...],
  "careerPath": { "entry": "...", "senior": "..." }
}
```

---

## 🔧 Integration Guide

### **Complete Flow Implementation**

#### **1. Create Onboarding Page**
```tsx
// src/app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Wizard from '@/components/onboarding/Wizard';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = async (profileData: any) => {
    // Save profile to database
    await fetch('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });

    // Get ML recommendations
    const mlResponse = await fetch('/api/ml/recommendations', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
    const { recommendations } = await mlResponse.json();

    // Get placement prediction
    const placementResponse = await fetch('/api/ml/placement', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
    const { prediction } = await placementResponse.json();

    // Navigate to results
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Wizard onComplete={handleComplete} />
    </div>
  );
}
```

#### **2. Create Results Page**
```tsx
// src/app/results/page.tsx
'use client';

import { useState, useEffect } from 'react';
import CareerMatchResults from '@/components/results/CareerMatchResults';
import PlacementDashboard from '@/components/placement/PlacementDashboard';

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Load from localStorage or API
    const storedRecs = localStorage.getItem('recommendations');
    const storedPred = localStorage.getItem('prediction');
    
    if (storedRecs) setRecommendations(JSON.parse(storedRecs));
    if (storedPred) setPrediction(JSON.parse(storedPred));
  }, []);

  const handleSelectCareer = (career: any) => {
    // Generate roadmap
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const match = recommendations.find(r => r.career.id === career.id);
    
    const roadmap = generateRoadmap(
      userProfile,
      career,
      match.missingSkills
    );

    // Save and navigate
    localStorage.setItem('selectedRoadmap', JSON.stringify(roadmap));
    router.push('/roadmap');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <CareerMatchResults 
          matches={recommendations}
          onSelectCareer={handleSelectCareer}
        />
        
        {prediction && (
          <PlacementDashboard prediction={prediction} />
        )}
      </div>
    </div>
  );
}
```

#### **3. Create Roadmap Page**
```tsx
// src/app/roadmap/page.tsx
'use client';

import { useState, useEffect } from 'react';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [completedMilestones, setCompletedMilestones] = useState(new Set());

  useEffect(() => {
    const storedRoadmap = localStorage.getItem('selectedRoadmap');
    const storedProgress = localStorage.getItem('milestoneProgress');
    
    if (storedRoadmap) setRoadmap(JSON.parse(storedRoadmap));
    if (storedProgress) setCompletedMilestones(new Set(JSON.parse(storedProgress)));
  }, []);

  const handleMilestoneComplete = async (milestoneId: string) => {
    const newCompleted = new Set(completedMilestones);
    newCompleted.add(milestoneId);
    setCompletedMilestones(newCompleted);

    // Save to database
    await fetch('/api/user/progress', {
      method: 'POST',
      body: JSON.stringify({
        milestoneId,
        completedAt: new Date()
      })
    });

    // Save to localStorage
    localStorage.setItem('milestoneProgress', JSON.stringify([...newCompleted]));
  };

  if (!roadmap) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <RoadmapTimeline 
          roadmap={roadmap}
          onMilestoneComplete={handleMilestoneComplete}
          completedMilestones={completedMilestones}
        />
      </div>
    </div>
  );
}
```

---

## 🚀 Deployment Checklist

### **1. Environment Variables**

Create `.env.local`:
```bash
# ML Service URL
ML_SERVICE_URL=http://localhost:8000

# Database (if using)
DATABASE_URL=your_database_url

# NextAuth (if using)
NEXTAUTH_URL=http://localhost:4000
NEXTAUTH_SECRET=your_secret_key
```

### **2. Start ML Service**

```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### **3. Start Next.js**

```bash
npm install
npm run dev
# Runs on port 4000
```

### **4. Test the Flow**

1. ✅ Visit `http://localhost:4000/onboarding`
2. ✅ Complete all 7 wizard steps
3. ✅ Check ML service is responding: `http://localhost:8000/health`
4. ✅ View results page
5. ✅ Select a career and view roadmap
6. ✅ Track milestone progress

---

## 📊 Data Flow Diagram

```
User Input (Wizard)
       ↓
   [Profile Data: 32+ fields]
       ↓
   Next.js API Route
       ↓
   Python ML Service (Port 8000)
       ↓
   ┌─────────────────┬──────────────────┐
   ↓                 ↓                  ↓
Hybrid         Placement        Data
Recommender    Predictor        Loader
   ↓                 ↓                  ↓
   └─────────────────┴──────────────────┘
                     ↓
            [Combined Results]
                     ↓
            Next.js Frontend
                     ↓
         ┌───────────┴───────────┐
         ↓                       ↓
  Career Matches          Placement Prob
         ↓                       ↓
    Roadmap Gen            Insights
         ↓                       ↓
    [User Dashboard]
```

---

## 🎯 Quick Start Commands

```bash
# Terminal 1: ML Service
cd ml-service && uvicorn app.main:app --reload --port 8000

# Terminal 2: Next.js
npm run dev

# Terminal 3: Test ML Service
curl http://localhost:8000/health

# Terminal 4: Test Recommendations
curl -X POST http://localhost:8000/api/ml/recommendations \
  -H "Content-Type: application/json" \
  -d '{"educationLevel":"Undergraduate","skills":["Python","React"]}'
```

---

## 🐛 Troubleshooting

**ML Service not responding?**
- Check if Python service is running on port 8000
- Verify `ML_SERVICE_URL` in `.env.local`
- Check Python dependencies are installed

**No recommendations showing?**
- Check browser console for errors
- Verify API route is accessible
- Check if career database exists

**Roadmap not generating?**
- Ensure `roadmap-generator.ts` is imported correctly
- Check user profile has required fields
- Verify missing skills array is populated

---

## 📝 Summary

Your ML Career Engine is now **fully integrated** and ready to use! The system flows from:

1. **Wizard** → Collects data
2. **API Routes** → Process requests
3. **ML Service** → Generate recommendations
4. **Components** → Display results
5. **Roadmap** → Guide learning journey

All components work together seamlessly to provide a complete career guidance experience! 🚀
