export default function DashboardLoading() {
    return (
        <div className="min-h-screen pt-20 bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-10 bg-white/10 rounded-lg w-48 mb-2"></div>
                    <div className="h-5 bg-white/5 rounded-lg w-64"></div>
                </div>

                {/* Dashboard Grid Skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
                            <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
                            <div className="h-20 bg-white/10 rounded-lg mb-4"></div>
                            <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/5 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
