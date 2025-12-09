import { db } from './db';

export function seedDatabase() {
    const data = db.read();

    // Only seed if database is empty
    if (data.careerPaths.length === 0) {
        // Add Career Paths
        db.careerPath.create({
            title: "Software Engineer",
            category: "Technology",
            demand: "High",
            avgSalary: "$120k - $180k",
            description: "Design, develop, and maintain software applications. Work with cutting-edge technologies and solve complex problems."
        });

        db.careerPath.create({
            title: "Data Scientist",
            category: "Technology",
            demand: "High",
            avgSalary: "$130k - $200k",
            description: "Analyze complex data sets, build predictive models, and derive actionable insights using machine learning and statistics."
        });

        db.careerPath.create({
            title: "Product Manager",
            category: "Business",
            demand: "High",
            avgSalary: "$140k - $190k",
            description: "Lead product strategy, coordinate cross-functional teams, and drive product development from concept to launch."
        });

        db.careerPath.create({
            title: "UX/UI Designer",
            category: "Design",
            demand: "Medium",
            avgSalary: "$95k - $140k",
            description: "Create intuitive user experiences and beautiful interfaces. Conduct user research and design user-centered products."
        });

        db.careerPath.create({
            title: "Digital Marketing Manager",
            category: "Marketing",
            demand: "Medium",
            avgSalary: "$85k - $130k",
            description: "Develop and execute digital marketing strategies across multiple channels to drive brand awareness and growth."
        });

        db.careerPath.create({
            title: "Cloud Architect",
            category: "Technology",
            demand: "High",
            avgSalary: "$150k - $220k",
            description: "Design and implement cloud infrastructure solutions. Expertise in AWS, Azure, or Google Cloud platforms."
        });
    }

    if (data.skills.length === 0) {
        // Add Skills
        const skills = [
            { name: "Python", category: "Programming", level: "Beginner to Advanced" },
            { name: "JavaScript", category: "Programming", level: "Beginner to Advanced" },
            { name: "React", category: "Framework", level: "Intermediate to Advanced" },
            { name: "Node.js", category: "Backend", level: "Intermediate to Advanced" },
            { name: "SQL", category: "Database", level: "Beginner to Advanced" },
            { name: "Data Analysis", category: "Analytics", level: "Beginner to Advanced" },
            { name: "Machine Learning", category: "AI/ML", level: "Advanced" },
            { name: "UX Design", category: "Design", level: "Beginner to Advanced" },
            { name: "Product Strategy", category: "Business", level: "Intermediate to Advanced" },
            { name: "Digital Marketing", category: "Marketing", level: "Beginner to Advanced" },
        ];

        skills.forEach(skill => db.skill.create(skill));
    }

    if (data.learningResources.length === 0) {
        // Add Learning Resources
        const resources = [
            {
                title: "Python for Beginners",
                platform: "Coursera",
                category: "Programming",
                url: "coursera.org/learn/python",
                status: "Active"
            },
            {
                title: "React - The Complete Guide",
                platform: "Udemy",
                category: "Web Development",
                url: "udemy.com/course/react-the-complete-guide",
                status: "Active"
            },
            {
                title: "Data Science Bootcamp",
                platform: "DataCamp",
                category: "Data Science",
                url: "datacamp.com/courses/data-science",
                status: "Active"
            },
            {
                title: "Machine Learning A-Z",
                platform: "Udemy",
                category: "AI/ML",
                url: "udemy.com/course/machinelearning",
                status: "Active"
            },
            {
                title: "UX Design Fundamentals",
                platform: "Interaction Design Foundation",
                category: "Design",
                url: "interaction-design.org/courses/ux-design",
                status: "Active"
            },
            {
                title: "Digital Marketing Masterclass",
                platform: "Udemy",
                category: "Marketing",
                url: "udemy.com/course/digital-marketing",
                status: "Active"
            },
        ];

        resources.forEach(resource => db.learningResource.create(resource));
    }

    if (data.startupIdeas.length === 0) {
        // Add Startup Ideas
        const ideas = [
            {
                title: "AI-Powered Resume Builder",
                category: "SaaS",
                difficulty: "Medium",
                market: "HR Tech",
                description: "Help job seekers create ATS-friendly resumes with AI suggestions"
            },
            {
                title: "Eco-Friendly Delivery Service",
                category: "Logistics",
                difficulty: "High",
                market: "Green Tech",
                description: "Carbon-neutral last-mile delivery using electric vehicles"
            },
            {
                title: "Online Tutoring Platform",
                category: "EdTech",
                difficulty: "Medium",
                market: "Education",
                description: "Connect students with expert tutors for personalized learning"
            },
            {
                title: "Smart Home Automation Hub",
                category: "IoT",
                difficulty: "High",
                market: "Smart Home",
                description: "Unified platform to control all smart home devices"
            },
        ];

        ideas.forEach(idea => db.startupIdea.create(idea));
    }

    console.log('✅ Database seeded successfully!');
}
