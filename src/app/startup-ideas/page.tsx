import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Lightbulb, TrendingUp, BarChart3, Rocket } from "lucide-react";

export default function StartupIdeasPage() {
    const ideas = db.startupIdea.getAll();

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 mb-4">
                        <Lightbulb className="w-4 h-4" />
                        <span className="text-sm font-medium">Build Your Own Future</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
                        Explore Startup Ideas
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover vetted startup concepts with detailed business plans, financial projections, and go-to-market strategies.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas.map((idea) => (
                        <Link
                            key={idea.id}
                            href={`/startup-ideas/${idea.id}`}
                            className="group relative bg-card border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-1 block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                                        <Rocket className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${idea.difficulty === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                            idea.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                                'border-green-500/30 text-green-400 bg-green-500/10'
                                        }`}>
                                        {idea.difficulty} Difficulty
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {idea.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                    {idea.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        {idea.market}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BarChart3 className="w-3 h-3" />
                                        {idea.category}
                                    </div>
                                </div>

                                <div className="flex items-center text-primary text-sm font-medium">
                                    View Business Plan <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
