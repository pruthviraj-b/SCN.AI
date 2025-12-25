
"use client";

import { Search, Filter, ShieldAlert, BarChart3, Globe } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function StartupFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get current values
    const getParam = (key: string) => searchParams.get(key) || "";
    const getArrayParam = (key: string) => {
        const val = searchParams.get(key);
        return val ? val.split(',') : [];
    };

    const search = getParam('search');
    const risk = getArrayParam('risk');
    const difficulty = getArrayParam('difficulty');
    const industry = getArrayParam('industry'); // Although not used in UI yet? kept for consistency

    // Update URL helper
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleSearch = (term: string) => {
        router.replace(pathname + '?' + createQueryString('search', term));
    };

    const toggleFilter = (key: string, val: string) => {
        const current = getArrayParam(key);
        let next: string[];

        if (current.includes(val)) {
            next = current.filter(item => item !== val);
        } else {
            next = [...current, val];
        }

        router.replace(pathname + '?' + createQueryString(key, next.join(',')));
    };

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search startup concepts (e.g. SaaS, AI)..."
                    className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                {/* Risk Level */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Risk Level
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['Low', 'Medium', 'High'].map((level) => (
                            <button
                                key={level}
                                onClick={() => toggleFilter('risk', level)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${risk.includes(level)
                                    ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500'
                                    : 'bg-card border-border text-muted-foreground hover:border-yellow-500/50'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Difficulty
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <button
                                key={level}
                                onClick={() => toggleFilter('difficulty', level)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${difficulty.includes(level)
                                    ? 'bg-orange-500/20 border-orange-500 text-orange-500'
                                    : 'bg-card border-border text-muted-foreground hover:border-orange-500/50'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
