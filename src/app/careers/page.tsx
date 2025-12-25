import { db } from "@/lib/db";
import Navigation from "@/components/Navigation";
import CareerHero from "@/components/careers/CareerHero";
import CareerGrid from "@/components/careers/CareerGrid";

export default async function ExploreCareersPage() {
    // Enable this when ready to fetch real data
    const careerPaths = await db.careerPath.getAll();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navigation />

            <main>
                <CareerHero />

                <div className="container mx-auto px-4 pb-24">
                    <CareerGrid careers={careerPaths} />
                </div>
            </main>

        </div>
    );
}
