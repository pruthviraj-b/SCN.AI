import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/careers" className="text-sm text-primary hover:underline">
                            Explore Careers
                        </Link>
                        <Link href="/resources" className="text-sm text-primary hover:underline">
                            Learning Resources
                        </Link>
                        <Link href="/onboarding" className="text-sm text-primary hover:underline">
                            Get Started
                        </Link>
                        <Link href="/dashboard" className="text-sm text-primary hover:underline">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
