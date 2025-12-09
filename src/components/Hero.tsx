import Link from 'next/link';
import { ArrowRight, Sparkles, Target, TrendingUp, Lightbulb, Brain, BookOpen, MessageSquare, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-gray-300">AI-Powered Career Guidance</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Shape Your Future With <br />
            <span className="text-gradient">AI-Powered Career Guidance</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            Smart Career Navigator helps you discover the perfect career path with intelligent recommendations personalized to your skills, education, and interests. Whether you're choosing your first career or planning a new direction, our AI guides you with clarity, confidence, and real-world insights.
          </p>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Find careers you'll love, understand the skills you need, explore startup ideas, and unlock personalized learning paths — all in one intelligent platform designed to empower your growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 group">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/careers" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
              Explore Careers
            </Link>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Smart Career Matching</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              A Smarter Way To Choose Your Career
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Making career decisions can be confusing, but it doesn't have to be. Our platform uses advanced algorithms to analyze your strengths and interests, recommending career paths that truly match who you are. No more generic advice — get customized guidance built around your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Skills to Opportunities Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">Skill Analysis</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Your Skills Into Opportunities
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Every person has unique abilities. Smart Career Navigator identifies your potential and transforms it into actionable opportunities. From understanding what you're good at to finding where you fit in today's job market, the platform gives you a clear direction backed by intelligent analysis.
              </p>
              <Link href="/onboarding" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-semibold">
                Discover Your Strengths
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI-Powered Analysis</h4>
                    <p className="text-sm text-gray-400">Advanced algorithms analyze your profile</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Matching</h4>
                    <p className="text-sm text-gray-400">Get careers that fit your unique profile</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Market Insights</h4>
                    <p className="text-sm text-gray-400">Real-time data on industry trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Gap & Upskilling Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <BookOpen className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Continuous Learning</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Know What Skills You Need — And How To Learn Them
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Our system highlights the skills you already have and the skills you need to grow. You'll receive curated learning resources, handpicked courses, and personalized upskilling paths so you can reach your dream career faster and more efficiently.
            </p>
          </div>
          <div className="text-center">
            <Link href="/resources" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all font-semibold">
              Browse Learning Resources
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Startup & Entrepreneurship Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1 glass-card p-8 rounded-2xl border border-white/10">
              <div className="space-y-6">
                <div className="text-center p-6 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                  <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="font-bold text-lg mb-2">AI-Generated Ideas</h4>
                  <p className="text-sm text-gray-400">Unique startup concepts based on your profile</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold text-primary mb-1">500+</p>
                    <p className="text-xs text-gray-400">Startup Templates</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-2xl font-bold text-green-400 mb-1">50+</p>
                    <p className="text-xs text-gray-400">Industries Covered</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">Entrepreneurship</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Explore Startup Ideas Tailored To Your Strengths
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                Career growth doesn't always mean a job — it can also mean building something of your own. Smart Career Navigator analyzes your interests, creativity, and leadership traits to generate unique startup ideas that align with your personality. Discover business opportunities that fit your ambitions and take the first step toward entrepreneurship.
              </p>
              <Link href="/onboarding" className="inline-flex items-center gap-2 text-yellow-400 hover:gap-3 transition-all font-semibold">
                Explore Startup Ideas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Promo Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-400">24/7 AI Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Personal Career Mentor — Available Anytime
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Ask questions, explore new career paths, get explanations, or seek advice instantly. The built-in AI assistant is always ready to help you make informed decisions, giving you 24/7 support throughout your career journey.
            </p>
            <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-400 mb-2">You asked:</p>
                  <p className="text-white mb-4">"What skills do I need to become a data scientist?"</p>
                  <p className="text-sm text-gray-400 mb-2">AI Assistant:</p>
                  <p className="text-gray-300 text-sm">To become a data scientist, you'll need Python, statistics, machine learning, and data visualization skills. I can create a personalized learning path for you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Start Your Journey Today — <br />
              <span className="text-gradient">Your Future Awaits</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Create your profile, explore your strengths, and unlock a world of personalized opportunities. Your perfect career path is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-10 py-5 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 group shadow-lg shadow-primary/50">
                Get Started Free
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/careers" className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
                Browse Careers
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              No credit card required • Free forever • AI-powered guidance
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
