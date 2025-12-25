export type StartupIdea = {
    id: string;
    title: string;
    category: string;
    description: string;
    marketPotential: 'High' | 'Medium' | 'Low';
    requiredSkills: string[];
    estimatedCost: string;
};

export const startupIdeas: StartupIdea[] = [
    {
        id: '1',
        title: 'AI-Powered Resume Builder',
        category: 'HR Tech',
        description: 'Create an AI tool that automatically generates optimized resumes based on job descriptions and user experience.',
        marketPotential: 'High',
        requiredSkills: ['AI/ML', 'NLP', 'Web Development', 'UI/UX'],
        estimatedCost: '₹20k-₹50k'
    },
    {
        id: '2',
        title: 'Micro-Learning Mobile App',
        category: 'EdTech',
        description: 'Build a platform delivering 5-minute skill-based lessons for busy professionals.',
        marketPotential: 'High',
        requiredSkills: ['Mobile Development', 'Content Creation', 'Backend', 'Analytics'],
        estimatedCost: '₹30k-₹70k'
    },
    {
        id: '3',
        title: 'Local Service Marketplace',
        category: 'Marketplace',
        description: 'Connect local service providers (plumbers, electricians, etc.) with customers in real-time.',
        marketPotential: 'High',
        requiredSkills: ['Full Stack', 'Payment Integration', 'Geolocation', 'Mobile'],
        estimatedCost: '₹40k-₹100k'
    },
    {
        id: '4',
        title: 'Mental Health Chatbot',
        category: 'HealthTech',
        description: 'AI chatbot providing 24/7 mental health support and connecting users with therapists.',
        marketPotential: 'High',
        requiredSkills: ['AI/ML', 'NLP', 'Healthcare Compliance', 'Security'],
        estimatedCost: '₹50k-₹120k'
    },
    {
        id: '5',
        title: 'Sustainable Fashion Platform',
        category: 'E-commerce',
        description: 'Marketplace for eco-friendly and sustainable clothing brands.',
        marketPotential: 'Medium',
        requiredSkills: ['E-commerce', 'Web Development', 'Marketing', 'Supply Chain'],
        estimatedCost: '₹25k-₹60k'
    },
    {
        id: '6',
        title: 'Remote Team Collaboration Tool',
        category: 'SaaS',
        description: 'All-in-one platform for remote teams with video, chat, project management, and time tracking.',
        marketPotential: 'High',
        requiredSkills: ['Full Stack', 'WebRTC', 'Real-time Systems', 'Cloud'],
        estimatedCost: '₹60k-₹150k'
    },
    {
        id: '7',
        title: 'Smart Home Energy Optimizer',
        category: 'IoT',
        description: 'IoT system that optimizes home energy consumption and reduces electricity bills.',
        marketPotential: 'Medium',
        requiredSkills: ['IoT', 'Hardware', 'Mobile App', 'Data Analytics'],
        estimatedCost: '₹40k-₹90k'
    },
    {
        id: '8',
        title: 'Freelancer Financial Management',
        category: 'FinTech',
        description: 'Financial planning and tax management tool specifically for freelancers and gig workers.',
        marketPotential: 'High',
        requiredSkills: ['FinTech', 'Accounting', 'Web Development', 'Security'],
        estimatedCost: '₹35k-₹80k'
    },
    {
        id: '9',
        title: 'Pet Care Subscription Box',
        category: 'E-commerce',
        description: 'Monthly subscription service delivering personalized pet products based on pet profiles.',
        marketPotential: 'Medium',
        requiredSkills: ['E-commerce', 'Subscription Management', 'Logistics', 'Marketing'],
        estimatedCost: '₹20k-₹50k'
    },
    {
        id: '10',
        title: 'Code Review Automation Platform',
        category: 'DevTools',
        description: 'AI-powered tool that automatically reviews code for bugs, security issues, and best practices.',
        marketPotential: 'High',
        requiredSkills: ['AI/ML', 'Static Analysis', 'DevOps', 'Security'],
        estimatedCost: '₹50k-₹120k'
    },
    {
        id: '11',
        title: 'Virtual Event Platform',
        category: 'SaaS',
        description: 'Platform for hosting virtual conferences, workshops, and networking events.',
        marketPotential: 'High',
        requiredSkills: ['WebRTC', 'Streaming', 'Full Stack', 'Scalability'],
        estimatedCost: '₹70k-₹160k'
    },
    {
        id: '12',
        title: 'Meal Planning AI Assistant',
        category: 'FoodTech',
        description: 'AI that creates personalized meal plans based on dietary restrictions, budget, and preferences.',
        marketPotential: 'Medium',
        requiredSkills: ['AI/ML', 'Nutrition', 'Mobile App', 'Recipe APIs'],
        estimatedCost: '₹30k-₹70k'
    },
    {
        id: '13',
        title: 'Blockchain Supply Chain Tracker',
        category: 'Blockchain',
        description: 'Transparent supply chain tracking system using blockchain for product authenticity.',
        marketPotential: 'High',
        requiredSkills: ['Blockchain', 'Smart Contracts', 'IoT', 'Web Development'],
        estimatedCost: '₹80k-₹180k'
    },
    {
        id: '14',
        title: 'Language Learning Gamification',
        category: 'EdTech',
        description: 'Gamified language learning app with AR features and native speaker matching.',
        marketPotential: 'High',
        requiredSkills: ['Mobile Development', 'AR', 'Gamification', 'AI/ML'],
        estimatedCost: '₹60k-₹140k'
    },
    {
        id: '15',
        title: 'Carbon Footprint Tracker',
        category: 'GreenTech',
        description: 'App that tracks personal carbon footprint and suggests eco-friendly alternatives.',
        marketPotential: 'Medium',
        requiredSkills: ['Mobile Development', 'Data Analytics', 'APIs', 'Sustainability'],
        estimatedCost: '₹25k-₹60k'
    }
];

export const startupCategories = ['All', 'SaaS', 'EdTech', 'HealthTech', 'FinTech', 'E-commerce', 'IoT', 'Blockchain', 'GreenTech'];
