# ML Career Recommendation Service

Python-based ML service for career path recommendations and placement probability prediction.

## Features

- **Hybrid Recommendation System**: Combines collaborative and content-based filtering
- **Placement Probability Prediction**: ML model to predict job placement success
- **RESTful API**: FastAPI endpoints for Next.js integration
- **Caching**: Redis for performance optimization

## Tech Stack

- **FastAPI**: Modern Python web framework
- **scikit-learn**: ML algorithms
- **pandas**: Data processing
- **numpy**: Numerical computations
- **Redis**: Caching layer

## Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

### POST /api/ml/recommendations
Get top career recommendations for a user profile.

**Request Body:**
```json
{
  "educationLevel": "Undergraduate",
  "fieldOfStudy": "Computer Science",
  "skills": ["Python", "React"],
  "interests": ["Coding", "Problem Solving"],
  "yearsExperience": 2,
  "targetIndustries": ["Technology & Software"],
  "careerTimeline": "1year",
  "riskTolerance": "medium",
  "workStyle": "collaborative"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "career": { "id": "1", "title": "Full Stack Developer", ... },
      "matchPercentage": 87.5,
      "breakdown": {
        "contentBased": 85.0,
        "collaborative": 90.0,
        "hybrid": 87.5
      },
      "requiredSkills": ["React", "Node.js", "SQL"],
      "missingSkills": ["Node.js", "SQL"],
      "timeline": "8-12 months",
      "placementProbability": 78.3
    }
  ]
}
```

### POST /api/ml/placement-probability
Predict placement probability for a user profile.

**Response:**
```json
{
  "success": true,
  "prediction": {
    "probability": 78.3,
    "confidence": "high",
    "insights": [
      "Strong skill portfolio increases your marketability",
      "Hands-on project experience is a major plus"
    ],
    "improvementAreas": [
      {
        "area": "Portfolio",
        "suggestion": "Create a portfolio showcasing your projects",
        "impact": "+10% placement probability"
      }
    ]
  }
}
```

## Integration with Next.js

Add to your `.env.local`:
```
ML_SERVICE_URL=http://localhost:8000
```

Call from Next.js API routes:
```typescript
const response = await fetch(`${process.env.ML_SERVICE_URL}/api/ml/recommendations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userProfile)
});
```
