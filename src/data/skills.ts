export type Skill = {
    id: string;
    name: string;
    category: string;
    demand: 'High' | 'Medium' | 'Low';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    trending: boolean;
};

export const skills: Skill[] = [
    // Programming Languages (20)
    { id: '1', name: 'JavaScript', category: 'Programming', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '2', name: 'Python', category: 'Programming', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '3', name: 'Java', category: 'Programming', demand: 'High', difficulty: 'Intermediate', trending: false },
    { id: '4', name: 'TypeScript', category: 'Programming', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '5', name: 'C++', category: 'Programming', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '6', name: 'C#', category: 'Programming', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '7', name: 'Go', category: 'Programming', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '8', name: 'Rust', category: 'Programming', demand: 'Medium', difficulty: 'Advanced', trending: true },
    { id: '9', name: 'PHP', category: 'Programming', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '10', name: 'Ruby', category: 'Programming', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '11', name: 'Swift', category: 'Programming', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '12', name: 'Kotlin', category: 'Programming', demand: 'Medium', difficulty: 'Intermediate', trending: true },
    { id: '13', name: 'Scala', category: 'Programming', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '14', name: 'R', category: 'Programming', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '15', name: 'Dart', category: 'Programming', demand: 'Medium', difficulty: 'Beginner', trending: true },
    { id: '16', name: 'Elixir', category: 'Programming', demand: 'Low', difficulty: 'Advanced', trending: false },
    { id: '17', name: 'Haskell', category: 'Programming', demand: 'Low', difficulty: 'Advanced', trending: false },
    { id: '18', name: 'Perl', category: 'Programming', demand: 'Low', difficulty: 'Intermediate', trending: false },
    { id: '19', name: 'Lua', category: 'Programming', demand: 'Low', difficulty: 'Beginner', trending: false },
    { id: '20', name: 'Julia', category: 'Programming', demand: 'Low', difficulty: 'Intermediate', trending: false },

    // Frontend (15)
    { id: '21', name: 'React', category: 'Frontend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '22', name: 'Vue.js', category: 'Frontend', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '23', name: 'Angular', category: 'Frontend', demand: 'High', difficulty: 'Advanced', trending: false },
    { id: '24', name: 'Next.js', category: 'Frontend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '25', name: 'HTML5', category: 'Frontend', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '26', name: 'CSS3', category: 'Frontend', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '27', name: 'Tailwind CSS', category: 'Frontend', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '28', name: 'Sass/SCSS', category: 'Frontend', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '29', name: 'Svelte', category: 'Frontend', demand: 'Medium', difficulty: 'Intermediate', trending: true },
    { id: '30', name: 'Redux', category: 'Frontend', demand: 'High', difficulty: 'Intermediate', trending: false },
    { id: '31', name: 'Webpack', category: 'Frontend', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '32', name: 'Vite', category: 'Frontend', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '33', name: 'jQuery', category: 'Frontend', demand: 'Low', difficulty: 'Beginner', trending: false },
    { id: '34', name: 'Bootstrap', category: 'Frontend', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '35', name: 'Material-UI', category: 'Frontend', demand: 'Medium', difficulty: 'Beginner', trending: false },

    // Backend (15)
    { id: '36', name: 'Node.js', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '37', name: 'Express.js', category: 'Backend', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '38', name: 'Django', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: false },
    { id: '39', name: 'Flask', category: 'Backend', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '40', name: 'FastAPI', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '41', name: 'Spring Boot', category: 'Backend', demand: 'High', difficulty: 'Advanced', trending: false },
    { id: '42', name: 'ASP.NET Core', category: 'Backend', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '43', name: 'Ruby on Rails', category: 'Backend', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '44', name: 'Laravel', category: 'Backend', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '45', name: 'NestJS', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '46', name: 'GraphQL', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '47', name: 'REST API', category: 'Backend', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '48', name: 'gRPC', category: 'Backend', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '49', name: 'Microservices', category: 'Backend', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '50', name: 'Serverless', category: 'Backend', demand: 'High', difficulty: 'Intermediate', trending: true },

    // Database (12)
    { id: '51', name: 'SQL', category: 'Database', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '52', name: 'PostgreSQL', category: 'Database', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '53', name: 'MySQL', category: 'Database', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '54', name: 'MongoDB', category: 'Database', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '55', name: 'Redis', category: 'Database', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '56', name: 'Elasticsearch', category: 'Database', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '57', name: 'Cassandra', category: 'Database', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '58', name: 'DynamoDB', category: 'Database', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '59', name: 'Firebase', category: 'Database', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '60', name: 'Oracle DB', category: 'Database', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '61', name: 'MS SQL Server', category: 'Database', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '62', name: 'Neo4j', category: 'Database', demand: 'Low', difficulty: 'Advanced', trending: false },

    // Cloud & DevOps (15)
    { id: '63', name: 'AWS', category: 'Cloud', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '64', name: 'Azure', category: 'Cloud', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '65', name: 'Google Cloud', category: 'Cloud', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '66', name: 'Docker', category: 'DevOps', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '67', name: 'Kubernetes', category: 'DevOps', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '68', name: 'Terraform', category: 'DevOps', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '69', name: 'Jenkins', category: 'DevOps', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '70', name: 'GitLab CI/CD', category: 'DevOps', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '71', name: 'GitHub Actions', category: 'DevOps', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '72', name: 'Ansible', category: 'DevOps', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '73', name: 'Prometheus', category: 'DevOps', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '74', name: 'Grafana', category: 'DevOps', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '75', name: 'ELK Stack', category: 'DevOps', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '76', name: 'Nginx', category: 'DevOps', demand: 'Medium', difficulty: 'Intermediate', trending: false },
    { id: '77', name: 'Linux', category: 'DevOps', demand: 'High', difficulty: 'Intermediate', trending: false },

    // Data Science & AI (15)
    { id: '78', name: 'Machine Learning', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '79', name: 'Deep Learning', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '80', name: 'TensorFlow', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '81', name: 'PyTorch', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '82', name: 'Scikit-learn', category: 'AI/ML', demand: 'High', difficulty: 'Intermediate', trending: false },
    { id: '83', name: 'NLP', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '84', name: 'Computer Vision', category: 'AI/ML', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '85', name: 'Pandas', category: 'Data Science', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '86', name: 'NumPy', category: 'Data Science', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '87', name: 'Matplotlib', category: 'Data Science', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '88', name: 'Tableau', category: 'Data Science', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '89', name: 'Power BI', category: 'Data Science', demand: 'High', difficulty: 'Beginner', trending: false },
    { id: '90', name: 'Apache Spark', category: 'Data Science', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '91', name: 'Hadoop', category: 'Data Science', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '92', name: 'Airflow', category: 'Data Science', demand: 'Medium', difficulty: 'Intermediate', trending: false },

    // Mobile Development (8)
    { id: '93', name: 'React Native', category: 'Mobile', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '94', name: 'Flutter', category: 'Mobile', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '95', name: 'iOS Development', category: 'Mobile', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '96', name: 'Android Development', category: 'Mobile', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '97', name: 'SwiftUI', category: 'Mobile', demand: 'Medium', difficulty: 'Intermediate', trending: true },
    { id: '98', name: 'Jetpack Compose', category: 'Mobile', demand: 'Medium', difficulty: 'Intermediate', trending: true },
    { id: '99', name: 'Xamarin', category: 'Mobile', demand: 'Low', difficulty: 'Intermediate', trending: false },
    { id: '100', name: 'Ionic', category: 'Mobile', demand: 'Low', difficulty: 'Beginner', trending: false },

    // Security (10)
    { id: '101', name: 'Cybersecurity', category: 'Security', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '102', name: 'Penetration Testing', category: 'Security', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '103', name: 'Ethical Hacking', category: 'Security', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '104', name: 'Network Security', category: 'Security', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '105', name: 'Cryptography', category: 'Security', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '106', name: 'OWASP', category: 'Security', demand: 'High', difficulty: 'Intermediate', trending: false },
    { id: '107', name: 'Security Auditing', category: 'Security', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '108', name: 'Incident Response', category: 'Security', demand: 'High', difficulty: 'Advanced', trending: true },
    { id: '109', name: 'Malware Analysis', category: 'Security', demand: 'Medium', difficulty: 'Advanced', trending: false },
    { id: '110', name: 'Cloud Security', category: 'Security', demand: 'High', difficulty: 'Advanced', trending: true },

    // Design (5)
    { id: '111', name: 'UI/UX Design', category: 'Design', demand: 'High', difficulty: 'Intermediate', trending: true },
    { id: '112', name: 'Figma', category: 'Design', demand: 'High', difficulty: 'Beginner', trending: true },
    { id: '113', name: 'Adobe XD', category: 'Design', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '114', name: 'Sketch', category: 'Design', demand: 'Medium', difficulty: 'Beginner', trending: false },
    { id: '115', name: 'Prototyping', category: 'Design', demand: 'High', difficulty: 'Intermediate', trending: false },
];

export const skillCategories = [
    'All',
    'Programming',
    'Frontend',
    'Backend',
    'Database',
    'Cloud',
    'DevOps',
    'AI/ML',
    'Data Science',
    'Mobile',
    'Security',
    'Design'
];
