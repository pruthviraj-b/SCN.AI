"""
Placement Probability Prediction Model
Predicts job placement success probability based on user profile
"""

import numpy as np
from typing import Dict, List
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

class PlacementPredictor:
    """
    Predicts placement probability using profile features.
    
    Features considered:
    - Education level
    - Skills count and proficiency
    - Years of experience
    - Certifications
    - Projects completed
    - Portfolio presence
    - Learning commitment
    """
    
    def __init__(self):
        self.model = None  # In production, load pre-trained model
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def extract_features(self, profile: Dict) -> np.ndarray:
        """
        Extract numerical features from user profile.
        
        Returns feature vector for ML model.
        """
        features = []
        
        # 1. Education Score (0-5)
        edu_scores = {
            'High School': 1,
            'Diploma': 2,
            'Undergraduate': 3,
            'Postgraduate': 4,
            'PhD': 5,
            'Self-Taught / Bootcamp': 2.5
        }
        features.append(edu_scores.get(profile.get('educationLevel', ''), 2))
        
        # 2. Skills Count (0-20+)
        skills_count = len(profile.get('skills', []))
        features.append(min(skills_count, 20))
        
        # 3. Average Skill Proficiency (0-5)
        skill_prof = profile.get('skillProficiency', [])
        if skill_prof:
            avg_prof = np.mean([sp.get('level', 3) for sp in skill_prof])
        else:
            avg_prof = 3  # Default moderate proficiency
        features.append(avg_prof)
        
        # 4. Years of Experience (0-20+)
        years_exp = min(profile.get('yearsExperience', 0), 20)
        features.append(years_exp)
        
        # 5. Certifications Count (0-10+)
        cert_count = len(profile.get('certifications', []))
        features.append(min(cert_count, 10))
        
        # 6. Projects Completed (0-20+)
        projects = min(profile.get('projectsCompleted', 0), 20)
        features.append(projects)
        
        # 7. Portfolio Presence (0 or 1)
        has_portfolio = 1 if profile.get('portfolioUrl') else 0
        features.append(has_portfolio)
        
        # 8. Time Commitment Score (1-4)
        time_scores = {
            'Less than 5 hours': 1,
            '5–10 hours': 2,
            '10–20 hours': 3,
            'Full-time learning': 4
        }
        features.append(time_scores.get(profile.get('timeCommitment', ''), 2))
        
        # 9. Career Timeline Urgency (1-4)
        timeline_scores = {
            '6months': 4,
            '1year': 3,
            '2years': 2,
            '5years': 1
        }
        features.append(timeline_scores.get(profile.get('careerTimeline', ''), 2))
        
        # 10. Leadership Aspirations (0 or 1)
        features.append(1 if profile.get('leadershipAspirations') else 0)
        
        return np.array(features).reshape(1, -1)
    
    def calculate_base_probability(self, profile: Dict) -> float:
        """
        Calculate base probability using heuristics.
        
        This is used when ML model is not trained.
        """
        score = 0.0
        max_score = 100.0
        
        # Education (20 points)
        edu_scores = {
            'PhD': 20,
            'Postgraduate': 18,
            'Undergraduate': 15,
            'Diploma': 12,
            'High School': 8,
            'Self-Taught / Bootcamp': 14
        }
        score += edu_scores.get(profile.get('educationLevel', ''), 10)
        
        # Skills (25 points)
        skills_count = len(profile.get('skills', []))
        if skills_count >= 7:
            score += 25
        elif skills_count >= 5:
            score += 20
        elif skills_count >= 3:
            score += 15
        else:
            score += 10
        
        # Experience (20 points)
        years = profile.get('yearsExperience', 0)
        if years >= 5:
            score += 20
        elif years >= 3:
            score += 16
        elif years >= 1:
            score += 12
        else:
            score += 6
        
        # Projects & Portfolio (15 points)
        projects = profile.get('projectsCompleted', 0)
        if projects >= 5:
            score += 10
        elif projects >= 3:
            score += 7
        elif projects >= 1:
            score += 4
        
        if profile.get('portfolioUrl'):
            score += 5
        
        # Certifications (10 points)
        certs = len(profile.get('certifications', []))
        score += min(certs * 3, 10)
        
        # Time Commitment (10 points)
        time_commitment = profile.get('timeCommitment', '')
        if 'Full-time' in time_commitment:
            score += 10
        elif '10–20' in time_commitment:
            score += 7
        elif '5–10' in time_commitment:
            score += 5
        else:
            score += 3
        
        # Normalize to 0-1
        probability = score / max_score
        
        # Add some variance based on profile completeness
        completeness_bonus = self.calculate_completeness_bonus(profile)
        probability = min(probability + completeness_bonus, 0.95)
        
        return probability
    
    def calculate_completeness_bonus(self, profile: Dict) -> float:
        """Calculate bonus for profile completeness"""
        bonus = 0.0
        
        if profile.get('workStyle'):
            bonus += 0.02
        if profile.get('problemSolvingApproach'):
            bonus += 0.02
        if profile.get('targetIndustries'):
            bonus += 0.02
        if profile.get('careerTimeline'):
            bonus += 0.02
        
        return bonus
    
    def generate_insights(self, profile: Dict, probability: float) -> List[str]:
        """Generate personalized insights based on profile"""
        insights = []
        
        # Skills-based insights
        skills_count = len(profile.get('skills', []))
        if skills_count >= 5:
            insights.append("✓ Strong skill portfolio increases your marketability")
        elif skills_count >= 3:
            insights.append("→ Good skill foundation, consider adding 2-3 more in-demand skills")
        else:
            insights.append("⚠ Limited skills may reduce opportunities")
        
        # Experience insights
        years = profile.get('yearsExperience', 0)
        if years >= 3:
            insights.append("✓ Solid work experience is a major advantage")
        elif years >= 1:
            insights.append("→ Building experience, focus on quality projects")
        else:
            insights.append("→ Hands-on projects can compensate for limited experience")
        
        # Portfolio insights
        if profile.get('portfolioUrl'):
            insights.append("✓ Portfolio showcases your work effectively")
        else:
            insights.append("⚠ Missing portfolio - this is crucial for standing out")
        
        # Certifications
        if profile.get('certifications'):
            insights.append("✓ Certifications validate your expertise")
        
        # Projects
        projects = profile.get('projectsCompleted', 0)
        if projects >= 3:
            insights.append("✓ Multiple projects demonstrate practical skills")
        
        return insights[:5]  # Return top 5 insights
    
    def suggest_improvements(self, profile: Dict, probability: float) -> List[Dict]:
        """Suggest specific improvements to increase placement probability"""
        improvements = []
        
        # Skills improvement
        skills_count = len(profile.get('skills', []))
        if skills_count < 5:
            improvements.append({
                'area': 'Skills',
                'current': f'{skills_count} skills',
                'target': '5-7 skills',
                'suggestion': 'Learn 2-3 more in-demand skills in your target domain',
                'impact': '+12-15% placement probability',
                'priority': 'High'
            })
        
        # Portfolio
        if not profile.get('portfolioUrl'):
            improvements.append({
                'area': 'Portfolio',
                'current': 'No portfolio',
                'target': 'Professional portfolio',
                'suggestion': 'Create a portfolio website showcasing 3-5 best projects',
                'impact': '+10-12% placement probability',
                'priority': 'Critical'
            })
        
        # Projects
        projects = profile.get('projectsCompleted', 0)
        if projects < 3:
            improvements.append({
                'area': 'Projects',
                'current': f'{projects} projects',
                'target': '3-5 projects',
                'suggestion': 'Complete 2-3 real-world projects with modern tech stack',
                'impact': '+8-10% placement probability',
                'priority': 'High'
            })
        
        # Certifications
        if not profile.get('certifications'):
            improvements.append({
                'area': 'Certifications',
                'current': 'No certifications',
                'target': '1-2 relevant certifications',
                'suggestion': 'Get certified in your primary skill (e.g., AWS, Azure, Google Cloud)',
                'impact': '+5-7% placement probability',
                'priority': 'Medium'
            })
        
        # Experience
        years = profile.get('yearsExperience', 0)
        if years == 0:
            improvements.append({
                'area': 'Experience',
                'current': 'No professional experience',
                'target': 'Internship or freelance work',
                'suggestion': 'Gain 6-12 months of internship or freelance experience',
                'impact': '+15-20% placement probability',
                'priority': 'High'
            })
        
        # Sort by priority
        priority_order = {'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3}
        improvements.sort(key=lambda x: priority_order.get(x['priority'], 4))
        
        return improvements[:4]  # Return top 4 improvements
    
    def get_confidence_level(self, probability: float) -> str:
        """Determine confidence level of prediction"""
        if probability >= 0.75:
            return "high"
        elif probability >= 0.50:
            return "medium"
        else:
            return "low"
    
    def predict_probability(self, profile: Dict) -> Dict:
        """
        Main prediction function.
        
        Returns:
        - Probability percentage (0-100)
        - Confidence level
        - Personalized insights
        - Improvement suggestions
        """
        # Calculate probability
        if self.is_trained and self.model:
            # Use trained ML model
            features = self.extract_features(profile)
            probability = self.model.predict_proba(features)[0][1]
        else:
            # Use heuristic-based calculation
            probability = self.calculate_base_probability(profile)
        
        # Generate insights and suggestions
        insights = self.generate_insights(profile, probability)
        improvements = self.suggest_improvements(profile, probability)
        
        return {
            'probability': round(probability * 100, 1),
            'confidence': self.get_confidence_level(probability),
            'insights': insights,
            'improvementAreas': improvements,
            'profileStrength': {
                'skills': len(profile.get('skills', [])),
                'experience': profile.get('yearsExperience', 0),
                'projects': profile.get('projectsCompleted', 0),
                'certifications': len(profile.get('certifications', []))
            }
        }

# Example usage
if __name__ == "__main__":
    test_profile = {
        'educationLevel': 'Undergraduate',
        'skills': ['Python', 'React', 'SQL'],
        'yearsExperience': 1,
        'projectsCompleted': 2,
        'portfolioUrl': None,
        'certifications': [],
        'timeCommitment': '10–20 hours',
        'careerTimeline': '1year'
    }
    
    predictor = PlacementPredictor()
    result = predictor.predict_probability(test_profile)
    
    print("Placement Prediction:")
    print(f"Probability: {result['probability']}%")
    print(f"Confidence: {result['confidence']}")
    print(f"\nInsights:")
    for insight in result['insights']:
        print(f"  {insight}")
    print(f"\nImprovements:")
    for imp in result['improvementAreas']:
        print(f"  [{imp['priority']}] {imp['area']}: {imp['suggestion']} ({imp['impact']})")
