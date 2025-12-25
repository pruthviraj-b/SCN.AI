export default function ResourcesLoading() {
    return (
        <div className="min-h-screen pt-20 bg-background">
            <div className="container mx-auto px-4 py-12">
                {/* Header Skeleton */}
                <div className="mb-12 animate-pulse">
                    <div className="h-12 bg-white/10 rounded-lg w-64 mb-4"></div>
                    <div className="h-6 bg-white/5 rounded-lg w-96"></div>
                </div>

                {/* Resource Cards Skeleton */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse border border-white/5">
                            <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/5 rounded w-5/6 mb-4"></div>
                            <div className="flex gap-2 mb-4">
                                <div className="h-6 bg-white/10 rounded-full w-20"></div>
                                <div className="h-6 bg-white/10 rounded-full w-24"></div>
                            </div>
                            <div className="h-10 bg-white/10 rounded-lg w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
