export type Career = {
    id: string;
    title: string;
    category: string;
    salary: string;
    growth: string;
    description: string;
    skills: string[];
    trending: boolean;
};

export const careers: Career[] = [
    // IT & Software Development (25 careers)
    { id: '1', title: 'Full Stack Developer', category: 'IT', salary: '$80k-$150k', growth: '+22%', description: 'Build complete web applications using frontend and backend technologies', skills: ['JavaScript', 'React', 'Node.js', 'SQL'], trending: true },
    { id: '2', title: 'DevOps Engineer', category: 'IT', salary: '$90k-$160k', growth: '+25%', description: 'Automate and optimize software deployment and infrastructure', skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'], trending: true },
    { id: '3', title: 'Mobile App Developer', category: 'IT', salary: '$75k-$140k', growth: '+19%', description: 'Create native and cross-platform mobile applications', skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'], trending: true },
    { id: '4', title: 'Frontend Developer', category: 'IT', salary: '$70k-$130k', growth: '+18%', description: 'Design and implement user interfaces for web applications', skills: ['HTML', 'CSS', 'JavaScript', 'React'], trending: false },
    { id: '5', title: 'Backend Developer', category: 'IT', salary: '$75k-$140k', growth: '+20%', description: 'Build server-side logic and database systems', skills: ['Python', 'Node.js', 'PostgreSQL', 'Redis'], trending: false },
    { id: '6', title: 'Software Architect', category: 'IT', salary: '$120k-$200k', growth: '+15%', description: 'Design high-level software system structures', skills: ['System Design', 'Microservices', 'Cloud', 'Architecture Patterns'], trending: false },
    { id: '7', title: 'QA Engineer', category: 'IT', salary: '$65k-$120k', growth: '+16%', description: 'Ensure software quality through testing and automation', skills: ['Selenium', 'Jest', 'Automation', 'Testing'], trending: false },
    { id: '8', title: 'Game Developer', category: 'IT', salary: '$70k-$135k', growth: '+14%', description: 'Create interactive gaming experiences', skills: ['Unity', 'C#', 'Unreal Engine', '3D Graphics'], trending: false },
    { id: '9', title: 'Blockchain Developer', category: 'IT', salary: '$100k-$180k', growth: '+30%', description: 'Build decentralized applications and smart contracts', skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'], trending: true },
    { id: '10', title: 'IoT Developer', category: 'IT', salary: '$80k-$145k', growth: '+21%', description: 'Develop Internet of Things solutions', skills: ['Arduino', 'Raspberry Pi', 'MQTT', 'Embedded Systems'], trending: false },
    { id: '11', title: 'API Developer', category: 'IT', salary: '$75k-$135k', growth: '+17%', description: 'Design and build RESTful and GraphQL APIs', skills: ['REST', 'GraphQL', 'API Design', 'Documentation'], trending: false },
    { id: '12', title: 'Database Administrator', category: 'IT', salary: '$70k-$130k', growth: '+12%', description: 'Manage and optimize database systems', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Performance Tuning'], trending: false },
    { id: '13', title: 'Site Reliability Engineer', category: 'IT', salary: '$95k-$165k', growth: '+24%', description: 'Ensure system reliability and uptime', skills: ['Monitoring', 'Incident Response', 'Automation', 'Linux'], trending: true },
    { id: '14', title: 'WordPress Developer', category: 'IT', salary: '$60k-$110k', growth: '+10%', description: 'Build and customize WordPress websites', skills: ['PHP', 'WordPress', 'MySQL', 'JavaScript'], trending: false },
    { id: '15', title: 'Shopify Developer', category: 'IT', salary: '$65k-$120k', growth: '+18%', description: 'Create e-commerce solutions on Shopify', skills: ['Liquid', 'Shopify API', 'JavaScript', 'E-commerce'], trending: false },
    { id: '16', title: 'Python Developer', category: 'IT', salary: '$75k-$140k', growth: '+20%', description: 'Build applications using Python', skills: ['Python', 'Django', 'Flask', 'FastAPI'], trending: true },
    { id: '17', title: 'Java Developer', category: 'IT', salary: '$75k-$135k', growth: '+15%', description: 'Develop enterprise applications with Java', skills: ['Java', 'Spring Boot', 'Hibernate', 'Maven'], trending: false },
    { id: '18', title: '.NET Developer', category: 'IT', salary: '$70k-$130k', growth: '+14%', description: 'Build applications on Microsoft .NET platform', skills: ['C#', '.NET Core', 'ASP.NET', 'Azure'], trending: false },
    { id: '19', title: 'Ruby Developer', category: 'IT', salary: '$70k-$130k', growth: '+12%', description: 'Create web applications with Ruby on Rails', skills: ['Ruby', 'Rails', 'PostgreSQL', 'RSpec'], trending: false },
    { id: '20', title: 'Go Developer', category: 'IT', salary: '$85k-$150k', growth: '+26%', description: 'Build scalable systems with Go', skills: ['Go', 'Microservices', 'gRPC', 'Docker'], trending: true },
    { id: '21', title: 'Rust Developer', category: 'IT', salary: '$90k-$160k', growth: '+28%', description: 'Develop high-performance systems with Rust', skills: ['Rust', 'Systems Programming', 'WebAssembly', 'Performance'], trending: true },
    { id: '22', title: 'Embedded Systems Engineer', category: 'IT', salary: '$75k-$135k', growth: '+16%', description: 'Design software for embedded devices', skills: ['C', 'C++', 'RTOS', 'Hardware'], trending: false },
    { id: '23', title: 'AR/VR Developer', category: 'IT', salary: '$85k-$155k', growth: '+32%', description: 'Create augmented and virtual reality experiences', skills: ['Unity', 'ARKit', 'ARCore', '3D Modeling'], trending: true },
    { id: '24', title: 'Low-Code Developer', category: 'IT', salary: '$65k-$115k', growth: '+22%', description: 'Build applications using low-code platforms', skills: ['OutSystems', 'Mendix', 'PowerApps', 'Workflow'], trending: true },
    { id: '25', title: 'Technical Writer', category: 'IT', salary: '$60k-$105k', growth: '+11%', description: 'Create technical documentation and guides', skills: ['Documentation', 'Markdown', 'API Docs', 'Writing'], trending: false },

    // Data Science & Analytics (20 careers)
    { id: '26', title: 'Data Scientist', category: 'Data Science', salary: '$95k-$165k', growth: '+28%', description: 'Extract insights from complex data using ML and statistics', skills: ['Python', 'Machine Learning', 'Statistics', 'SQL'], trending: true },
    { id: '27', title: 'Machine Learning Engineer', category: 'Data Science', salary: '$100k-$175k', growth: '+30%', description: 'Build and deploy ML models at scale', skills: ['TensorFlow', 'PyTorch', 'MLOps', 'Python'], trending: true },
    { id: '28', title: 'Data Analyst', category: 'Data Science', salary: '$65k-$115k', growth: '+20%', description: 'Analyze data to drive business decisions', skills: ['SQL', 'Excel', 'Tableau', 'Python'], trending: false },
    { id: '29', title: 'Data Engineer', category: 'Data Science', salary: '$90k-$155k', growth: '+25%', description: 'Build data pipelines and infrastructure', skills: ['Spark', 'Airflow', 'SQL', 'Python'], trending: true },
    { id: '30', title: 'Business Intelligence Analyst', category: 'Data Science', salary: '$70k-$125k', growth: '+18%', description: 'Create dashboards and reports for business insights', skills: ['Power BI', 'Tableau', 'SQL', 'DAX'], trending: false },
    { id: '31', title: 'AI Research Scientist', category: 'Data Science', salary: '$120k-$200k', growth: '+35%', description: 'Conduct cutting-edge AI research', skills: ['Deep Learning', 'Research', 'Python', 'Mathematics'], trending: true },
    { id: '32', title: 'NLP Engineer', category: 'Data Science', salary: '$95k-$165k', growth: '+29%', description: 'Build natural language processing systems', skills: ['NLP', 'Transformers', 'Python', 'BERT'], trending: true },
    { id: '33', title: 'Computer Vision Engineer', category: 'Data Science', salary: '$95k-$170k', growth: '+27%', description: 'Develop image and video analysis systems', skills: ['OpenCV', 'CNNs', 'Python', 'Deep Learning'], trending: true },
    { id: '34', title: 'Quantitative Analyst', category: 'Data Science', salary: '$100k-$180k', growth: '+22%', description: 'Apply mathematical models to financial data', skills: ['Statistics', 'Python', 'R', 'Finance'], trending: false },
    { id: '35', title: 'Data Visualization Specialist', category: 'Data Science', salary: '$70k-$125k', growth: '+19%', description: 'Create compelling data visualizations', skills: ['D3.js', 'Tableau', 'Design', 'Storytelling'], trending: false },
    { id: '36', title: 'Big Data Engineer', category: 'Data Science', salary: '$95k-$160k', growth: '+24%', description: 'Work with large-scale distributed data systems', skills: ['Hadoop', 'Spark', 'Kafka', 'Scala'], trending: false },
    { id: '37', title: 'MLOps Engineer', category: 'Data Science', salary: '$100k-$170k', growth: '+31%', description: 'Deploy and monitor ML models in production', skills: ['MLflow', 'Kubeflow', 'Docker', 'Python'], trending: true },
    { id: '38', title: 'Data Architect', category: 'Data Science', salary: '$110k-$185k', growth: '+21%', description: 'Design enterprise data architecture', skills: ['Data Modeling', 'ETL', 'Cloud', 'Architecture'], trending: false },
    { id: '39', title: 'Analytics Consultant', category: 'Data Science', salary: '$80k-$145k', growth: '+17%', description: 'Provide data-driven consulting services', skills: ['Analytics', 'Consulting', 'SQL', 'Communication'], trending: false },
    { id: '40', title: 'Statistician', category: 'Data Science', salary: '$75k-$135k', growth: '+15%', description: 'Apply statistical methods to solve problems', skills: ['Statistics', 'R', 'SAS', 'Mathematics'], trending: false },
    { id: '41', title: 'Research Data Scientist', category: 'Data Science', salary: '$90k-$155k', growth: '+23%', description: 'Conduct research using data science methods', skills: ['Research', 'Statistics', 'Python', 'Publishing'], trending: false },
    { id: '42', title: 'Predictive Modeler', category: 'Data Science', salary: '$85k-$150k', growth: '+20%', description: 'Build predictive models for forecasting', skills: ['Machine Learning', 'Statistics', 'Python', 'Forecasting'], trending: false },
    { id: '43', title: 'Deep Learning Engineer', category: 'Data Science', salary: '$105k-$180k', growth: '+33%', description: 'Develop neural network architectures', skills: ['PyTorch', 'TensorFlow', 'GPUs', 'Python'], trending: true },
    { id: '44', title: 'AI Product Manager', category: 'Data Science', salary: '$110k-$190k', growth: '+26%', description: 'Manage AI product development', skills: ['Product Management', 'AI', 'Strategy', 'Communication'], trending: true },
    { id: '45', title: 'Data Science Manager', category: 'Data Science', salary: '$120k-$200k', growth: '+24%', description: 'Lead data science teams', skills: ['Leadership', 'Data Science', 'Strategy', 'Management'], trending: false },

    // Cloud & Infrastructure (15 careers)
    { id: '46', title: 'Cloud Architect', category: 'Cloud', salary: '$110k-$190k', growth: '+27%', description: 'Design cloud infrastructure solutions', skills: ['AWS', 'Azure', 'GCP', 'Architecture'], trending: true },
    { id: '47', title: 'AWS Solutions Architect', category: 'Cloud', salary: '$105k-$180k', growth: '+26%', description: 'Design and implement AWS solutions', skills: ['AWS', 'EC2', 'S3', 'Lambda'], trending: true },
    { id: '48', title: 'Azure Cloud Engineer', category: 'Cloud', salary: '$95k-$165k', growth: '+25%', description: 'Build and manage Azure infrastructure', skills: ['Azure', 'ARM Templates', 'PowerShell', 'DevOps'], trending: true },
    { id: '49', title: 'GCP Engineer', category: 'Cloud', salary: '$95k-$165k', growth: '+24%', description: 'Develop solutions on Google Cloud Platform', skills: ['GCP', 'BigQuery', 'Kubernetes', 'Terraform'], trending: false },
    { id: '50', title: 'Cloud Security Engineer', category: 'Cloud', salary: '$100k-$175k', growth: '+29%', description: 'Secure cloud infrastructure and applications', skills: ['Cloud Security', 'IAM', 'Compliance', 'Encryption'], trending: true },
    { id: '51', title: 'Kubernetes Administrator', category: 'Cloud', salary: '$95k-$160k', growth: '+28%', description: 'Manage Kubernetes clusters', skills: ['Kubernetes', 'Docker', 'Helm', 'Linux'], trending: true },
    { id: '52', title: 'Terraform Engineer', category: 'Cloud', salary: '$90k-$155k', growth: '+26%', description: 'Automate infrastructure with Terraform', skills: ['Terraform', 'IaC', 'AWS', 'Automation'], trending: true },
    { id: '53', title: 'Cloud Migration Specialist', category: 'Cloud', salary: '$95k-$165k', growth: '+23%', description: 'Lead cloud migration projects', skills: ['Migration', 'Cloud', 'Planning', 'Architecture'], trending: false },
    { id: '54', title: 'Serverless Developer', category: 'Cloud', salary: '$85k-$150k', growth: '+25%', description: 'Build serverless applications', skills: ['Lambda', 'API Gateway', 'DynamoDB', 'Serverless'], trending: true },
    { id: '55', title: 'Cloud Cost Optimizer', category: 'Cloud', salary: '$80k-$140k', growth: '+20%', description: 'Optimize cloud spending and resources', skills: ['FinOps', 'Cost Management', 'Cloud', 'Analytics'], trending: false },
    { id: '56', title: 'Multi-Cloud Engineer', category: 'Cloud', salary: '$100k-$175k', growth: '+27%', description: 'Manage infrastructure across multiple clouds', skills: ['AWS', 'Azure', 'GCP', 'Multi-Cloud'], trending: true },
    { id: '57', title: 'Cloud Network Engineer', category: 'Cloud', salary: '$90k-$155k', growth: '+22%', description: 'Design cloud networking solutions', skills: ['Networking', 'VPC', 'Load Balancing', 'DNS'], trending: false },
    { id: '58', title: 'Cloud Automation Engineer', category: 'Cloud', salary: '$95k-$160k', growth: '+24%', description: 'Automate cloud operations', skills: ['Automation', 'Python', 'Ansible', 'Cloud'], trending: false },
    { id: '59', title: 'Cloud Compliance Specialist', category: 'Cloud', salary: '$85k-$145k', growth: '+21%', description: 'Ensure cloud compliance and governance', skills: ['Compliance', 'Security', 'Auditing', 'Cloud'], trending: false },
    { id: '60', title: 'Cloud Support Engineer', category: 'Cloud', salary: '$70k-$120k', growth: '+18%', description: 'Provide technical support for cloud services', skills: ['Troubleshooting', 'Cloud', 'Support', 'Networking'], trending: false },

    // Cybersecurity (15 careers)
    { id: '61', title: 'Cybersecurity Analyst', category: 'Cybersecurity', salary: '$75k-$135k', growth: '+31%', description: 'Monitor and protect against cyber threats', skills: ['Security', 'SIEM', 'Incident Response', 'Networking'], trending: true },
    { id: '62', title: 'Penetration Tester', category: 'Cybersecurity', salary: '$85k-$150k', growth: '+28%', description: 'Test systems for security vulnerabilities', skills: ['Ethical Hacking', 'Kali Linux', 'Metasploit', 'Security'], trending: true },
    { id: '63', title: 'Security Engineer', category: 'Cybersecurity', salary: '$90k-$160k', growth: '+30%', description: 'Build and maintain security systems', skills: ['Security Architecture', 'Firewalls', 'IDS/IPS', 'Encryption'], trending: true },
    { id: '64', title: 'SOC Analyst', category: 'Cybersecurity', salary: '$70k-$125k', growth: '+27%', description: 'Monitor security operations center', skills: ['SIEM', 'Log Analysis', 'Threat Detection', 'Incident Response'], trending: true },
    { id: '65', title: 'Threat Intelligence Analyst', category: 'Cybersecurity', salary: '$80k-$145k', growth: '+26%', description: 'Analyze cyber threat intelligence', skills: ['Threat Intelligence', 'OSINT', 'Analysis', 'Security'], trending: false },
    { id: '66', title: 'Security Architect', category: 'Cybersecurity', salary: '$110k-$190k', growth: '+25%', description: 'Design enterprise security architecture', skills: ['Security Design', 'Architecture', 'Compliance', 'Risk'], trending: false },
    { id: '67', title: 'Incident Response Specialist', category: 'Cybersecurity', salary: '$85k-$150k', growth: '+29%', description: 'Handle security incidents and breaches', skills: ['Incident Response', 'Forensics', 'Malware Analysis', 'Recovery'], trending: true },
    { id: '68', title: 'Application Security Engineer', category: 'Cybersecurity', salary: '$90k-$155k', growth: '+27%', description: 'Secure software applications', skills: ['AppSec', 'OWASP', 'Code Review', 'SAST/DAST'], trending: true },
    { id: '69', title: 'Malware Analyst', category: 'Cybersecurity', salary: '$85k-$150k', growth: '+24%', description: 'Analyze and reverse engineer malware', skills: ['Malware Analysis', 'Reverse Engineering', 'Assembly', 'Forensics'], trending: false },
    { id: '70', title: 'Cryptographer', category: 'Cybersecurity', salary: '$95k-$170k', growth: '+22%', description: 'Design cryptographic systems', skills: ['Cryptography', 'Mathematics', 'Algorithms', 'Security'], trending: false },
    { id: '71', title: 'Security Compliance Analyst', category: 'Cybersecurity', salary: '$75k-$130k', growth: '+23%', description: 'Ensure security compliance standards', skills: ['Compliance', 'Auditing', 'ISO 27001', 'GDPR'], trending: false },
    { id: '72', title: 'Vulnerability Researcher', category: 'Cybersecurity', salary: '$90k-$160k', growth: '+26%', description: 'Discover and report security vulnerabilities', skills: ['Vulnerability Research', 'Exploit Development', 'Bug Bounty', 'Security'], trending: true },
    { id: '73', title: 'Identity & Access Manager', category: 'Cybersecurity', salary: '$80k-$140k', growth: '+24%', description: 'Manage identity and access systems', skills: ['IAM', 'Active Directory', 'SSO', 'MFA'], trending: false },
    { id: '74', title: 'Network Security Engineer', category: 'Cybersecurity', salary: '$85k-$145k', growth: '+25%', description: 'Secure network infrastructure', skills: ['Network Security', 'Firewalls', 'VPN', 'IDS'], trending: false },
    { id: '75', title: 'CISO', category: 'Cybersecurity', salary: '$150k-$250k', growth: '+20%', description: 'Lead enterprise security strategy', skills: ['Leadership', 'Strategy', 'Risk Management', 'Compliance'], trending: false },

    // Management & Business (10 careers)
    { id: '76', title: 'Product Manager', category: 'Management', salary: '$95k-$165k', growth: '+22%', description: 'Define and drive product strategy', skills: ['Product Strategy', 'Roadmapping', 'Analytics', 'Communication'], trending: true },
    { id: '77', title: 'Project Manager', category: 'Management', salary: '$75k-$135k', growth: '+18%', description: 'Lead and deliver projects successfully', skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'], trending: false },
    { id: '78', title: 'Scrum Master', category: 'Management', salary: '$70k-$125k', growth: '+20%', description: 'Facilitate agile development processes', skills: ['Scrum', 'Agile', 'Facilitation', 'Coaching'], trending: false },
    { id: '79', title: 'Business Analyst', category: 'Management', salary: '$70k-$120k', growth: '+17%', description: 'Bridge business and technology needs', skills: ['Requirements', 'Analysis', 'Documentation', 'Communication'], trending: false },
    { id: '80', title: 'Engineering Manager', category: 'Management', salary: '$120k-$200k', growth: '+19%', description: 'Lead engineering teams', skills: ['Leadership', 'Technical', 'People Management', 'Strategy'], trending: false },
    { id: '81', title: 'Technical Program Manager', category: 'Management', salary: '$110k-$185k', growth: '+21%', description: 'Manage complex technical programs', skills: ['Program Management', 'Technical', 'Cross-functional', 'Strategy'], trending: true },
    { id: '82', title: 'Agile Coach', category: 'Management', salary: '$85k-$150k', growth: '+23%', description: 'Guide organizations in agile transformation', skills: ['Agile', 'Coaching', 'Change Management', 'Training'], trending: false },
    { id: '83', title: 'Delivery Manager', category: 'Management', salary: '$80k-$140k', growth: '+16%', description: 'Ensure successful project delivery', skills: ['Delivery', 'Stakeholder Management', 'Agile', 'Leadership'], trending: false },
    { id: '84', title: 'Operations Manager', category: 'Management', salary: '$75k-$130k', growth: '+15%', description: 'Optimize business operations', skills: ['Operations', 'Process Improvement', 'Analytics', 'Management'], trending: false },
    { id: '85', title: 'Strategy Consultant', category: 'Management', salary: '$100k-$180k', growth: '+19%', description: 'Provide strategic business advice', skills: ['Strategy', 'Consulting', 'Analysis', 'Communication'], trending: false },

    // Creative & Design (10 careers)
    { id: '86', title: 'UX Designer', category: 'Creative', salary: '$75k-$135k', growth: '+24%', description: 'Design user experiences for digital products', skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'], trending: true },
    { id: '87', title: 'UI Designer', category: 'Creative', salary: '$70k-$125k', growth: '+22%', description: 'Create visual interfaces for applications', skills: ['UI Design', 'Figma', 'Adobe XD', 'Visual Design'], trending: true },
    { id: '88', title: 'Product Designer', category: 'Creative', salary: '$80k-$145k', growth: '+25%', description: 'Design end-to-end product experiences', skills: ['Product Design', 'UX/UI', 'Prototyping', 'Research'], trending: true },
    { id: '89', title: 'Graphic Designer', category: 'Creative', salary: '$50k-$95k', growth: '+14%', description: 'Create visual content and branding', skills: ['Graphic Design', 'Photoshop', 'Illustrator', 'Branding'], trending: false },
    { id: '90', title: 'Motion Designer', category: 'Creative', salary: '$65k-$115k', growth: '+20%', description: 'Create animated graphics and videos', skills: ['After Effects', 'Animation', 'Motion Graphics', 'Video'], trending: false },
    { id: '91', title: '3D Artist', category: 'Creative', salary: '$60k-$110k', growth: '+18%', description: 'Create 3D models and animations', skills: ['Blender', 'Maya', '3D Modeling', 'Texturing'], trending: false },
    { id: '92', title: 'Brand Designer', category: 'Creative', salary: '$65k-$120k', growth: '+16%', description: 'Develop brand identity and guidelines', skills: ['Branding', 'Identity Design', 'Typography', 'Color Theory'], trending: false },
    { id: '93', title: 'Interaction Designer', category: 'Creative', salary: '$75k-$130k', growth: '+21%', description: 'Design interactive digital experiences', skills: ['Interaction Design', 'Prototyping', 'Animation', 'UX'], trending: false },
    { id: '94', title: 'Design Systems Designer', category: 'Creative', salary: '$85k-$145k', growth: '+26%', description: 'Build and maintain design systems', skills: ['Design Systems', 'Component Libraries', 'Figma', 'Documentation'], trending: true },
    { id: '95', title: 'Content Designer', category: 'Creative', salary: '$70k-$120k', growth: '+19%', description: 'Create user-centered content', skills: ['Content Strategy', 'UX Writing', 'Copywriting', 'Research'], trending: false },

    // Finance & Analytics (5 careers)
    { id: '96', title: 'Financial Analyst', category: 'Finance', salary: '$65k-$115k', growth: '+15%', description: 'Analyze financial data and trends', skills: ['Financial Analysis', 'Excel', 'Modeling', 'Reporting'], trending: false },
    { id: '97', title: 'Risk Analyst', category: 'Finance', salary: '$70k-$125k', growth: '+17%', description: 'Assess and manage financial risks', skills: ['Risk Management', 'Analysis', 'Compliance', 'Modeling'], trending: false },
    { id: '98', title: 'Investment Analyst', category: 'Finance', salary: '$75k-$135k', growth: '+16%', description: 'Research and recommend investments', skills: ['Investment Analysis', 'Financial Modeling', 'Research', 'Excel'], trending: false },
    { id: '99', title: 'Fintech Developer', category: 'Finance', salary: '$85k-$150k', growth: '+28%', description: 'Build financial technology solutions', skills: ['Python', 'Finance', 'APIs', 'Blockchain'], trending: true },
    { id: '100', title: 'Blockchain Analyst', category: 'Finance', salary: '$80k-$145k', growth: '+32%', description: 'Analyze blockchain and crypto markets', skills: ['Blockchain', 'Crypto', 'Analysis', 'DeFi'], trending: true },

    // Healthcare IT (5 careers)
    { id: '101', title: 'Healthcare Data Analyst', category: 'Healthcare', salary: '$70k-$120k', growth: '+23%', description: 'Analyze healthcare data for insights', skills: ['Healthcare Analytics', 'SQL', 'Tableau', 'HIPAA'], trending: false },
    { id: '102', title: 'Medical Software Developer', category: 'Healthcare', salary: '$80k-$140k', growth: '+21%', description: 'Develop healthcare software solutions', skills: ['Healthcare IT', 'FHIR', 'HL7', 'Compliance'], trending: false },
    { id: '103', title: 'Health Informatics Specialist', category: 'Healthcare', salary: '$75k-$130k', growth: '+22%', description: 'Manage healthcare information systems', skills: ['Health Informatics', 'EHR', 'Data Management', 'HIPAA'], trending: false },
    { id: '104', title: 'Telemedicine Developer', category: 'Healthcare', salary: '$85k-$145k', growth: '+30%', description: 'Build telehealth platforms', skills: ['Web Development', 'Video Streaming', 'Healthcare', 'Security'], trending: true },
    { id: '105', title: 'Clinical Data Manager', category: 'Healthcare', salary: '$70k-$125k', growth: '+19%', description: 'Manage clinical trial data', skills: ['Clinical Data', 'EDC Systems', 'Compliance', 'Analysis'], trending: false },
];

export const categories = [
    'All',
    'IT',
    'Data Science',
    'Cloud',
    'Cybersecurity',
    'Management',
    'Creative',
    'Finance',
    'Healthcare'
];
