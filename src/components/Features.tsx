import { Brain, TrendingUp, BookOpen, Users, Zap, Shield } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Recommendations",
            description: "Advanced algorithms analyze your profile to provide accurate, meaningful career insights that evolve with you.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: TrendingUp,
            title: "Real-Time Market Trends",
            description: "Stay ahead with insights on trending roles, in-demand skills, and future-proof career opportunities.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: BookOpen,
            title: "Personalized Learning Paths",
            description: "Get curated courses and resources tailored to your career goals and current skill level.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Users,
            title: "Track Your Progress",
            description: "Monitor your growth, update achievements, and refine goals as you advance in your career journey.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Zap,
            title: "Instant Career Insights",
            description: "Get immediate answers to your career questions with our 24/7 AI assistant powered by ChatGPT.",
            color: "from-yellow-500 to-orange-500"
        },
        {
            icon: Shield,
            title: "Trusted & Secure",
            description: "Your data is protected with enterprise-grade security. We never share your information without consent.",
            color: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-300">Platform Features</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Everything You Need To <br />
                        <span className="text-gradient">Build Your Dream Career</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Powerful features designed to guide you from exploration to achievement
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-full h-full text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">10K+</p>
                        <p className="text-gray-400">Career Paths</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">500+</p>
                        <p className="text-gray-400">Learning Resources</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">24/7</p>
                        <p className="text-gray-400">AI Support</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">100%</p>
                        <p className="text-gray-400">Personalized</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
