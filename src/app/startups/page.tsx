import { db } from "@/lib/db";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StartupHero from "@/components/startups/StartupHero";
import StartupGrid from "@/components/startups/StartupGrid";

export default async function StartupIdeasPage() {
    const ideas = await db.startupIdea.getAll();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-yellow-500/30">
            <Navigation />

            <main>
                <StartupHero />

                <div className="container mx-auto px-4 pb-24">
                    <StartupGrid ideas={ideas} />
                </div>
            </main>

        </div>
    );
}
