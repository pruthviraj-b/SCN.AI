
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data.json');

const careers = [
    {
        title: "AI Engineer",
        category: "Artificial Intelligence",
        description: "Build and deploy intelligent systems using machine learning and deep learning technologies. You will design models that can learn from data and make decisions.",
        difficulty_level: "Advanced",
        required_skills: ["Python", "TensorFlow", "PyTorch", "Linear Algebra", "NLP"],
        tools: ["Jupyter", "AWS SageMaker", "Docker", "HuggingFace"],
        growth_score: 98,
        avgSalary: "₹18L - ₹45L",
        learning_duration_months: 12,
        demand: "High"
    },
    {
        title: "Full Stack Developer",
        category: "Software Development",
        description: "Master both frontend and backend technologies to build complete web applications. You will handle everything from user interface to database management.",
        difficulty_level: "Intermediate",
        required_skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
        tools: ["VS Code", "Git", "Postman", "Vercel"],
        growth_score: 92,
        avgSalary: "₹8L - ₹25L",
        learning_duration_months: 8,
        demand: "High"
    },
    {
        title: "Data Scientist",
        category: "Data Science",
        description: "Extract insights from complex data sets to drive business decisions. You will use statistical methods and visualization tools to tell stories with data.",
        difficulty_level: "Advanced",
        required_skills: ["Python", "SQL", "Pandas", "Scikit-learn", "Statistics"],
        tools: ["Tableau", "PowerBI", "Jupyter", "Excel"],
        growth_score: 95,
        avgSalary: "₹12L - ₹35L",
        learning_duration_months: 10,
        demand: "High"
    },
    {
        title: "UX/UI Designer",
        category: "Design",
        description: "Design intuitive and beautiful user interfaces. You will focus on user experience research, wireframing, and high-fidelity prototyping.",
        difficulty_level: "Beginner",
        required_skills: ["Figma", "User Research", "Prototyping", "Wireframing", "Color Theory"],
        tools: ["Figma", "Adobe XD", "Sketch", "Maze"],
        growth_score: 88,
        avgSalary: "₹6L - ₹20L",
        learning_duration_months: 6,
        demand: "Medium"
    },
    {
        title: "DevOps Engineer",
        category: "Infrastructure",
        description: "Bridge the gap between development and operations. You will automate deployment pipelines and ensure system reliability and scalability.",
        difficulty_level: "Advanced",
        required_skills: ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS/Azure"],
        tools: ["Jenkins", "Terraform", "Ansible", "Grafana"],
        growth_score: 94,
        avgSalary: "₹15L - ₹40L",
        learning_duration_months: 10,
        demand: "High"
    },
    {
        title: "Product Manager",
        category: "Management",
        description: "Lead the vision and strategy for software products. You will work with engineering, design, and marketing teams to deliver product success.",
        difficulty_level: "Intermediate",
        required_skills: ["Agile", "Roadmapping", "User Stories", "Data Analysis", "Communication"],
        tools: ["Jira", "Notion", "Mixpanel", "Slack"],
        growth_score: 90,
        avgSalary: "₹15L - ₹50L",
        learning_duration_months: 6,
        demand: "High"
    },
    {
        title: "Blockchain Developer",
        category: "Web3",
        description: "Develop decentralized applications and smart contracts. You will work with distributed ledger technologies to build secure and transparent systems.",
        difficulty_level: "Advanced",
        required_skills: ["Solidity", "Rust", "Cryptography", "Smart Contracts", "Web3.js"],
        tools: ["Hardhat", "Metamask", "Remix", "Ethers.js"],
        growth_score: 96,
        avgSalary: "₹20L - ₹60L",
        learning_duration_months: 12,
        demand: "Medium"
    },
    {
        title: "Cybersecurity Analyst",
        category: "Security",
        description: "Protect organizations from cyber threats. You will monitor networks, identify vulnerabilities, and implement security protocols.",
        difficulty_level: "Intermediate",
        required_skills: ["Network Security", "Ethical Hacking", "Python", "Linux", "Risk Analysis"],
        tools: ["Wireshark", "Metasploit", "Nmap", "Burp Suite"],
        growth_score: 93,
        avgSalary: "₹10L - ₹30L",
        learning_duration_months: 9,
        demand: "High"
    },
    {
        title: "Cloud Architect",
        category: "Infrastructure",
        description: "Design and manage cloud infrastructure strategies. You will ensure that cloud systems are secure, reliable, and cost-effective.",
        difficulty_level: "Advanced",
        required_skills: ["AWS", "Azure", "System Design", "Networking", "Security"],
        tools: ["AWS CLI", "CloudFormation", "Visio", "Cost Explorer"],
        growth_score: 91,
        avgSalary: "₹25L - ₹55L",
        learning_duration_months: 14,
        demand: "High"
    },
    {
        title: "Mobile App Developer",
        category: "Software Development",
        description: "Create applications for iOS and Android devices. You will build performant and responsive mobile experiences using native or cross-platform tools.",
        difficulty_level: "Intermediate",
        required_skills: ["React Native", "Flutter", "iOS/Swift", "Android/Kotlin", "API Integration"],
        tools: ["Xcode", "Android Studio", "Firebase", "Expo"],
        growth_score: 89,
        avgSalary: "₹8L - ₹28L",
        learning_duration_months: 8,
        demand: "High"
    }
];

function seed() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            console.error("data.json not found!");
            return;
        }

        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

        // Generate IDs and map to new schema
        const newCareerPaths = careers.map(c => ({
            id: Math.random().toString(36).substr(2, 9),
            ...c
        }));

        data.careerPaths = newCareerPaths;

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        console.log(`Successfully seeded ${newCareerPaths.length} career paths.`);

    } catch (e) {
        console.error("Error seeding data:", e);
    }
}

seed();
