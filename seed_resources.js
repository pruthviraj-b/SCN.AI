
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data.json');

const resources = [
    {
        title: "Complete Python Bootcamp",
        type: "Course",
        description: "Learn Python from scratch to advanced features. Covers decorators, generators, and working with files.",
        skill_tags: ["Python", "Programming Basics"],
        difficulty_level: "Beginner",
        estimated_time: "22 hours",
        provider: "Udemy",
        url: "https://www.udemy.com/course/complete-python-bootcamp/",
        rating: 4.8,
        career_mapping: [], // IDs will be filled if possible, or left empty
        status: "Active"
    },
    {
        title: "React - The Complete Guide",
        type: "Course",
        description: "Dive deep into React.js. Learn Hooks, Redux, React Router, and Next.js.",
        skill_tags: ["React", "JavaScript", "Frontend"],
        difficulty_level: "Intermediate",
        estimated_time: "40 hours",
        provider: "Udemy",
        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        rating: 4.7,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Machine Learning Concepts Explained",
        type: "Video",
        description: "Visual explanation of core ML concepts like Gradient Descent, Neural Networks, and Backpropagation.",
        skill_tags: ["Machine Learning", "Mathematics"],
        difficulty_level: "Beginner",
        estimated_time: "1 hour",
        provider: "YouTube (3Blue1Brown)",
        url: "https://www.youtube.com/c/3blue1brown",
        rating: 4.9,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Build a Full Stack App with Next.js",
        type: "Project",
        description: "Hands-on project building a social media clone using Next.js, Prisma, and PostgreSQL.",
        skill_tags: ["Next.js", "Full Stack", "Database"],
        difficulty_level: "Advanced",
        estimated_time: "10 hours",
        provider: "YouTube",
        url: "#",
        rating: 4.5,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Google Data Analytics Professional Certificate",
        type: "Certification",
        description: "Gain in-demand skills in data analytics. Learn to use spreadsheets, SQL, Tableau, and R.",
        skill_tags: ["Data Analysis", "SQL", "R", "Tableau"],
        difficulty_level: "Beginner",
        estimated_time: "6 months",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        rating: 4.8,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "System Design Interview Guide",
        type: "Article",
        description: "Comprehensive guide to acing system design interviews. Covers scalability, load balancing, and database design.",
        skill_tags: ["System Design", "Architecture"],
        difficulty_level: "Advanced",
        estimated_time: "3 hours",
        provider: "GitHub",
        url: "https://github.com/donnemartin/system-design-primer",
        rating: 4.9,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Deep Learning Specialization",
        type: "Course",
        description: "Master Deep Learning, and break into AI. content by Andrew Ng.",
        skill_tags: ["Deep Learning", "Neural Networks", "AI"],
        difficulty_level: "Advanced",
        estimated_time: "3 months",
        provider: "Coursera",
        url: "https://www.coursera.org/specializations/deep-learning",
        rating: 4.9,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Figma for UI/UX Design",
        type: "Video",
        description: "Crash course on using Figma for interface design and prototyping.",
        skill_tags: ["Figma", "UI Design"],
        difficulty_level: "Beginner",
        estimated_time: "2 hours",
        provider: "YouTube",
        url: "#",
        rating: 4.6,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Docker and Kubernetes: The Complete Guide",
        type: "Course",
        description: "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows.",
        skill_tags: ["Docker", "Kubernetes", "DevOps"],
        difficulty_level: "Intermediate",
        estimated_time: "22 hours",
        provider: "Udemy",
        url: "#",
        rating: 4.7,
        career_mapping: [],
        status: "Active"
    },
    {
        title: "Smart Contract Development with Solidity",
        type: "Project",
        description: "Learn to write smart contracts and build DApps on Ethereum.",
        skill_tags: ["Solidity", "Blockchain", "Web3"],
        difficulty_level: "Intermediate",
        estimated_time: "15 hours",
        provider: "CryptoZombies",
        url: "https://cryptozombies.io/",
        rating: 4.8,
        career_mapping: [],
        status: "Active"
    }
];

function seed() {
    try {
        if (!fs.existsSync(DB_PATH)) {
            console.error("data.json not found!");
            return;
        }

        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

        // Use existing career IDs to map resources if careers exist
        const careerIds = data.careerPaths.map(c => ({ id: c.id, title: c.title }));

        const newResources = resources.map(r => {
            // Simple keyword matching for demo purposes
            const matchedCareers = careerIds.filter(c =>
                r.description.includes(c.title) ||
                r.skill_tags.some(tag => c.title.includes(tag))
            ).map(c => c.id);

            return {
                id: Math.random().toString(36).substr(2, 9),
                ...r,
                career_mapping: matchedCareers
            };
        });

        data.learningResources = newResources;

        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        console.log(`Successfully seeded ${newResources.length} learning resources.`);

    } catch (e) {
        console.error("Error seeding resources:", e);
    }
}

seed();
