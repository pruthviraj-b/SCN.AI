import Wizard from '@/components/onboarding/Wizard';
import ChatModal from '@/components/ChatModal';

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Build Your Career Profile</h1>
                    <p className="text-blue-200/60">
                        Tell us about yourself and we'll design your perfect learning path.
                    </p>
                </div>
                <Wizard />
            </div>
            <ChatModal />
        </main>
    );
}
