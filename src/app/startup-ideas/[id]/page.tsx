
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import StartupView from "@/components/StartupView";

type Props = {
    params: Promise<{ id: string }>;
};

// Next.js 15+ compatible page component
export default async function StartupDetailPage({ params }: Props) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const idea = db.startupIdea.getAll().find((i) => i.id === resolvedParams.id);

    if (!idea) {
        notFound();
    }

    return <StartupView idea={idea} />;
}
