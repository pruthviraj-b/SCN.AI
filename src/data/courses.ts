export type Course = {
    id: string;
    title: string;
    platform: string;
    category: string;
    rating: number;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    price: string;
    url: string;
};

export const courses: Course[] = [
    // Coursera (15)
    { id: '1', title: 'Machine Learning Specialization', platform: 'Coursera', category: 'AI/ML', rating: 4.9, duration: '3 months', level: 'Intermediate', price: '₹49/month', url: 'coursera.org/specializations/machine-learning' },
    { id: '2', title: 'Google Data Analytics Professional Certificate', platform: 'Coursera', category: 'Data Science', rating: 4.8, duration: '6 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/google-data-analytics' },
    { id: '3', title: 'IBM Data Science Professional Certificate', platform: 'Coursera', category: 'Data Science', rating: 4.6, duration: '5 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/ibm-data-science' },
    { id: '4', title: 'Deep Learning Specialization', platform: 'Coursera', category: 'AI/ML', rating: 4.9, duration: '4 months', level: 'Advanced', price: '₹49/month', url: 'coursera.org/specializations/deep-learning' },
    { id: '5', title: 'Google Cloud Professional Certificate', platform: 'Coursera', category: 'Cloud', rating: 4.7, duration: '4 months', level: 'Intermediate', price: '₹49/month', url: 'coursera.org/professional-certificates/cloud-engineering-gcp' },
    { id: '6', title: 'Full Stack Web Development', platform: 'Coursera', category: 'Web Development', rating: 4.6, duration: '4 months', level: 'Intermediate', price: '₹49/month', url: 'coursera.org/specializations/full-stack-react' },
    { id: '7', title: 'Python for Everybody Specialization', platform: 'Coursera', category: 'Programming', rating: 4.8, duration: '8 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/specializations/python' },
    { id: '8', title: 'AWS Fundamentals Specialization', platform: 'Coursera', category: 'Cloud', rating: 4.6, duration: '3 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/specializations/aws-fundamentals' },
    { id: '9', title: 'Cybersecurity Specialization', platform: 'Coursera', category: 'Security', rating: 4.7, duration: '6 months', level: 'Intermediate', price: '₹49/month', url: 'coursera.org/specializations/cyber-security' },
    { id: '10', title: 'Google UX Design Professional Certificate', platform: 'Coursera', category: 'Design', rating: 4.8, duration: '6 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/google-ux-design' },
    { id: '11', title: 'Meta Front-End Developer', platform: 'Coursera', category: 'Web Development', rating: 4.7, duration: '7 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/meta-front-end-developer' },
    { id: '12', title: 'Meta Back-End Developer', platform: 'Coursera', category: 'Web Development', rating: 4.6, duration: '8 months', level: 'Intermediate', price: '₹49/month', url: 'coursera.org/professional-certificates/meta-back-end-developer' },
    { id: '13', title: 'Google IT Support Professional Certificate', platform: 'Coursera', category: 'IT', rating: 4.8, duration: '6 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/google-it-support' },
    { id: '14', title: 'IBM Cybersecurity Analyst', platform: 'Coursera', category: 'Security', rating: 4.6, duration: '8 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/ibm-cybersecurity-analyst' },
    { id: '15', title: 'Google Project Management Certificate', platform: 'Coursera', category: 'Management', rating: 4.8, duration: '6 months', level: 'Beginner', price: '₹49/month', url: 'coursera.org/professional-certificates/google-project-management' },

    // Udemy (15)
    { id: '16', title: 'The Complete Web Developer Bootcamp', platform: 'Udemy', category: 'Web Development', rating: 4.7, duration: '65 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/the-complete-web-development-bootcamp' },
    { id: '17', title: 'React - The Complete Guide', platform: 'Udemy', category: 'Frontend', rating: 4.6, duration: '48 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/react-the-complete-guide' },
    { id: '18', title: 'Python for Data Science and Machine Learning', platform: 'Udemy', category: 'Data Science', rating: 4.6, duration: '25 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/python-for-data-science-and-machine-learning-bootcamp' },
    { id: '19', title: 'AWS Certified Solutions Architect', platform: 'Udemy', category: 'Cloud', rating: 4.7, duration: '24 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/aws-certified-solutions-architect-associate' },
    { id: '20', title: 'Complete Ethical Hacking Bootcamp', platform: 'Udemy', category: 'Security', rating: 4.6, duration: '16 hours', level: 'Advanced', price: '₹84.99', url: 'udemy.com/course/complete-ethical-hacking-bootcamp-zero-to-mastery' },
    { id: '21', title: 'Docker and Kubernetes Complete Guide', platform: 'Udemy', category: 'DevOps', rating: 4.6, duration: '22 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/docker-and-kubernetes-the-complete-guide' },
    { id: '22', title: 'Node.js Developer Course', platform: 'Udemy', category: 'Backend', rating: 4.7, duration: '35 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/the-complete-nodejs-developer-course' },
    { id: '23', title: 'iOS & Swift Complete Developer', platform: 'Udemy', category: 'Mobile', rating: 4.6, duration: '60 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/ios-13-app-development-bootcamp' },
    { id: '24', title: 'Complete SQL Bootcamp', platform: 'Udemy', category: 'Database', rating: 4.6, duration: '9 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/the-complete-sql-bootcamp' },
    { id: '25', title: 'UI/UX Design Bootcamp', platform: 'Udemy', category: 'Design', rating: 4.5, duration: '12 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/ui-ux-design-bootcamp' },
    { id: '26', title: 'Complete Java Masterclass', platform: 'Udemy', category: 'Programming', rating: 4.6, duration: '80 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/java-the-complete-java-developer-course' },
    { id: '27', title: 'Flutter & Dart Complete Guide', platform: 'Udemy', category: 'Mobile', rating: 4.6, duration: '42 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/learn-flutter-dart-to-build-ios-android-apps' },
    { id: '28', title: 'Blockchain A-Z', platform: 'Udemy', category: 'Blockchain', rating: 4.5, duration: '14 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/build-your-blockchain-az' },
    { id: '29', title: 'Complete C++ Developer', platform: 'Udemy', category: 'Programming', rating: 4.6, duration: '40 hours', level: 'Intermediate', price: '₹84.99', url: 'udemy.com/course/beginning-c-plus-plus-programming' },
    { id: '30', title: 'DevOps Beginners to Advanced', platform: 'Udemy', category: 'DevOps', rating: 4.5, duration: '18 hours', level: 'Beginner', price: '₹84.99', url: 'udemy.com/course/decodingdevops' },

    // LinkedIn Learning (10)
    { id: '31', title: 'Become a Software Developer', platform: 'LinkedIn Learning', category: 'Programming', rating: 4.7, duration: '30 hours', level: 'Beginner', price: '₹39.99/month', url: 'linkedin.com/learning/paths/become-a-software-developer' },
    { id: '32', title: 'Master Cloud Computing', platform: 'LinkedIn Learning', category: 'Cloud', rating: 4.6, duration: '25 hours', level: 'Intermediate', price: '₹39.99/month', url: 'linkedin.com/learning/paths/master-cloud-computing' },
    { id: '33', title: 'Become a Data Analyst', platform: 'LinkedIn Learning', category: 'Data Science', rating: 4.7, duration: '28 hours', level: 'Beginner', price: '₹39.99/month', url: 'linkedin.com/learning/paths/become-a-data-analyst' },
    { id: '34', title: 'Advance as a Cybersecurity Professional', platform: 'LinkedIn Learning', category: 'Security', rating: 4.6, duration: '22 hours', level: 'Advanced', price: '₹39.99/month', url: 'linkedin.com/learning/paths/advance-as-a-cybersecurity-professional' },
    { id: '35', title: 'Become a UX Designer', platform: 'LinkedIn Learning', category: 'Design', rating: 4.7, duration: '24 hours', level: 'Beginner', price: '₹39.99/month', url: 'linkedin.com/learning/paths/become-a-user-experience-designer' },
    { id: '36', title: 'Become a Project Manager', platform: 'LinkedIn Learning', category: 'Management', rating: 4.6, duration: '20 hours', level: 'Beginner', price: '₹39.99/month', url: 'linkedin.com/learning/paths/become-a-project-manager' },
    { id: '37', title: 'Master Python for Data Science', platform: 'LinkedIn Learning', category: 'Data Science', rating: 4.7, duration: '26 hours', level: 'Intermediate', price: '₹39.99/month', url: 'linkedin.com/learning/paths/master-python-for-data-science' },
    { id: '38', title: 'Become a Full-Stack Web Developer', platform: 'LinkedIn Learning', category: 'Web Development', rating: 4.6, duration: '32 hours', level: 'Intermediate', price: '₹39.99/month', url: 'linkedin.com/learning/paths/become-a-full-stack-web-developer' },
    { id: '39', title: 'Advance as a DevOps Engineer', platform: 'LinkedIn Learning', category: 'DevOps', rating: 4.6, duration: '24 hours', level: 'Advanced', price: '₹39.99/month', url: 'linkedin.com/learning/paths/advance-as-a-devops-engineer' },
    { id: '40', title: 'Master Machine Learning', platform: 'LinkedIn Learning', category: 'AI/ML', rating: 4.7, duration: '28 hours', level: 'Advanced', price: '₹39.99/month', url: 'linkedin.com/learning/paths/master-machine-learning' },

    // edX (10)
    { id: '41', title: 'CS50: Introduction to Computer Science', platform: 'edX', category: 'Programming', rating: 4.9, duration: '12 weeks', level: 'Beginner', price: 'Free', url: 'edx.org/course/cs50s-introduction-to-computer-science' },
    { id: '42', title: 'MicroMasters in Data Science', platform: 'edX', category: 'Data Science', rating: 4.7, duration: '1 year', level: 'Advanced', price: '₹1,350', url: 'edx.org/micromasters/uc-san-diegox-data-science' },
    { id: '43', title: 'Professional Certificate in Cloud Computing', platform: 'edX', category: 'Cloud', rating: 4.6, duration: '6 months', level: 'Intermediate', price: '₹536', url: 'edx.org/professional-certificate/microsoft-azure-fundamentals' },
    { id: '44', title: 'Cybersecurity Fundamentals', platform: 'edX', category: 'Security', rating: 4.6, duration: '8 weeks', level: 'Beginner', price: 'Free', url: 'edx.org/course/cybersecurity-fundamentals' },
    { id: '45', title: 'Artificial Intelligence', platform: 'edX', category: 'AI/ML', rating: 4.8, duration: '12 weeks', level: 'Advanced', price: 'Free', url: 'edx.org/course/artificial-intelligence-ai' },
    { id: '46', title: 'Full Stack Development', platform: 'edX', category: 'Web Development', rating: 4.6, duration: '9 months', level: 'Intermediate', price: '₹895', url: 'edx.org/professional-certificate/ibm-full-stack-cloud-developer' },
    { id: '47', title: 'Python for Data Science', platform: 'edX', category: 'Programming', rating: 4.7, duration: '10 weeks', level: 'Beginner', price: 'Free', url: 'edx.org/course/python-for-data-science' },
    { id: '48', title: 'Blockchain Fundamentals', platform: 'edX', category: 'Blockchain', rating: 4.5, duration: '6 weeks', level: 'Beginner', price: 'Free', url: 'edx.org/course/blockchain-fundamentals' },
    { id: '49', title: 'DevOps and Software Engineering', platform: 'edX', category: 'DevOps', rating: 4.6, duration: '6 months', level: 'Intermediate', price: '₹536', url: 'edx.org/professional-certificate/ibm-devops-and-software-engineering' },
    { id: '50', title: 'UX Research and Design', platform: 'edX', category: 'Design', rating: 4.6, duration: '5 months', level: 'Beginner', price: '₹447', url: 'edx.org/professional-certificate/michiganx-user-experience-ux-research-and-design' },
];

export const platforms = ['All', 'Coursera', 'Udemy', 'LinkedIn Learning', 'edX'];
export const courseCategories = ['All', 'Programming', 'Web Development', 'Data Science', 'AI/ML', 'Cloud', 'Security', 'DevOps', 'Design', 'Management'];
