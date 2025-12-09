import { db } from "@/lib/db";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Briefcase, TrendingUp, DollarSign, ArrowRight } from "lucide-react";

export default async function ExploreCareersPage() {
    const careerPaths = db.careerPath.getAll();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-4 py-20 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Explore Career Paths
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover exciting career opportunities curated by our experts
                    </p>
                </div>

                {careerPaths.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No career paths available yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {careerPaths.map((career) => (
                            <div key={career.id} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Briefcase className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                            {career.title}
                                        </h3>
                                        <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                            {career.category}
                                        </span>
                                    </div>
                                </div>

                                {career.description && (
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {career.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className={`${career.demand === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {career.demand} Demand
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        <span className="text-gray-300">{career.avgSalary}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/onboarding"
                                    className="flex items-center gap-2 text-primary hover:gap-3 transition-all text-sm font-semibold"
                                >
                                    Start Your Journey
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-lg font-semibold"
                    >
                        Get Personalized Recommendations
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
