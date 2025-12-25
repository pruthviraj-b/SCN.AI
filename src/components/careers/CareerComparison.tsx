
"use client";

import { X, ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ComparisonProps = {
    selectedIds: string[];
    onClear: () => void;
    onRemove: (id: string) => void;
};

export default function CareerComparison({ selectedIds, onClear, onRemove }: ComparisonProps) {
    if (selectedIds.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
            >
                <div className="bg-foreground text-background rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-border/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Layers className="w-6 h-6 text-primary" />
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {selectedIds.length}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-background/90">Compare Careers</span>
                            <span className="text-xs text-background/60">
                                {selectedIds.length} of 3 selected
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClear}
                            className="text-xs font-medium text-background/60 hover:text-background transition-colors"
                        >
                            Clear
                        </button>
                        <Link
                            href={`/careers/compare?ids=${selectedIds.join(',')}`}
                            className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                            Compare <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
