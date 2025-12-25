"use client";

import { useState, useMemo } from "react";
import CareerCard from "./CareerCard";
import CareerFilters from "./CareerFilters";
import CareerComparison from "./CareerComparison";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type CareerGridProps = {
    careers: any[]; // Typed loosely to avoid duplicating DB type here
};

export default function CareerGrid({ careers }: CareerGridProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Valid Sorting State
    const [sortBy, setSortBy] = useState<'salary' | 'growth' | 'demand'>('growth');

    // Parse filters
    const search = searchParams.get("search") || "";
    const difficulty = searchParams.get("difficulty") ? searchParams.get("difficulty")!.split(",") : [];

    // --- Logic: Filtering ---
    const filteredCareers = useMemo(() => {
        return careers.filter(career => {
            // 1. Search Query
            if (search && !career.title.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
            // 2. Difficulty
            if (difficulty.length > 0 && !difficulty.includes(career.difficulty_level)) {
                return false;
            }
            return true;
        });
    }, [careers, search, difficulty]);

    // --- Logic: Sorting ---
    const sortedCareers = useMemo(() => {
        let result = [...filteredCareers];
        if (sortBy === 'salary') {
            // Mock sort by parsing string "₹6-18 LPA" -> 6
            result.sort((a, b) => {
                const getVal = (s: string) => parseInt(s.match(/\d+/)?.[0] || '0');
                return getVal(b.avgSalary) - getVal(a.avgSalary);
            });
        } else if (sortBy === 'growth') {
            result.sort((a, b) => b.growth_score - a.growth_score);
        } else if (sortBy === 'demand') {
            const weights = { "Very High": 3, "High": 2, "Medium": 1, "Low": 0 };
            result.sort((a, b) => (weights[b.demand as keyof typeof weights] || 0) - (weights[a.demand as keyof typeof weights] || 0));
        }
        return result;
    }, [filteredCareers, sortBy]);

    // --- Logic: Comparison ---
    const handleToggleCompare = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(cId => cId !== id));
        } else {
            if (selectedIds.length < 3) {
                setSelectedIds(prev => [...prev, id]);
            } else {
                alert("You can only compare up to 3 careers at a time.");
            }
        }
    };

    const handleClearFilters = () => {
        router.replace(pathname);
    };

    return (
        <div id="career-grid" className="scroll-mt-24">
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

                {/* Sidebar Filters - Sticky */}
                <aside className="hidden lg:block sticky top-24 h-fit p-6 bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl shadow-sm">
                    <CareerFilters />
                </aside>

                {/* Mobile Filters (Simplified for now) */}
                <div className="lg:hidden mb-6">
                    <CareerFilters />
                </div>

                {/* Main Grid */}
                <div>
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-foreground">
                            Found {sortedCareers.length} Career Paths
                        </h2>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="growth">High Growth</option>
                                <option value="salary">Highest Salary</option>
                                <option value="demand">Most In-Demand</option>
                            </select>
                        </div>
                    </div>

                    {sortedCareers.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {sortedCareers.map((career) => (
                                    <CareerCard
                                        key={career.id}
                                        career={career}
                                        isSelected={selectedIds.includes(career.id)}
                                        onToggleCompare={handleToggleCompare}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-card/30 rounded-3xl border border-border border-dashed flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No careers found</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                                We couldn't find any careers matching your current filters. Try adjusting your search criteria.
                            </p>
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

            {/* Floating Comparison Widget */}
            <CareerComparison
                selectedIds={selectedIds}
                onClear={() => setSelectedIds([])}
                onRemove={(id) => setSelectedIds(prev => prev.filter(p => p !== id))}
            />
        </div>
    );
}
