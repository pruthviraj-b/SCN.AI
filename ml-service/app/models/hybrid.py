"""
Hybrid Recommendation System
Combines collaborative filtering and content-based filtering
"""

import numpy as np
from typing import List, Dict, Tuple
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

class HybridRecommender:
    """
    Hybrid recommendation system for career paths.
    
    Combines:
    1. Content-based filtering (skills, education, interests match)
    2. Collaborative filtering (similar user patterns)
    """
    
    def __init__(self, careers_data: List[Dict]):
        self.careers_data = careers_data
        self.scaler = StandardScaler()
        
        # Weights for hybrid scoring
        self.CONTENT_WEIGHT = 0.7
        self.COLLAB_WEIGHT = 0.3
    
    def content_based_score(self, user_profile: Dict, career: Dict) -> float:
        """
        Calculate content-based similarity score.
        
        Factors:
        - Education match (25%)
        - Field of study match (20%)
        - Skills overlap (30%)
        - Interests alignment (25%)
        """
        score = 0.0
        
        # 1. Education Match (25%)
        user_edu = user_profile.get('educationLevel', '').lower()
        req_edu = career.get('requiredEducation', {}).get('level', '').lower()
        
        edu_hierarchy = {
            'high school': 1,
            'diploma': 2,
            'undergraduate': 3,
            'postgraduate': 4,
            'phd': 5
        }
        
        user_edu_level = edu_hierarchy.get(user_edu, 0)
        req_edu_level = edu_hierarchy.get(req_edu, 0)
        
        if user_edu_level >= req_edu_level:
            score += 0.25
        elif user_edu_level == req_edu_level - 1:
            score += 0.15  # Close enough
        
        # 2. Field Match (20%)
        user_field = user_profile.get('fieldOfStudy', '').lower()
        req_fields = [f.lower() for f in career.get('requiredEducation', {}).get('fields', [])]
        
        if any(user_field in f or f in user_field for f in req_fields):
            score += 0.20
        
        # 3. Skills Match (30%)
        user_skills = set(s.lower() for s in user_profile.get('skills', []))
        req_skills = set(s.lower() for s in career.get('requiredSkills', []))
        
        if req_skills:
            skill_overlap = len(user_skills & req_skills) / len(req_skills)
            score += 0.30 * skill_overlap
        
        # 4. Interests Match (25%)
        user_interests = set(i.lower() for i in user_profile.get('interests', []))
        career_interests = set(i.lower() for i in career.get('relatedInterests', []))
        
        if career_interests:
            interest_overlap = len(user_interests & career_interests) / len(career_interests)
            score += 0.25 * interest_overlap
        
        return score
    
    def collaborative_score(self, user_profile: Dict, career: Dict) -> float:
        """
        Calculate collaborative filtering score.
        
        In a production system, this would use:
        - User-item interaction matrix
        - Similar users' career choices
        - Success rates of similar profiles
        
        For now, using simplified heuristics based on:
        - Career popularity in target industries
        - Experience level alignment
        - Work style compatibility
        """
        score = 0.0
        
        # Industry alignment (40%)
        user_industries = set(user_profile.get('targetIndustries', []))
        career_industries = set(career.get('industries', []))
        
        if user_industries and career_industries:
            industry_match = len(user_industries & career_industries) / len(user_industries)
            score += 0.40 * industry_match
        
        # Experience level alignment (30%)
        user_exp = user_profile.get('yearsExperience', 0)
        career_exp_range = career.get('experienceRange', {})
        min_exp = career_exp_range.get('min', 0)
        max_exp = career_exp_range.get('max', 50)
        
        if min_exp <= user_exp <= max_exp:
            score += 0.30
        elif user_exp < min_exp:
            # Penalize if under-experienced
            gap = min_exp - user_exp
            score += max(0, 0.30 - (gap * 0.05))
        
        # Work style compatibility (30%)
        user_work_style = user_profile.get('workStyle', '')
        career_work_styles = career.get('suitableWorkStyles', [])
        
        if user_work_style in career_work_styles:
            score += 0.30
        elif career_work_styles:  # Partial match
            score += 0.15
        
        return score
    
    def calculate_timeline(self, user_profile: Dict, career: Dict, missing_skills: List[str]) -> str:
        """
        Calculate estimated timeline to career readiness.
        """
        base_months = 6
        
        # Add time for missing skills
        base_months += len(missing_skills) * 2
        
        # Adjust for experience level
        if user_profile.get('experienceLevel') == 'beginner':
            base_months += 3
        elif user_profile.get('experienceLevel') == 'advanced':
            base_months -= 2
        
        # Adjust for time commitment
        time_commitment = user_profile.get('timeCommitment', '')
        if 'Full-time' in time_commitment:
            base_months = int(base_months * 0.7)
        elif 'Less than 5' in time_commitment:
            base_months = int(base_months * 1.5)
        
        # Adjust for learning pace
        learning_pace = user_profile.get('learningPace', '')
        if learning_pace == 'fast':
            base_months = int(base_months * 0.8)
        elif learning_pace == 'thorough':
            base_months = int(base_months * 1.2)
        
        base_months = max(3, min(base_months, 24))  # Clamp between 3-24 months
        
        if base_months <= 6:
            return f"{base_months} months"
        else:
            years = base_months / 12
            return f"{years:.1f} years ({base_months} months)"
    
    def recommend(self, user_profile: Dict, top_n: int = 5) -> List[Dict]:
        """
        Generate hybrid recommendations.
        
        Returns list of career recommendations with:
        - Career details
        - Match percentage
        - Score breakdown
        - Required/missing skills
        - Timeline estimate
        """
        recommendations = []
        
        for career in self.careers_data:
            # Calculate scores
            content_score = self.content_based_score(user_profile, career)
            collab_score = self.collaborative_score(user_profile, career)
            
            # Hybrid score (weighted combination)
            hybrid_score = (
                self.CONTENT_WEIGHT * content_score +
                self.COLLAB_WEIGHT * collab_score
            )
            
            # Calculate missing skills
            user_skills = set(s.lower() for s in user_profile.get('skills', []))
            req_skills = set(s.lower() for s in career.get('requiredSkills', []))
            missing_skills = list(req_skills - user_skills)
            
            # Calculate timeline
            timeline = self.calculate_timeline(user_profile, career, missing_skills)
            
            # Build recommendation object
            recommendation = {
                'career': career,
                'matchPercentage': round(hybrid_score * 100, 2),
                'breakdown': {
                    'contentBased': round(content_score * 100, 2),
                    'collaborative': round(collab_score * 100, 2),
                    'hybrid': round(hybrid_score * 100, 2)
                },
                'requiredSkills': career.get('requiredSkills', []),
                'missingSkills': missing_skills,
                'timeline': timeline,
                'salaryRange': career.get('salaryRange', {'min': 0, 'max': 0}),
                'targetCompanies': career.get('topCompanies', [])[:8],
                'growthPotential': career.get('growthRate', 'Moderate'),
                'demandLevel': career.get('demand', 'Medium')
            }
            
            recommendations.append((hybrid_score, recommendation))
        
        # Sort by score and return top N
        recommendations.sort(key=lambda x: x[0], reverse=True)
        
        return [rec[1] for rec in recommendations[:top_n]]

