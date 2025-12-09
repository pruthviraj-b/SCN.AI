import { seedDatabase } from '@/lib/seed';

// Seed the database on server start
seedDatabase();

export default function SeedPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Database Seeded!</h1>
                <p className="text-gray-400">Demo data has been added to the database.</p>
                <a href="/" className="mt-8 inline-block px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                    Go to Home
                </a>
            </div>
        </div>
    );
}
