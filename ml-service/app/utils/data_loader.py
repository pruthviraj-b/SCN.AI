"""
Data Loading Utilities
Loads career data from Next.js data files
"""

import json
import os
from typing import List, Dict

def load_careers_data() -> List[Dict]:
    """
    Load careers data from Next.js data directory.
    
    Returns list of career objects with enhanced fields for ML.
    """
    # Path to Next.js data directory
    data_dir = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'data')
    careers_file = os.path.join(data_dir, 'careers.json')
    
    try:
        with open(careers_file, 'r', encoding='utf-8') as f:
            careers_raw = json.load(f)
        
        # Enhance careers with ML-specific fields
        careers_enhanced = []
        for career in careers_raw:
            enhanced = enhance_career_data(career)
            careers_enhanced.append(enhanced)
        
        return careers_enhanced
    
    except FileNotFoundError:
        print(f"Warning: Careers file not found at {careers_file}")
        print("Using fallback mock data...")
        return get_mock_careers_data()
    
    except Exception as e:
        print(f"Error loading careers data: {e}")
        return get_mock_careers_data()

def enhance_career_data(career: Dict) -> Dict:
    """
    Enhance career object with additional ML-relevant fields.
    """
    enhanced = career.copy()
    
    # Add experience range if not present
    if 'experienceRange' not in enhanced:
        enhanced['experienceRange'] = infer_experience_range(career)
    
    # Add suitable work styles
    if 'suitableWorkStyles' not in enhanced:
        enhanced['suitableWorkStyles'] = infer_work_styles(career)
    
    # Add industries if not present
    if 'industries' not in enhanced:
        enhanced['industries'] = infer_industries(career)
    
    # Add salary range if not present
    if 'salaryRange' not in enhanced:
        enhanced['salaryRange'] = infer_salary_range(career)
    
    # Add top companies if not present
    if 'topCompanies' not in enhanced:
        enhanced['topCompanies'] = get_default_companies(career)
    
    return enhanced

def infer_experience_range(career: Dict) -> Dict:
    """Infer experience range based on career title and category"""
    title = career.get('title', '').lower()
    
    # Entry-level positions
    if any(word in title for word in ['junior', 'entry', 'intern', 'trainee', 'associate']):
        return {'min': 0, 'max': 2}
    
    # Senior positions
    elif any(word in title for word in ['senior', 'lead', 'principal', 'architect', 'director']):
        return {'min': 5, 'max': 15}
    
    # Manager positions
    elif any(word in title for word in ['manager', 'head', 'chief']):
        return {'min': 7, 'max': 20}
    
    # Mid-level (default)
    else:
        return {'min': 2, 'max': 5}

def infer_work_styles(career: Dict) -> List[str]:
    """Infer suitable work styles based on career characteristics"""
    title = career.get('title', '').lower()
    category = career.get('category', '').lower()
    
    styles = []
    
    # Leadership roles
    if any(word in title for word in ['manager', 'lead', 'director', 'head', 'chief']):
        styles.append('leadership')
    
    # Collaborative roles
    if any(word in title for word in ['developer', 'engineer', 'designer', 'analyst']):
        styles.append('collaborative')
    
    # Independent roles
    if any(word in title for word in ['researcher', 'writer', 'consultant', 'specialist']):
        styles.append('independent')
    
    # Default to collaborative if nothing matched
    if not styles:
        styles = ['collaborative', 'independent']
    
    return styles

def infer_industries(career: Dict) -> List[str]:
    """Infer relevant industries based on career category"""
    category = career.get('category', '').lower()
    title = career.get('title', '').lower()
    
    industry_map = {
        'software': ['Technology & Software', 'E-commerce & Retail'],
        'data': ['Technology & Software', 'Finance & Banking', 'Healthcare & Biotech'],
        'ai': ['Technology & Software', 'Healthcare & Biotech'],
        'design': ['Technology & Software', 'Media & Entertainment'],
        'business': ['Finance & Banking', 'Consulting'],
        'marketing': ['E-commerce & Retail', 'Media & Entertainment'],
        'finance': ['Finance & Banking'],
        'healthcare': ['Healthcare & Biotech']
    }
    
    industries = []
    for key, values in industry_map.items():
        if key in category or key in title:
            industries.extend(values)
    
    # Remove duplicates and return
    return list(set(industries)) if industries else ['Technology & Software']

