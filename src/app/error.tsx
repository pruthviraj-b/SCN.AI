'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Something Went Wrong
                    </h1>
                    <p className="text-blue-200 text-lg mb-4">
                        We encountered an unexpected error. Please try again.
                    </p>
                    {/* Technical details hidden for production safety */}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        prefetch={true}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/10"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
