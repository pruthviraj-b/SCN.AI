"""
FastAPI ML Service for Career Recommendations
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn

from .models.hybrid import HybridRecommender
from .models.placement import PlacementPredictor
from .utils.data_loader import load_careers_data

# Initialize FastAPI app
app = FastAPI(
    title="Career Recommendation ML Service",
    description="ML-powered career path recommendations and placement predictions",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML models
placement_predictor = PlacementPredictor()
careers_data = load_careers_data()

# ===== Request/Response Models =====

class UserProfile(BaseModel):
    # Basic Info
    educationLevel: str
    fieldOfStudy: str
    currentStatus: str
    experienceLevel: str
    
    # Skills & Interests
    skills: List[str]
    interests: List[str]
    startingFresh: bool = False
    
    # Goals
    primaryObjectives: List[str]
    preferredDomains: List[str]
    learningStyle: str
    timeCommitment: str
    
    # Professional Details
    yearsExperience: int = 0
    currentRole: Optional[str] = None
    targetIndustries: List[str] = []
    salaryExpectation: Optional[Dict[str, int]] = None
    geographicPreferences: List[str] = []
    remotePreference: Optional[str] = None
    willingToRelocate: bool = False
    
    # Career Timeline
    careerTimeline: Optional[str] = None
    riskTolerance: Optional[str] = None
    workLifeBalancePriority: int = 5
    
    # Personality
    workStyle: Optional[str] = None
    problemSolvingApproach: Optional[str] = None
    learningPace: Optional[str] = None
    leadershipAspirations: bool = False

class RecommendationResponse(BaseModel):
    success: bool
    recommendations: List[Dict]
    message: Optional[str] = None

class PlacementPredictionResponse(BaseModel):
    success: bool
    prediction: Dict
    message: Optional[str] = None

# ===== API Endpoints =====

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "Career Recommendation ML Service",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ml-recommendation",
        "models_loaded": True
    }

@app.post("/api/ml/recommendations", response_model=RecommendationResponse)
async def get_recommendations(profile: UserProfile):
    """
    Get top 5 career recommendations based on user profile.
    
    Uses hybrid recommendation system combining:
    - Content-based filtering (skills, education, interests)
    - Collaborative filtering (similar user patterns)
    """
    try:
        # Initialize recommender with current data
        recommender = HybridRecommender(careers_data)
        
        # Get recommendations
        recommendations = recommender.recommend(
            profile.dict(),
            top_n=5
        )
        
        return RecommendationResponse(
            success=True,
            recommendations=recommendations
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Recommendation generation failed: {str(e)}"
        )

@app.post("/api/ml/placement-probability", response_model=PlacementPredictionResponse)
async def predict_placement(profile: UserProfile):
    """
    Predict placement probability based on user profile.
    
    Returns:
    - Probability percentage (0-100)
    - Confidence level (low/medium/high)
    - Personalized insights
    - Improvement suggestions
    """
    try:
        prediction = placement_predictor.predict_probability(profile.dict())
        
        return PlacementPredictionResponse(
            success=True,
            prediction=prediction
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Placement prediction failed: {str(e)}"
        )

@app.post("/api/ml/analyze-profile")
async def analyze_profile(profile: UserProfile):
    """
    Comprehensive profile analysis combining recommendations and placement prediction.
    """
    try:
        # Get recommendations
        recommender = HybridRecommender(careers_data)
        recommendations = recommender.recommend(profile.dict(), top_n=5)
        
        # Get placement prediction
        placement = placement_predictor.predict_probability(profile.dict())
        
        return {
            "success": True,
            "recommendations": recommendations,
            "placement": placement,
            "profileStrength": calculate_profile_strength(profile.dict())
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Profile analysis failed: {str(e)}"
        )

# ===== Helper Functions =====

def calculate_profile_strength(profile: Dict) -> Dict:
    """Calculate overall profile strength score"""
    score = 0
    max_score = 100
    
    # Skills (30 points)
    if len(profile.get('skills', [])) >= 5:
        score += 30
    elif len(profile.get('skills', [])) >= 3:
        score += 20
    else:
        score += 10
    
    # Experience (25 points)
    years = profile.get('yearsExperience', 0)
    if years >= 3:
        score += 25
    elif years >= 1:
        score += 15
    else:
        score += 5
    
    # Education (20 points)
    edu_scores = {
        'PhD': 20,
        'Postgraduate': 18,
        'Undergraduate': 15,
        'Diploma': 12,
        'High School': 8
    }
    score += edu_scores.get(profile.get('educationLevel', ''), 10)
    
    # Clarity of goals (15 points)
    if profile.get('careerTimeline') and profile.get('targetIndustries'):
        score += 15
    elif profile.get('primaryObjectives'):
        score += 10
    else:
        score += 5
    
    # Completeness (10 points)
    if profile.get('workStyle') and profile.get('learningPace'):
        score += 10
    else:
        score += 5
    
    return {
        "score": min(score, max_score),
        "level": "Strong" if score >= 75 else "Good" if score >= 50 else "Developing",
        "breakdown": {
            "skills": len(profile.get('skills', [])),
            "experience": years,
            "education": profile.get('educationLevel', 'Unknown')
        }
    }

# ===== Run Server =====

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
