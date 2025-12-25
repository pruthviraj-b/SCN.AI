"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider defaultTheme="dark" storageKey="scn-theme-v3">
                {children}
            </ThemeProvider>
        </SessionProvider>
    );
}
