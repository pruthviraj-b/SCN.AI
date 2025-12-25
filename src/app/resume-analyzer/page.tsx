
import ResumeAnalyzer from '@/components/tools/ResumeAnalyzer';
import Navigation from '@/components/Navigation';

export const metadata = {
    title: 'AI Resume Architect | Smart Career Navigator',
    description: 'Optimize your resume with advanced AI analysis.',
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <Navigation />
            <div className="pt-24 pb-12">
                <ResumeAnalyzer />
            </div>
        </main>
    );
}