def infer_salary_range(career: Dict) -> Dict:
    """Infer salary range based on career level and category"""
    title = career.get('title', '').lower()
    category = career.get('category', '').lower()
    
    # Base ranges by level
    if any(word in title for word in ['junior', 'entry', 'intern']):
        base_min, base_max = 40000, 70000
    elif any(word in title for word in ['senior', 'lead', 'principal']):
        base_min, base_max = 100000, 180000
    elif any(word in title for word in ['manager', 'director', 'head']):
        base_min, base_max = 120000, 250000
    else:
        base_min, base_max = 60000, 120000
    
    # Adjust for high-demand categories
    if any(word in category for word in ['ai', 'machine learning', 'data science']):
        base_min = int(base_min * 1.2)
        base_max = int(base_max * 1.3)
    
    return {'min': base_min, 'max': base_max, 'currency': 'USD'}

def get_default_companies(career: Dict) -> List[str]:
    """Get default top companies for a career"""
    category = career.get('category', '').lower()
    
    tech_companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Uber']
    finance_companies = ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock']
    consulting_companies = ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture']
    
    if 'software' in category or 'ai' in category or 'data' in category:
        return tech_companies[:8]
    elif 'finance' in category or 'business' in category:
        return finance_companies + tech_companies[:4]
    elif 'consulting' in category:
        return consulting_companies + tech_companies[:3]
    else:
        return tech_companies[:8]

def get_mock_careers_data() -> List[Dict]:
    """
    Fallback mock data for testing when real data is unavailable.
    """
    return [
        {
            'id': '1',
            'title': 'Full Stack Developer',
            'category': 'Software Development',
            'description': 'Build end-to-end web applications',
            'requiredEducation': {
                'level': 'Undergraduate',
                'fields': ['Computer Science', 'Engineering']
            },
            'requiredSkills': ['React', 'Node.js', 'SQL', 'Git', 'REST APIs'],
            'relatedInterests': ['Coding', 'Building Things', 'Problem Solving'],
            'industries': ['Technology & Software', 'E-commerce & Retail'],
            'experienceRange': {'min': 0, 'max': 3},
            'suitableWorkStyles': ['collaborative', 'independent'],
            'salaryRange': {'min': 60000, 'max': 120000, 'currency': 'USD'},
            'topCompanies': ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Shopify', 'Stripe', 'Airbnb'],
            'demand': 'High',
            'growthRate': 'Fast'
        },
        {
            'id': '2',
            'title': 'Data Scientist',
            'category': 'Data Science & AI',
            'description': 'Extract insights from data using ML',
            'requiredEducation': {
                'level': 'Postgraduate',
                'fields': ['Computer Science', 'Statistics', 'Mathematics']
            },
            'requiredSkills': ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
            'relatedInterests': ['Data Analysis', 'Math & Statistics', 'Research'],
            'industries': ['Technology & Software', 'Finance & Banking', 'Healthcare & Biotech'],
            'experienceRange': {'min': 1, 'max': 5},
            'suitableWorkStyles': ['independent', 'collaborative'],
            'salaryRange': {'min': 80000, 'max': 150000, 'currency': 'USD'},
            'topCompanies': ['Google', 'Meta', 'Amazon', 'Netflix', 'Uber', 'Airbnb', 'Microsoft', 'Apple'],
            'demand': 'Very High',
            'growthRate': 'Very Fast'
        },
        {
            'id': '3',
            'title': 'UX Designer',
            'category': 'Design',
            'description': 'Design user-centered digital experiences',
            'requiredEducation': {
                'level': 'Undergraduate',
                'fields': ['Design', 'Arts & Humanities', 'Computer Science']
            },
            'requiredSkills': ['Figma', 'User Research', 'Prototyping', 'UI Design', 'Wireframing'],
            'relatedInterests': ['Design & Art', 'User Empathy', 'Creativity'],
            'industries': ['Technology & Software', 'Media & Entertainment'],
            'experienceRange': {'min': 0, 'max': 4},
            'suitableWorkStyles': ['collaborative', 'independent'],
            'salaryRange': {'min': 55000, 'max': 110000, 'currency': 'USD'},
            'topCompanies': ['Apple', 'Google', 'Meta', 'Adobe', 'Airbnb', 'Uber', 'Netflix', 'Microsoft'],
            'demand': 'High',
            'growthRate': 'Fast'
        }
    ]

# Example usage
if __name__ == "__main__":
    careers = load_careers_data()
    print(f"Loaded {len(careers)} careers")
    if careers:
        print(f"\nFirst career: {careers[0]['title']}")
        print(f"Industries: {careers[0]['industries']}")
        print(f"Salary Range: ${careers[0]['salaryRange']['min']:,} - ${careers[0]['salaryRange']['max']:,}")
