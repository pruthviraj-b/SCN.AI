"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-white/5 opacity-50" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`
                relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
                ${theme === 'dark' ? 'bg-[#121826] hover:bg-[#1a2236]' : 'bg-[#E2E8F0] hover:bg-[#cbd5e1]'}
            `}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
            <div className="relative w-5 h-5">
                {/* Sun Icon (Show in Light Mode) - Primary Blue */}
                <Sun
                    className={`absolute inset-0 w-full h-full text-[#2563EB] transition-all duration-300 transform 
                    ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                />

                {/* Moon Icon (Show in Dark Mode) - Primary Blue */}
                <Moon
                    className={`absolute inset-0 w-full h-full text-[#3B82F6] transition-all duration-300 transform 
                    ${theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                />
            </div>
        </button>
    );
}
