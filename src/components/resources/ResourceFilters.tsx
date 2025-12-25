
"use client";

import { Search, Filter, Laptop, Book, Video, Trophy, Box } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ResourceFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get current values
    const search = searchParams.get('search') || "";
    const type = searchParams.get('type') ? searchParams.get('type')!.split(',') : [];
    const difficulty = searchParams.get('difficulty') ? searchParams.get('difficulty')!.split(',') : [];

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

    const toggleType = (t: string) => {
        const current = type;
        const next = current.includes(t)
            ? current.filter(item => item !== t)
            : [...current, t];

        router.replace(pathname + '?' + createQueryString('type', next.join(',')));
    };

    const toggleDifficulty = (level: string) => {
        const current = difficulty;
        const next = current.includes(level)
            ? current.filter(l => l !== level)
            : [...current, level];

        router.replace(pathname + '?' + createQueryString('difficulty', next.join(',')));
    };

    const types = [
        { id: 'Course', icon: Laptop, label: 'Courses' },
        { id: 'Video', icon: Video, label: 'Videos' },
        { id: 'Article', icon: Book, label: 'Articles' },
        { id: 'Project', icon: Box, label: 'Projects' },
        { id: 'Certification', icon: Trophy, label: 'Certs' },
    ];

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search resources (e.g. Python, React)..."
                    className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                {/* Type Filter */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Resource Type
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {types.map(({ id, icon: Icon, label }) => (
                            <button
                                key={id}
                                onClick={() => toggleType(id)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${type.includes(id)
                                    ? 'bg-primary/20 border-primary text-primary'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                                    }`}
                            >
                                <Icon className="w-3 h-3" />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">Skill Level</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <button
                                key={level}
                                onClick={() => toggleDifficulty(level)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${difficulty.includes(level)
                                    ? 'bg-primary/20 border-primary text-primary'
                                    : 'bg-card border-border text-muted-foreground hover:border-primary/50'
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
