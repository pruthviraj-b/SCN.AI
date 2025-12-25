import { db } from "@/lib/db";
import Navigation from "@/components/Navigation";
import ResourceHero from "@/components/resources/ResourceHero";
import ResourceGrid from "@/components/resources/ResourceGrid";

export default async function ResourcesPage() {
    const resources = await db.learningResource.getAll();
    // Optional: Filter active resources if status is used
    const activeResources = resources.filter(r => r.status === 'Active');

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navigation />

            <main>
                <ResourceHero />

                <div className="container mx-auto px-4 pb-24">
                    <ResourceGrid resources={activeResources} />
                </div>
            </main>

        </div>
    );
}
