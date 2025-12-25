
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data.json');

const startups = [
    {
        title: "AI Legal Assistant for Freelancers",
        problem_statement: "Freelancers often struggle with complex contracts and legal jargon, leading to payment disputes and unfair terms.",
        solution_summary: "An AI-powered document reviewer that highlights risky clauses and suggests clearer terms in seconds.",
        target_users: "Freelancers, Consultants, Gig Workers",
        industry: "LegalTech",
        difficulty_level: "Intermediate",
        required_skills: ["NLP", "React", "Legal Knowledge"],
        market_size_estimate: "$15B Global Freelance Market",
        revenue_model: ["Subscription ($15/mo)", "Per-document fee"],
        validation_score: 85,
        risk_level: "Medium",
        execution_steps: ["Scrape legal templates", "Fine-tune LLM on contracts", "Build MVP web app"],
        status: "Validated"
    },
    {
        title: "Vertical SaaS for Plumbers",
        problem_statement: "Small plumbing businesses rely on pen-and-paper for scheduling, invoicing, and inventory, causing inefficiency.",
        solution_summary: "All-in-one mobile app for scheduling, dispatching, and invoicing specifically designed for plumbing workflows.",
        target_users: "Plumbing Contractors, HVAC Technicians",
        industry: "SaaS / Construction",
        difficulty_level: "Beginner",
        required_skills: ["Mobile Dev", "Stripe API", "Sales"],
        market_size_estimate: "$100B+ Home Services",
        revenue_model: ["Tiered Subscription ($50-$200/mo)"],
        validation_score: 92,
        risk_level: "Low",
        execution_steps: ["Interview 10 plumbers", "Build scheduling prototype", "Launch beta in local area"],
        status: "Idea"
    },
    {
        title: "Micro-Influencer Marketplace for Niche Brands",
        problem_statement: "Small brands can't afford big influencers, and micro-influencers struggle to monetize their dedicated following.",
        solution_summary: "A platform that automatically matches niche brands with micro-influencers (1k-10k followers) based on audience data.",
        target_users: "DTC Brands, Micro-Influencers",
        industry: "Marketing",
        difficulty_level: "Intermediate",
        required_skills: ["Marketplace Logic", "Social APIs", "Growth Hacking"],
        market_size_estimate: "$21B Influencer Market",
        revenue_model: ["Commission (20%)", "Listing Fee"],
        validation_score: 78,
        risk_level: "Medium",
        execution_steps: ["Build influencer database", "Create brand signup page", "Manual matching first"],
        status: "Idea"
    },
    {
        title: "Automated Employee Onboarding Platform",
        problem_statement: "Remote companies spend weeks coordinating logins, equipment shipping, and training for new hires.",
        solution_summary: "IT automation platform that provisions accounts, orders laptops, and assigns training modules with one click.",
        target_users: "Mid-sized Remote Companies",
        industry: "HR Tech",
        difficulty_level: "Advanced",
        required_skills: ["System Admin", "Integrations", "Security"],
        market_size_estimate: "$30B HR Software Market",
        revenue_model: ["Per-user licensing ($10/user/mo)"],
        validation_score: 88,
        risk_level: "Medium",
        execution_steps: ["Integrate with G-Suite/Slack", "Build dashboard", "Partner with device vendors"],
        status: "Building"
    },
    {
        title: "Personalized Vitamin Subscription",
        problem_statement: "People take generic vitamins that don't match their specific blood work or lifestyle needs.",
        solution_summary: "DTC brand offering monthly vitamin packs based on a quiz or imported blood test results.",
        target_users: "Health-conscious Millennials",
        industry: "Health & Wellness",
        difficulty_level: "Advanced",
        required_skills: ["Supply Chain", "E-commerce", "Health Regulations"],
        market_size_estimate: "$4B Personalized Nutrition",
        revenue_model: ["Monthly Subscription ($40-80/mo)"],
        validation_score: 75,
        risk_level: "High",
        execution_steps: ["Source supplements", "Build quiz algorithm", "Design packaging"],
        status: "Idea"
    },
    {
        title: "Local Event Discovery for Remote Workers",
        problem_statement: "Remote workers feel isolated and struggle to find social events happening during the week.",
        solution_summary: "Community app curating co-working pop-ups, happy hours, and networking events for digital nomads.",
        target_users: "Remote Workers, Digital Nomads",
        industry: "Social / Community",
        difficulty_level: "Beginner",
        required_skills: ["Mobile App", "Community Building"],
        market_size_estimate: "Growing Remote Workforce",
        revenue_model: ["Event ticket cut", "Premium membership"],
        validation_score: 65,
        risk_level: "Low",
        execution_steps: ["Launch Meetup group", "Build event scraper", "Release iOS app"],
        status: "Idea"
    },
    {
        title: "AI-Powered Tutoring for Dyslexic Students",
        problem_statement: "Traditional tutoring doesn't adapt to the specific learning patterns of students with dyslexia.",
        solution_summary: "Adaptive learning platform using speech-to-text and special fonts/colors to help dyslexic kids read and write.",
        target_users: "Parents of Dyslexic Children, Schools",
        industry: "EdTech",
        difficulty_level: "Advanced",
        required_skills: ["AI/ML", "Accessibility", "Education"],
        market_size_estimate: "$5B Special Ed Market",
        revenue_model: ["Freemium + Subscription"],
        validation_score: 95,
        risk_level: "Medium",
        execution_steps: ["Prototype reading tool", "Test with users", "Partner with schools"],
        status: "Building"
    },
    {
        title: "Sustainable Packaging Marketplace",
        problem_statement: "Small e-commerce shops want eco-friendly packaging but can't meet the high MOQs of large suppliers.",
        solution_summary: "B2B marketplace aggregating orders from small shops to unlock bulk rates for sustainable packaging.",
        target_users: "E-commerce Sellers",
        industry: "Logistics / GreenTech",
        difficulty_level: "Intermediate",
        required_skills: ["Logistics", "B2B Sales", "Web Platform"],
        market_size_estimate: "$300B Packaging Industry",
        revenue_model: ["Markup on goods"],
        validation_score: 80,
        risk_level: "Medium",
        execution_steps: ["Find suppliers", "Build Shopify App", "Launch MVP"],
        status: "Validated"
    },
    {
        title: "VR Training for Hazardous Jobs",
        problem_statement: "Training oil rig workers or firefighters is dangerous and expensive in real life.",
        solution_summary: "VR simulation software allowing employees to practice safety protocols in a realistic, risk-free environment.",
        target_users: "Energy Companies, Fire Departments",
        industry: "Enterprise / VR",
        difficulty_level: "Advanced",
        required_skills: ["Unity/Unreal", "3D Modeling", "Enterprise Sales"],
        market_size_estimate: "$10B Enterprise VR",
        revenue_model: ["Enterprise Contracts ($50k+)"],
        validation_score: 90,
        risk_level: "High",
        execution_steps: ["Build MVP scenario", "Demo to safety officers", "Pilot program"],
        status: "Idea"
    },
    {
        title: "No-Code API Builder",
        problem_statement: "Non-technical founders can build frontends (Webflow) but struggle to build custom backends/APIs.",
        solution_summary: "Visual interface to define database schemas and API endpoints that deploy instantly to serverless infrastructure.",
        target_users: "No-Code Makers, Founders",
        industry: "DevTools",
        difficulty_level: "Intermediate",
        required_skills: ["Cloud Architecture", "UI Design", "Backend Engineering"],
        market_size_estimate: "$20B No-Code Market",
        revenue_model: ["Usage-based ($20/mo start)"],
        validation_score: 85,
        risk_level: "Medium",
        execution_steps: ["Build visual editor", "Create code generator", "Launch on Product Hunt"],
        status: "Idea"
    }
];

function seed() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            console.error("data.json not found!");
            return;
        }

        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

        const newStartups = startups.map(s => ({
            id: Math.random().toString(36).substr(2, 9),
            ...s
        }));

        data.startupIdeas = newStartups;

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        console.log(`Successfully seeded ${newStartups.length} startup ideas.`);

    } catch (e) {
        console.error("Error seeding startups:", e);
    }
}

seed();
