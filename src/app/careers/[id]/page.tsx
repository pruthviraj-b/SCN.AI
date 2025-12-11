
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CareerView from "@/components/CareerView";

type Props = {
    params: Promise<{ id: string }>;
};

// Next.js 15+ compatible page component
export default async function CareerDetailPage({ params }: Props) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const career = db.careerPath.getAll().find((c) => c.id === resolvedParams.id);

    if (!career) {
        notFound();
    }

    return <CareerView career={career} />;
}
