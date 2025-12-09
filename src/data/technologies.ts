export type Technology = {
    id: string;
    name: string;
    category: string;
    description: string;
    growth: string;
    useCases: string[];
    trending: boolean;
};

export const technologies: Technology[] = [
    { id: '1', name: 'Artificial Intelligence', category: 'AI/ML', description: 'Machine learning and neural networks transforming industries', growth: '+45%', useCases: ['Automation', 'Prediction', 'NLP', 'Computer Vision'], trending: true },
    { id: '2', name: 'Kubernetes', category: 'Cloud', description: 'Container orchestration platform for cloud-native apps', growth: '+38%', useCases: ['Container Management', 'Scaling', 'Deployment', 'Microservices'], trending: true },
    { id: '3', name: 'Blockchain', category: 'Web3', description: 'Decentralized ledger technology for secure transactions', growth: '+35%', useCases: ['Cryptocurrency', 'Smart Contracts', 'Supply Chain', 'DeFi'], trending: true },
    { id: '4', name: 'Edge Computing', category: 'Cloud', description: 'Processing data closer to the source for faster response', growth: '+42%', useCases: ['IoT', 'Real-time Processing', 'Low Latency', '5G'], trending: true },
    { id: '5', name: 'Quantum Computing', category: 'Computing', description: 'Next-generation computing using quantum mechanics', growth: '+50%', useCases: ['Cryptography', 'Drug Discovery', 'Optimization', 'AI'], trending: true },
    { id: '6', name: 'Serverless Architecture', category: 'Cloud', description: 'Run code without managing servers', growth: '+32%', useCases: ['APIs', 'Event Processing', 'Microservices', 'Cost Optimization'], trending: true },
    { id: '7', name: '5G Technology', category: 'Networking', description: 'Next-gen mobile network with ultra-fast speeds', growth: '+40%', useCases: ['IoT', 'AR/VR', 'Autonomous Vehicles', 'Smart Cities'], trending: true },
    { id: '8', name: 'AR/VR', category: 'Immersive Tech', description: 'Augmented and virtual reality experiences', growth: '+36%', useCases: ['Gaming', 'Training', 'Retail', 'Healthcare'], trending: true },
    { id: '9', name: 'Cybersecurity Mesh', category: 'Security', description: 'Distributed security architecture', growth: '+33%', useCases: ['Zero Trust', 'Identity Management', 'Threat Detection', 'Cloud Security'], trending: true },
    { id: '10', name: 'Low-Code/No-Code', category: 'Development', description: 'Build applications with minimal coding', growth: '+44%', useCases: ['Rapid Development', 'Citizen Developers', 'Automation', 'Prototyping'], trending: true },
    { id: '11', name: 'GraphQL', category: 'API', description: 'Query language for APIs', growth: '+28%', useCases: ['API Development', 'Data Fetching', 'Mobile Apps', 'Microservices'], trending: true },
    { id: '12', name: 'WebAssembly', category: 'Web', description: 'Run high-performance code in browsers', growth: '+30%', useCases: ['Web Apps', 'Gaming', 'Video Editing', 'CAD'], trending: true },
    { id: '13', name: 'Rust Programming', category: 'Programming', description: 'Systems programming language focused on safety', growth: '+41%', useCases: ['Systems Programming', 'WebAssembly', 'Blockchain', 'Performance'], trending: true },
    { id: '14', name: 'JAMstack', category: 'Web', description: 'Modern web development architecture', growth: '+26%', useCases: ['Static Sites', 'Performance', 'Security', 'Scalability'], trending: false },
    { id: '15', name: 'MLOps', category: 'AI/ML', description: 'DevOps practices for machine learning', growth: '+39%', useCases: ['Model Deployment', 'Monitoring', 'Automation', 'Versioning'], trending: true },
    { id: '16', name: 'DataOps', category: 'Data', description: 'Agile approach to data analytics', growth: '+31%', useCases: ['Data Pipelines', 'Quality', 'Collaboration', 'Automation'], trending: false },
    { id: '17', name: 'Micro Frontends', category: 'Frontend', description: 'Architectural style for frontend development', growth: '+25%', useCases: ['Large Apps', 'Team Autonomy', 'Scalability', 'Technology Diversity'], trending: false },
    { id: '18', name: 'Progressive Web Apps', category: 'Web', description: 'Web apps with native-like experience', growth: '+22%', useCases: ['Mobile Web', 'Offline Support', 'Push Notifications', 'Performance'], trending: false },
    { id: '19', name: 'Terraform', category: 'DevOps', description: 'Infrastructure as code tool', growth: '+34%', useCases: ['Cloud Infrastructure', 'Automation', 'Multi-Cloud', 'Version Control'], trending: true },
    { id: '20', name: 'Deno', category: 'Runtime', description: 'Secure runtime for JavaScript and TypeScript', growth: '+27%', useCases: ['Backend Development', 'Security', 'TypeScript', 'Modern APIs'], trending: false }
];

export const techCategories = ['All', 'AI/ML', 'Cloud', 'Web3', 'Security', 'Development', 'Web', 'Data'];
