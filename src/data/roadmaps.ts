export type RoadmapStep = {
    title: string;
    duration: string;
    skills: string[];
};

export type Roadmap = {
    id: string;
    title: string;
    category: string;
    description: string;
    totalDuration: string;
    beginner: RoadmapStep[];
    intermediate: RoadmapStep[];
    advanced: RoadmapStep[];
};

export const roadmaps: Roadmap[] = [
    {
        id: '1',
        title: 'Full Stack Web Developer',
        category: 'Web Development',
        description: 'Complete path from beginner to advanced full stack developer',
        totalDuration: '12-18 months',
        beginner: [
            { title: 'HTML & CSS Fundamentals', duration: '2 weeks', skills: ['HTML5', 'CSS3', 'Responsive Design'] },
            { title: 'JavaScript Basics', duration: '4 weeks', skills: ['JavaScript', 'DOM Manipulation', 'ES6+'] },
            { title: 'Version Control', duration: '1 week', skills: ['Git', 'GitHub', 'Collaboration'] }
        ],
        intermediate: [
            { title: 'Frontend Framework', duration: '8 weeks', skills: ['React', 'State Management', 'Hooks'] },
            { title: 'Backend Development', duration: '8 weeks', skills: ['Node.js', 'Express', 'REST APIs'] },
            { title: 'Database Management', duration: '4 weeks', skills: ['SQL', 'MongoDB', 'Database Design'] }
        ],
        advanced: [
            { title: 'Advanced React Patterns', duration: '4 weeks', skills: ['Context API', 'Custom Hooks', 'Performance'] },
            { title: 'Microservices Architecture', duration: '6 weeks', skills: ['Microservices', 'Docker', 'Kubernetes'] },
            { title: 'DevOps & Deployment', duration: '4 weeks', skills: ['CI/CD', 'AWS', 'Monitoring'] }
        ]
    },
    {
        id: '2',
        title: 'Data Scientist',
        category: 'Data Science',
        description: 'Journey from data analysis to machine learning expert',
        totalDuration: '15-20 months',
        beginner: [
            { title: 'Python Programming', duration: '4 weeks', skills: ['Python', 'Data Types', 'Functions'] },
            { title: 'Statistics Fundamentals', duration: '6 weeks', skills: ['Statistics', 'Probability', 'Distributions'] },
            { title: 'Data Analysis Libraries', duration: '4 weeks', skills: ['Pandas', 'NumPy', 'Matplotlib'] }
        ],
        intermediate: [
            { title: 'Machine Learning Basics', duration: '8 weeks', skills: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning'] },
            { title: 'SQL & Databases', duration: '4 weeks', skills: ['SQL', 'Data Warehousing', 'ETL'] },
            { title: 'Data Visualization', duration: '3 weeks', skills: ['Tableau', 'Power BI', 'Seaborn'] }
        ],
        advanced: [
            { title: 'Deep Learning', duration: '10 weeks', skills: ['TensorFlow', 'PyTorch', 'Neural Networks'] },
            { title: 'NLP & Computer Vision', duration: '8 weeks', skills: ['NLP', 'CV', 'Transformers'] },
            { title: 'MLOps & Deployment', duration: '6 weeks', skills: ['MLflow', 'Model Deployment', 'Monitoring'] }
        ]
    },
    {
        id: '3',
        title: 'Cloud Engineer',
        category: 'Cloud',
        description: 'Master cloud platforms and infrastructure',
        totalDuration: '10-14 months',
        beginner: [
            { title: 'Cloud Fundamentals', duration: '3 weeks', skills: ['Cloud Concepts', 'IaaS', 'PaaS', 'SaaS'] },
            { title: 'Linux Basics', duration: '4 weeks', skills: ['Linux', 'Command Line', 'Shell Scripting'] },
            { title: 'Networking Fundamentals', duration: '3 weeks', skills: ['TCP/IP', 'DNS', 'Load Balancing'] }
        ],
        intermediate: [
            { title: 'AWS Core Services', duration: '8 weeks', skills: ['EC2', 'S3', 'RDS', 'Lambda'] },
            { title: 'Infrastructure as Code', duration: '6 weeks', skills: ['Terraform', 'CloudFormation', 'Ansible'] },
            { title: 'Containerization', duration: '4 weeks', skills: ['Docker', 'Container Registry', 'Orchestration'] }
        ],
        advanced: [
            { title: 'Kubernetes Mastery', duration: '8 weeks', skills: ['Kubernetes', 'Helm', 'Service Mesh'] },
            { title: 'Multi-Cloud Architecture', duration: '6 weeks', skills: ['AWS', 'Azure', 'GCP', 'Hybrid Cloud'] },
            { title: 'Cloud Security', duration: '5 weeks', skills: ['IAM', 'Encryption', 'Compliance', 'Security Best Practices'] }
        ]
    },
    {
        id: '4',
        title: 'Cybersecurity Specialist',
        category: 'Security',
        description: 'Become a cybersecurity professional',
        totalDuration: '12-16 months',
        beginner: [
            { title: 'Security Fundamentals', duration: '4 weeks', skills: ['Security Concepts', 'CIA Triad', 'Threat Landscape'] },
            { title: 'Networking Basics', duration: '4 weeks', skills: ['Networking', 'Protocols', 'Firewalls'] },
            { title: 'Operating Systems', duration: '3 weeks', skills: ['Windows', 'Linux', 'System Administration'] }
        ],
        intermediate: [
            { title: 'Ethical Hacking', duration: '8 weeks', skills: ['Penetration Testing', 'Kali Linux', 'Metasploit'] },
            { title: 'Security Tools', duration: '6 weeks', skills: ['SIEM', 'IDS/IPS', 'Vulnerability Scanners'] },
            { title: 'Web Application Security', duration: '5 weeks', skills: ['OWASP', 'SQL Injection', 'XSS'] }
        ],
        advanced: [
            { title: 'Advanced Threat Detection', duration: '8 weeks', skills: ['Threat Intelligence', 'Malware Analysis', 'Forensics'] },
            { title: 'Cloud Security', duration: '6 weeks', skills: ['Cloud Security', 'Container Security', 'DevSecOps'] },
            { title: 'Security Architecture', duration: '6 weeks', skills: ['Security Design', 'Risk Management', 'Compliance'] }
        ]
    },
    {
        id: '5',
        title: 'Mobile App Developer',
        category: 'Mobile',
        description: 'Build iOS and Android applications',
        totalDuration: '10-12 months',
        beginner: [
            { title: 'Programming Basics', duration: '4 weeks', skills: ['JavaScript', 'Programming Concepts', 'OOP'] },
            { title: 'Mobile UI/UX', duration: '3 weeks', skills: ['Mobile Design', 'UI Patterns', 'User Experience'] },
            { title: 'React Native Basics', duration: '4 weeks', skills: ['React Native', 'Components', 'Navigation'] }
        ],
        intermediate: [
            { title: 'State Management', duration: '4 weeks', skills: ['Redux', 'Context API', 'State Patterns'] },
            { title: 'Native Modules', duration: '5 weeks', skills: ['Native Code', 'Bridges', 'Platform APIs'] },
            { title: 'Backend Integration', duration: '4 weeks', skills: ['REST APIs', 'GraphQL', 'Authentication'] }
        ],
        advanced: [
            { title: 'Performance Optimization', duration: '4 weeks', skills: ['Performance', 'Memory Management', 'Profiling'] },
            { title: 'Advanced Features', duration: '6 weeks', skills: ['Push Notifications', 'Offline Storage', 'Background Tasks'] },
            { title: 'App Store Deployment', duration: '3 weeks', skills: ['App Store', 'Play Store', 'CI/CD'] }
        ]
    },
    {
        id: '6',
        title: 'DevOps Engineer',
        category: 'DevOps',
        description: 'Master DevOps practices and tools',
        totalDuration: '10-14 months',
        beginner: [
            { title: 'Linux Administration', duration: '4 weeks', skills: ['Linux', 'Shell Scripting', 'System Management'] },
            { title: 'Version Control', duration: '2 weeks', skills: ['Git', 'GitHub', 'GitLab'] },
            { title: 'Basic Networking', duration: '3 weeks', skills: ['Networking', 'DNS', 'Load Balancing'] }
        ],
        intermediate: [
            { title: 'CI/CD Pipelines', duration: '6 weeks', skills: ['Jenkins', 'GitLab CI', 'GitHub Actions'] },
            { title: 'Containerization', duration: '5 weeks', skills: ['Docker', 'Docker Compose', 'Container Security'] },
            { title: 'Configuration Management', duration: '4 weeks', skills: ['Ansible', 'Puppet', 'Chef'] }
        ],
        advanced: [
            { title: 'Kubernetes Orchestration', duration: '8 weeks', skills: ['Kubernetes', 'Helm', 'Service Mesh'] },
            { title: 'Infrastructure as Code', duration: '6 weeks', skills: ['Terraform', 'CloudFormation', 'Pulumi'] },
            { title: 'Monitoring & Observability', duration: '5 weeks', skills: ['Prometheus', 'Grafana', 'ELK Stack'] }
        ]
    },
    {
        id: '7',
        title: 'UX/UI Designer',
        category: 'Design',
        description: 'Design beautiful and functional user experiences',
        totalDuration: '8-12 months',
        beginner: [
            { title: 'Design Fundamentals', duration: '4 weeks', skills: ['Design Principles', 'Color Theory', 'Typography'] },
            { title: 'Design Tools', duration: '3 weeks', skills: ['Figma', 'Adobe XD', 'Sketch'] },
            { title: 'User Research Basics', duration: '3 weeks', skills: ['User Research', 'Personas', 'User Journeys'] }
        ],
        intermediate: [
            { title: 'Wireframing & Prototyping', duration: '5 weeks', skills: ['Wireframes', 'Prototypes', 'Interactive Design'] },
            { title: 'UI Design Patterns', duration: '4 weeks', skills: ['UI Patterns', 'Component Libraries', 'Design Systems'] },
            { title: 'Usability Testing', duration: '4 weeks', skills: ['Testing', 'A/B Testing', 'Analytics'] }
        ],
        advanced: [
            { title: 'Advanced Prototyping', duration: '5 weeks', skills: ['Advanced Prototyping', 'Micro-interactions', 'Animation'] },
            { title: 'Design Systems', duration: '6 weeks', skills: ['Design Systems', 'Component Libraries', 'Documentation'] },
            { title: 'Accessibility & Inclusive Design', duration: '4 weeks', skills: ['Accessibility', 'WCAG', 'Inclusive Design'] }
        ]
    },
    {
        id: '8',
        title: 'AI/ML Engineer',
        category: 'AI/ML',
        description: 'Build intelligent systems with AI and machine learning',
        totalDuration: '16-20 months',
        beginner: [
            { title: 'Python Programming', duration: '4 weeks', skills: ['Python', 'Data Structures', 'Algorithms'] },
            { title: 'Mathematics for ML', duration: '8 weeks', skills: ['Linear Algebra', 'Calculus', 'Statistics'] },
            { title: 'Data Manipulation', duration: '4 weeks', skills: ['Pandas', 'NumPy', 'Data Cleaning'] }
        ],
        intermediate: [
            { title: 'Machine Learning Algorithms', duration: '10 weeks', skills: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn'] },
            { title: 'Deep Learning Basics', duration: '8 weeks', skills: ['Neural Networks', 'TensorFlow', 'Keras'] },
            { title: 'Model Evaluation', duration: '4 weeks', skills: ['Cross-validation', 'Metrics', 'Hyperparameter Tuning'] }
        ],
        advanced: [
            { title: 'Advanced Deep Learning', duration: '10 weeks', skills: ['CNNs', 'RNNs', 'Transformers', 'GANs'] },
            { title: 'NLP & Computer Vision', duration: '10 weeks', skills: ['NLP', 'Computer Vision', 'BERT', 'GPT'] },
            { title: 'MLOps & Production', duration: '8 weeks', skills: ['MLOps', 'Model Deployment', 'Monitoring', 'Scaling'] }
        ]
    },
    {
        id: '9',
        title: 'Product Manager',
        category: 'Management',
        description: 'Lead product development from idea to launch',
        totalDuration: '8-10 months',
        beginner: [
            { title: 'Product Management Basics', duration: '3 weeks', skills: ['Product Lifecycle', 'Stakeholder Management', 'Agile'] },
            { title: 'Market Research', duration: '3 weeks', skills: ['Market Analysis', 'Competitive Analysis', 'User Research'] },
            { title: 'Technical Fundamentals', duration: '4 weeks', skills: ['Technical Concepts', 'APIs', 'Databases'] }
        ],
        intermediate: [
            { title: 'Product Strategy', duration: '5 weeks', skills: ['Strategy', 'Roadmapping', 'OKRs'] },
            { title: 'Data-Driven Decisions', duration: '4 weeks', skills: ['Analytics', 'A/B Testing', 'Metrics'] },
            { title: 'User Experience', duration: '4 weeks', skills: ['UX Principles', 'User Stories', 'Wireframing'] }
        ],
        advanced: [
            { title: 'Advanced Product Strategy', duration: '6 weeks', skills: ['Vision', 'Go-to-Market', 'Pricing'] },
            { title: 'Leadership & Communication', duration: '5 weeks', skills: ['Leadership', 'Stakeholder Management', 'Presentations'] },
            { title: 'Growth & Scaling', duration: '4 weeks', skills: ['Growth Hacking', 'Scaling', 'Product-Market Fit'] }
        ]
    },
    {
        id: '10',
        title: 'Blockchain Developer',
        category: 'Blockchain',
        description: 'Build decentralized applications and smart contracts',
        totalDuration: '12-15 months',
        beginner: [
            { title: 'Blockchain Fundamentals', duration: '4 weeks', skills: ['Blockchain Concepts', 'Cryptography', 'Consensus'] },
            { title: 'JavaScript Basics', duration: '4 weeks', skills: ['JavaScript', 'ES6+', 'Async Programming'] },
            { title: 'Web3 Basics', duration: '3 weeks', skills: ['Web3.js', 'MetaMask', 'Wallets'] }
        ],
        intermediate: [
            { title: 'Smart Contract Development', duration: '8 weeks', skills: ['Solidity', 'Smart Contracts', 'Testing'] },
            { title: 'Ethereum Development', duration: '6 weeks', skills: ['Ethereum', 'Truffle', 'Hardhat'] },
            { title: 'DApp Development', duration: '6 weeks', skills: ['DApps', 'Frontend Integration', 'IPFS'] }
        ],
        advanced: [
            { title: 'Advanced Smart Contracts', duration: '8 weeks', skills: ['Security', 'Gas Optimization', 'Upgradeable Contracts'] },
            { title: 'DeFi Development', duration: '8 weeks', skills: ['DeFi Protocols', 'Liquidity Pools', 'Yield Farming'] },
            { title: 'Multi-Chain Development', duration: '6 weeks', skills: ['Polygon', 'Binance Smart Chain', 'Cross-chain'] }
        ]
    }
];

export const roadmapCategories = ['All', 'Web Development', 'Data Science', 'Cloud', 'Security', 'Mobile', 'DevOps', 'Design', 'AI/ML', 'Management', 'Blockchain'];
