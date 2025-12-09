import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-4">
            <Link href="/signup" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Signup
            </Link>

            <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
                <div className="space-y-4 text-gray-300">
                    <p>Welcome to Smart Career Navigator.</p>
                    <p>By accessing or using our website, you agree to be bound by these terms and conditions.</p>

                    <h2 className="text-xl font-bold text-white mt-6">1. Acceptance of Terms</h2>
                    <p>By creating an account, you agree to comply with all applicable laws and regulations.</p>

                    <h2 className="text-xl font-bold text-white mt-6">2. User Accounts</h2>
                    <p>You are responsible for maintaining the confidentiality of your account and password.</p>

                    <h2 className="text-xl font-bold text-white mt-6">3. Privacy Policy</h2>
                    <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>

                    <h2 className="text-xl font-bold text-white mt-6">4. Modifications</h2>
                    <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.</p>
                </div>
            </div>
        </div>
    );
}
