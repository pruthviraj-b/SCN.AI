export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="pt-20 container mx-auto px-4 pb-8">
                {children}
            </div>
        </div>
    );
}
