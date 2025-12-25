
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PlanTracker from "@/components/dashboard/PlanTracker";

export default async function PlanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    const { id } = await params;

    const user = await db.user.findUnique({
        where: { email: session.user.email },
        include: { plans: true } // Ensure plans are loaded
    });

    if (!user) {
        return <div>User not found</div>;
    }

    // Find the specific plan
    const plan = user.plans.find((p: any) => p.id === id);

    if (!plan) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Plan Not Found</h1>
                    <p className="text-muted-foreground">The plan you are looking for does not exist or has been deleted.</p>
                </div>
            </div>
        );
    }

    let planData;
    try {
        planData = JSON.parse(plan.data);
    } catch (e) {
        console.error("Failed to parse plan data", e);
        return <div>Error loading plan data</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-5xl mx-auto">
                <PlanTracker planId={plan.id} planData={planData} />
            </div>
        </div>
    );
}
