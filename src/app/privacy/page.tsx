
import Navigation from '@/components/Navigation';
import { Shield, Lock, Eye, Database, FileText } from 'lucide-react';

export const metadata = {
    title: 'Privacy & Security | Smart Career Navigator',
    description: 'Our commitment to data protection and ethical AI.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navigation />

            <main className="container mx-auto max-w-4xl px-4 py-24">
                <div className="text-center mb-16 space-y-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                        <Shield className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                        Security & Privacy Trust Center
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We believe your career data belongs to you. Here is how we protect it, process it, and respect your rights.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <PrivacyCard
                        icon={Lock}
                        title="Encryption & Security"
                        desc="All data is encrypted at rest and in transit using industry-standard TLS 1.3. Passwords are never stored in plain text."
                    />
                    <PrivacyCard
                        icon={Eye}
                        title="AI Anonymization"
                        desc="Your personal identifiers (Name, Email) are STRIPPED before being sent to our AI engine for career analysis."
                    />
                    <PrivacyCard
                        icon={Database}
                        title="Data Minimization"
                        desc="We only collect what is strictly necessary to generate your career plan. You can delete your account at any time."
                    />
                    <PrivacyCard
                        icon={FileText}
                        title="Transparency"
                        desc="Our AI is designed to be explainable. We tell you exactly why a career was recommended to you."
                    />
                </div>

                <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200">1. Data Collection Policy</h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>We collect information you provide directly to us when you create an account, build a profile, or use our interactive features. This includes:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Account credentials (hashed)</li>
                                <li>Profile data (Education, Skills, Experience)</li>
                                <li>Career goals and preferences</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200">2. How We Use AI</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Smart Career Navigator uses Large Language Models (LLMs) to analyze your profile.
                            <strong className="text-white"> We do NOT use your data to train public AI models.</strong>
                            Data sent to the inference engine is ephemeral and stateless.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-gray-200">3. Your Rights</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="font-semibold text-white mb-2">Access & Portability</h3>
                                <p className="text-sm text-gray-400">You can view and export your career plan at any time as a PDF.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <h3 className="font-semibold text-red-400 mb-2">Right to Erasure</h3>
                                <p className="text-sm text-gray-400">You can permanently delete your account and all associated data from the Settings page.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    Last Updated: December 2025 • Compliance: GDPR-Aligned / Academic Standards
                </div>
            </main>
        </div>
    );
}

function PrivacyCard({ icon: Icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Icon className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
    );
}
