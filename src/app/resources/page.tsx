import { db } from "@/lib/db";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";

export default async function ResourcesPage() {
    const resources = db.learningResource.getAll();
    const activeResources = resources.filter(r => r.status === 'Active');

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-4 py-20 pt-32">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Learning Resources
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Curated courses and materials to accelerate your career growth
                    </p>
                </div>

                {activeResources.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No resources available yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeResources.map((resource) => (
                            <Link
                                key={resource.id}
                                href={`/resources/${resource.id}`}
                                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 group block relative"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                            {resource.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                                                {resource.platform}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                                {resource.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all text-sm font-semibold mt-4">
                                    View Course Details
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-lg font-semibold"
                    >
                        Get Your Personalized Learning Path
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
