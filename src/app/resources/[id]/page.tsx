
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ResourceView from "@/components/ResourceView";

type Props = {
    params: Promise<{ id: string }>;
};

// Next.js 15+ compatible page component
export default async function ResourceDetailPage({ params }: Props) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const resources = await db.learningResource.getAll();
    const resource = resources.find((r) => r.id === resolvedParams.id);

    if (!resource) {
        notFound();
    }

    return <ResourceView resource={resource} />;
}