# Example usage
if __name__ == "__main__":
    # Test data
    test_profile = {
        'educationLevel': 'Undergraduate',
        'fieldOfStudy': 'Computer Science',
        'skills': ['Python', 'React', 'SQL'],
        'interests': ['Coding', 'Problem Solving'],
        'yearsExperience': 1,
        'targetIndustries': ['Technology & Software'],
        'workStyle': 'collaborative',
        'learningPace': 'fast'
    }
    
    test_careers = [
        {
            'id': '1',
            'title': 'Full Stack Developer',
            'requiredEducation': {'level': 'Undergraduate', 'fields': ['Computer Science']},
            'requiredSkills': ['React', 'Node.js', 'SQL', 'Git'],
            'relatedInterests': ['Coding', 'Building Things'],
            'industries': ['Technology & Software'],
            'experienceRange': {'min': 0, 'max': 3},
            'suitableWorkStyles': ['collaborative', 'independent'],
            'salaryRange': {'min': 60000, 'max': 120000},
            'topCompanies': ['Google', 'Microsoft', 'Amazon'],
            'demand': 'High',
            'growthRate': 'Fast'
        }
    ]
    
    recommender = HybridRecommender(test_careers)
    results = recommender.recommend(test_profile, top_n=1)
    
    print("Test Recommendation:")
    print(f"Career: {results[0]['career']['title']}")
    print(f"Match: {results[0]['matchPercentage']}%")
    print(f"Timeline: {results[0]['timeline']}")
