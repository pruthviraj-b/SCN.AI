
"use client";

import { useMemo } from "react";
import ResourceCard from "./ResourceCard";
import ResourceFilters from "./ResourceFilters";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ResourceGridProps = {
    resources: any[];
};

export default function ResourceGrid({ resources }: ResourceGridProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Parse filters
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") ? searchParams.get("type")!.split(",") : [];
    const difficulty = searchParams.get("difficulty") ? searchParams.get("difficulty")!.split(",") : [];

    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            if (search && !resource.title.toLowerCase().includes(search.toLowerCase()) &&
                !resource.skill_tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))) {
                return false;
            }
            if (type.length > 0 && !type.includes(resource.type)) {
                return false;
            }
            if (difficulty.length > 0 && !difficulty.includes(resource.difficulty_level)) {
                return false;
            }
            return true;
        });
    }, [resources, search, type, difficulty]);

    const handleClearFilters = () => {
        router.replace(pathname);
    };

    return (
        <div id="resource-grid" className="scroll-mt-24">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

                <aside className="hidden lg:block sticky top-24 h-fit p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
                    <ResourceFilters />
                </aside>

                <div className="lg:hidden mb-6">
                    <ResourceFilters />
                </div>

                {/* Main Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-foreground">
                            Found {filteredResources.length} Learning Resources
                        </h2>
                    </div>

                    {!search && type.length === 0 && difficulty.length === 0 && (
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Award className="w-5 h-5 text-yellow-500" />
                                <h3 className="text-lg font-bold">Featured Collections</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {resources.filter(r => r.rating >= 4.9).slice(0, 2).map(r => (
                                    <div key={r.id} className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                            A+
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-1">{r.title}</h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{r.description}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border">Best Rated</span>
                                                <span className="text-[10px] font-bold text-primary">Must Try</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredResources.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredResources.map((resource) => (
                                    <ResourceCard key={resource.id} resource={resource} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-card/30 rounded-3xl border border-border border-dashed">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4 mx-auto">
                                <span className="text-2xl">📚</span>
                            </div>
                            <p className="text-muted-foreground mb-4">No resources found matching your criteria.</p>
                            <button
                                onClick={handleClearFilters}
                                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
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
