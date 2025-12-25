"use client";

import { useMemo } from "react";
import StartupCard from "./StartupCard";
import StartupFilters from "./StartupFilters";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type StartupGridProps = {
    ideas: any[];
};

export default function StartupGrid({ ideas }: StartupGridProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Parse filters from URL
    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") ? searchParams.get("industry")!.split(",") : [];
    const risk = searchParams.get("risk") ? searchParams.get("risk")!.split(",") : [];
    const difficulty = searchParams.get("difficulty") ? searchParams.get("difficulty")!.split(",") : [];

    const filteredIdeas = useMemo(() => {
        return ideas.filter(idea => {
            if (search && !idea.title.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
            if (industry.length > 0 && !industry.includes(idea.industry)) {
                return false;
            }
            if (risk.length > 0 && !risk.includes(idea.risk_level)) {
                return false;
            }
            // Fix: Check difficulty_level column
            if (difficulty.length > 0 && !difficulty.includes(idea.difficulty_level)) {
                return false;
            }
            return true;
        });
    }, [ideas, search, industry, risk, difficulty]);

    const handleClearFilters = () => {
        router.replace(pathname); // Clear all params
    };

    return (
        <div id="startup-grid" className="scroll-mt-24">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

                <aside className="hidden lg:block sticky top-24 h-fit p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
                    <StartupFilters />
                </aside>

                <div className="lg:hidden mb-6">
                    <StartupFilters />
                </div>

                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground">
                            Found {filteredIdeas.length} Concepts
                        </h2>
                    </div>

                    {filteredIdeas.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredIdeas.map((idea) => (
                                    <StartupCard key={idea.id} idea={idea} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card/30 rounded-3xl border border-border border-dashed">
                            <p className="text-muted-foreground">No startup ideas found matching your criteria.</p>
                            <button
                                onClick={handleClearFilters}
                                className="mt-4 text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
