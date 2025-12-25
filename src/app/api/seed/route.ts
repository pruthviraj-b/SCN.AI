
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // 1. Careers Data
        const careers = [
            {
                title: "Full Stack Developer",
                category: "Technology",
                description: "Build end-to-end web applications. Master both frontend user interfaces and backend server logic.",
                difficulty_level: "Intermediate",
                required_skills: ["React", "Node.js", "TypeScript", "SQL", "Git"],
                tools: ["VS Code", "GitHub", "Docker", "AWS"],
                growth_score: 95,
                avg_salary: "₹6-18 LPA",
                learning_duration_months: 8,
                demand: "High"
            },
            {
                title: "AI & Machine Learning Engineer",
                category: "Technology",
                description: "Develop intelligent systems that learn from data. Build models for prediction, NLP, and computer vision.",
                difficulty_level: "Advanced",
                required_skills: ["Python", "TensorFlow", "PyTorch", "Mathematics", "Data Analysis"],
                tools: ["Jupyter", "Google Colab", "Hugging Face", "LangChain"],
                growth_score: 99,
                avg_salary: "₹10-25 LPA",
                learning_duration_months: 12,
                demand: "High"
            },
            {
                title: "Product Manager",
                category: "Business",
                description: "Lead product development from conception to launch. Bridge the gap between tech, business, and design.",
                difficulty_level: "Intermediate",
                required_skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Communication"],
                tools: ["Jira", "Figma", "Notion", "Mixpanel"],
                growth_score: 85,
                avg_salary: "₹12-24 LPA",
                learning_duration_months: 6,
                demand: "High"
            },
            {
                title: "UI/UX Designer",
                category: "Design",
                description: "Design intuitive and beautiful digital experiences. Focus on user needs, wireframing, and prototyping.",
                difficulty_level: "Beginner",
                required_skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Interaction Design"],
                tools: ["Figma", "Adobe XD", "Sketch", "Framer"],
                growth_score: 88,
                avg_salary: "₹5-15 LPA",
                learning_duration_months: 6,
                demand: "Medium"
            },
            {
                title: "Data Scientist",
                category: "Data",
                description: "Extract insights from complex data. Use statistics and code to solve business problems.",
                difficulty_level: "Advanced",
                required_skills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
                tools: ["Tableau", "PowerBI", "Pandas", "Scikit-learn"],
                growth_score: 92,
                avg_salary: "₹8-20 LPA",
                learning_duration_months: 10,
                demand: "High"
            },
            {
                title: "Digital Marketing Specialist",
                category: "Marketing",
                description: "Drive growth through online channels. Master SEO, SEM, content marketing, and analytics.",
                difficulty_level: "Beginner",
                required_skills: ["SEO", "Content Strategy", "Analytics", "Social Media", "Copywriting"],
                tools: ["Google Analytics", "SEMrush", "HubSpot", "Canva"],
                growth_score: 80,
                avg_salary: "₹4-12 LPA",
                learning_duration_months: 4,
                demand: "Medium"
            },
            {
                title: "Blockchain Developer",
                category: "Technology",
                description: "Build decentralized applications (dApps) and smart contracts on blockchain platforms.",
                difficulty_level: "Advanced",
                required_skills: ["Solidity", "Cryptography", "Smart Contracts", "Web3.js", "Ethereum"],
                tools: ["Hardhat", "Metamask", "Remix", "Truffle"],
                growth_score: 96,
                avg_salary: "₹15-30 LPA",
                learning_duration_months: 9,
                demand: "High"
            },
            {
                title: "Cybersecurity Analyst",
                category: "Technology",
                description: "Protect systems and networks from cyber threats. Monitor security and investigate breaches.",
                difficulty_level: "Intermediate",
                required_skills: ["Network Security", "Ethical Hacking", "Forensics", "Risk Management", "Linux"],
                tools: ["Wireshark", "Metasploit", "Nmap", "Burp Suite"],
                growth_score: 90,
                avg_salary: "₹7-16 LPA",
                learning_duration_months: 8,
                demand: "High"
            },
            {
                title: "DevOps Engineer",
                category: "Technology",
                description: "Bridge development and operations. Automate CI/CD pipelines and manage cloud infrastructure.",
                difficulty_level: "Advanced",
                required_skills: ["CI/CD", "Docker", "Kubernetes", "AWS/Azure", "Scripting"],
                tools: ["Jenkins", "Terraform", "Ansible", "GitLab CI"],
                growth_score: 93,
                avg_salary: "₹10-22 LPA",
                learning_duration_months: 10,
                demand: "High"
            },
            {
                title: "Technical Writer",
                category: "Content",
                description: "Translate complex technical information into clear, concise documentation for users.",
                difficulty_level: "Beginner",
                required_skills: ["Writing", "Markdown", "Research", "API Documentation", "Communication"],
                tools: ["Notion", "GitBook", "Docusaurus", "Confluence"],
                growth_score: 75,
                avg_salary: "₹5-14 LPA",
                learning_duration_months: 4,
                demand: "Medium"
            }
        ];

        // 2. Learning Resources
        const resources = [
            {
                title: "CS50: Introduction to Computer Science",
                type: "Course",
                description: "Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
                skill_tags: ["Computer Science", "C", "Python", "Algorithms", "SQL"],
                difficulty_level: "Beginner",
                estimated_time: "12 Weeks",
                provider: "Harvard (edX)",
                url: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
                rating: 4.9,
                status: "Active"
            },
            {
                title: "The Complete 2024 Web Development Bootcamp",
                type: "Course",
                description: "Become a Full-Stack Web Developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.",
                skill_tags: ["Web Development", "Full Stack", "React", "Node.js"],
                difficulty_level: "Beginner",
                estimated_time: "65 Hours",
                provider: "Udemy (Angela Yu)",
                url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
                rating: 4.8,
                status: "Active"
            },
            {
                title: "Google Data Analytics Professional Certificate",
                type: "Certification",
                description: "Gain the skills you need to become a junior data analyst. Learn data cleaning, analysis, and visualization.",
                skill_tags: ["Data Analytics", "R", "SQL", "Tableau", "Spreadsheets"],
                difficulty_level: "Beginner",
                estimated_time: "6 Months",
                provider: "Coursera (Google)",
                url: "https://www.coursera.org/professional-certificates/google-data-analytics",
                rating: 4.8,
                status: "Active"
            },
            {
                title: "Deep Learning Specialization",
                type: "Certification",
                description: "Master Deep Learning, and break into AI. Learn TensorFlow, CNNs, RNNs, LSTMs, and more.",
                skill_tags: ["AI", "Deep Learning", "TensorFlow", "Neural Networks"],
                difficulty_level: "Advanced",
                estimated_time: "3 Months",
                provider: "Coursera (DeepLearning.AI)",
                url: "https://www.coursera.org/specializations/deep-learning",
                rating: 4.9,
                status: "Active"
            },
            {
                title: "Refactoring UI",
                type: "Article",
                description: "Learn how to design beautiful user interfaces by yourself using specific tactics explained from a developer's point-of-view.",
                skill_tags: ["UI Design", "CSS", "Visual Design"],
                difficulty_level: "Intermediate",
                estimated_time: "Book/Guide",
                provider: "Adam Wathan & Steve Schoger",
                url: "https://www.refactoringui.com/",
                rating: 4.9,
                status: "Active"
            },
            {
                title: "System Design Primer",
                type: "Article",
                description: "Learn how to design large-scale systems. Prepare for the system design interview.",
                skill_tags: ["System Design", "Scalability", "Architecture"],
                difficulty_level: "Advanced",
                estimated_time: "Reading",
                provider: "Donne Martin (GitHub)",
                url: "https://github.com/donnemartin/system-design-primer",
                rating: 5.0,
                status: "Active"
            },
            {
                title: "FreeCodeCamp",
                type: "Project",
                description: "Learn to code for free. Build projects. Earn certifications.",
                skill_tags: ["Coding", "Projects", "Certifications", "Full Stack"],
                difficulty_level: "Beginner",
                estimated_time: "Self-paced",
                provider: "freeCodeCamp.org",
                url: "https://www.freecodecamp.org/",
                rating: 4.9,
                status: "Active"
            },
            {
                title: "Fast.ai: Practical Deep Learning for Coders",
                type: "Course",
                description: "A free course designed for people with some coding experience who want to learn how to apply deep learning and machine learning.",
                skill_tags: ["AI", "Deep Learning", "PyTorch"],
                difficulty_level: "Intermediate",
                estimated_time: "8 Weeks",
                provider: "fast.ai",
                url: "https://course.fast.ai/",
                rating: 4.9,
                status: "Active"
            },
            {
                title: "React Documentation (Official)",
                type: "Article",
                description: "The official guide to learning React. Comprehensive, interactive, and authoritative.",
                skill_tags: ["React", "Documentation", "Frontend"],
                difficulty_level: "Beginner",
                estimated_time: "Reference",
                provider: "React Team",
                url: "https://react.dev/learn",
                rating: 5.0,
                status: "Active"
            },
            {
                title: "Y Combinator Startup School",
                type: "Course",
                description: "The best free resource for founders. Learn how to start a company, get funding, and grow.",
                skill_tags: ["Startup", "Business", "Entrepreneurship", "Fundraising"],
                difficulty_level: "Beginner",
                estimated_time: "Self-paced",
                provider: "Y Combinator",
                url: "https://www.startupschool.org/",
                rating: 5.0,
                status: "Active"
            },
            {
                title: "Figma 101: Design for Everyone",
                type: "Video",
                description: "Free video course on how to use Figma for interface design.",
                skill_tags: ["Figma", "Design Tools", "UI Design"],
                difficulty_level: "Beginner",
                estimated_time: "4 Hours",
                provider: "DesignCourse (YouTube)",
                url: "https://www.youtube.com/watch?v=Gu1so3pz4bA",
                rating: 4.7,
                status: "Active"
            },
            {
                title: "AWS Cloud Practitioner Essentials",
                type: "Certification",
                description: "Learn the fundamentals of the AWS Cloud to prepare for the AWS Certified Cloud Practitioner exam.",
                skill_tags: ["Cloud", "AWS", "Infrastructure"],
                difficulty_level: "Beginner",
                estimated_time: "6 Hours",
                provider: "AWS Training",
                url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/",
                rating: 4.8,
                status: "Active"
            }
        ];

        // 3. Startup Ideas
        const ideas = [
            {
                title: "AI-Powered Personal Tutor",
                problem_statement: "Students often lack personalized attention in classrooms, leading to learning gaps.",
                solution_summary: "An AI app that adapts to each student's learning style, providing customized lessons and real-time feedback.",
                target_users: "K-12 Students, College Students, Lifelong Learners",
                industry: "EdTech",
                difficulty_level: "Advanced",
                required_skills: ["AI/ML", "App Development", "Pedagogy"],
                market_size_estimate: "$10B+",
                revenue_model: ["Subscription", "Freemium"],
                validation_score: 92,
                risk_level: "Medium",
                execution_steps: ["Build MVP with core subjects", "Partner with schools", "Expand subject base"],
                status: "Idea"
            },
            {
                title: "Local Experience Marketplace",
                problem_statement: "Travelers struggle to find authentic, non-touristy experiences in new cities.",
                solution_summary: "A platform connecting travelers with locals who offer unique, personalized tours and activities.",
                target_users: "Travelers, Local Guides",
                industry: "Travel & Tourism",
                difficulty_level: "Intermediate",
                required_skills: ["Marketplace Dev", "Community Building", "Marketing"],
                market_size_estimate: "$5B",
                revenue_model: ["Commission", "Listing Fees"],
                validation_score: 85,
                risk_level: "High",
                execution_steps: ["Launch in one pilot city", "Recruit local hosts", "Market to travelers"],
                status: "Idea"
            },
            {
                title: "Sustainable Packaging Subscription",
                problem_statement: "Small e-commerce businesses struggle to source affordable, eco-friendly packaging.",
                solution_summary: "A B2B subscription service providing customizable, biodegradable packaging to small online stores.",
                target_users: "Small E-commerce Businesses, Etsy Sellers",
                industry: "Sustainability / Logistics",
                difficulty_level: "Intermediate",
                required_skills: ["Supply Chain", "Sales", "Sustainability"],
                market_size_estimate: "$2B",
                revenue_model: ["Subscription Box", "Bulk Sales"],
                validation_score: 88,
                risk_level: "Medium",
                execution_steps: ["Source suppliers", "Create sample kits", "Pitch to Etsy sellers"],
                status: "Idea"
            },
            {
                title: "Remote Team Bonding Platform",
                problem_statement: "Remote teams struggle to build culture and connection without physical offices.",
                solution_summary: "A platform offering virtual team-building games, watercooler spaces, and engagement analytics.",
                target_users: "Remote Companies, HR Managers",
                industry: "HR Tech / SaaS",
                difficulty_level: "Intermediate",
                required_skills: ["Game Dev", "WebSockets", "HR Analytics"],
                market_size_estimate: "$3B",
                revenue_model: ["SaaS Subscription", "Per-event Fee"],
                validation_score: 82,
                risk_level: "Medium",
                execution_steps: ["Build mini-games MVP", "Beta test with 5 companies", "Launch publicly"],
                status: "Idea"
            },
            {
                title: "Hyper-Local Food Delivery for Home Chefs",
                problem_statement: "Talented home cooks have no easy way to sell their food legally and at scale.",
                solution_summary: "A platform validating home kitchens and connecting them with neighbors craving homemade meals.",
                target_users: "Home Cooks, Foodies",
                industry: "FoodTech",
                difficulty_level: "Advanced",
                required_skills: ["Operations", "Regulatory/Legal", "App Dev"],
                market_size_estimate: "$20B",
                revenue_model: ["Commission", "Delivery Fee"],
                validation_score: 78,
                risk_level: "High",
                execution_steps: ["Navigate local health laws", "Onboard 10 chefs", "Launch in one neighborhood"],
                status: "Idea"
            },
            {
                title: "Senior Care Companion App",
                problem_statement: "Elders living alone suffer from loneliness and lack of assistance with daily digital tasks.",
                solution_summary: "An app connecting seniors with vetted companions for conversation, tech help, and light errands.",
                target_users: "Seniors, Families of Seniors",
                industry: "HealthTech / Care",
                difficulty_level: "Intermediate",
                required_skills: ["Trust & Safety", "App Dev", "Caregiving Networks"],
                market_size_estimate: "$15B",
                revenue_model: ["Hourly Fees", "Subscription"],
                validation_score: 95,
                risk_level: "Medium",
                execution_steps: ["Partner with senior centers", "Vet initial companions", "Pilot program"],
                status: "Idea"
            },
            {
                title: "Micro-SaaS for Niche Influencers",
                problem_statement: "Mid-tier influencers struggle to monetize beyond sporadic sponsorships.",
                solution_summary: "White-label tools allowing influencers to launch their own branded paid communities or mini-courses instantly.",
                target_users: "Creators, Influencers",
                industry: "Creator Economy",
                difficulty_level: "Intermediate",
                required_skills: ["SaaS Dev", "Marketing", "Stripe Connect"],
                market_size_estimate: "$100B (Creator Economy)",
                revenue_model: ["Revenue Share", "SaaS Fee"],
                validation_score: 90,
                risk_level: "Low",
                execution_steps: ["Build core community tool", "Onboard 3 beta creators", "Scale"],
                status: "Idea"
            },
            {
                title: "Smart Inventory for Small Retailers",
                problem_statement: "Small shops rely on pen and paper, leading to stockouts and overstocking.",
                solution_summary: "A mobile-first, AI-powered inventory management app that predicts demand for mom-and-pop shops.",
                target_users: "Small Retailers, Bodegas",
                industry: "Retail Tech",
                difficulty_level: "Advanced",
                required_skills: ["AI/Prediction", "Mobile Dev", "UX for Non-tech users"],
                market_size_estimate: "$8B",
                revenue_model: ["SaaS Subscription"],
                validation_score: 87,
                risk_level: "Medium",
                execution_steps: ["Walk into 20 shops to interview owners", "Build MVP", "Direct sales"],
                status: "Idea"
            }
        ];

        // Seed Data
        // Seed Data - Clean & Insert (Avoids Unique Constraint issues)
        console.log("Seeding Careers...");
        await supabase.from('career_paths').delete().neq('title', 'placeholder_delete_all'); // Simple hack to try match all or use ID
        // Proper delete all:
        await supabase.from('career_paths').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        const { error: careerError } = await supabase.from('career_paths').insert(careers);
        if (careerError) throw careerError;

        console.log("Seeding Resources...");
        await supabase.from('learning_resources').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        const { error: resourceError } = await supabase.from('learning_resources').insert(resources);
        if (resourceError) throw resourceError;

        console.log("Seeding Ideas...");
        await supabase.from('startup_ideas').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        const { error: ideaError } = await supabase.from('startup_ideas').insert(ideas);
        if (ideaError) throw ideaError;

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully!",
            counts: {
                careers: careers.length,
                resources: resources.length,
                ideas: ideas.length
            }
        });

    } catch (error: any) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
