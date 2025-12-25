import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChatModal from '@/components/ChatModal';
import Navigation from '@/components/Navigation';
import BentoGrid from '@/components/homepage/BentoGrid';
import Footer from '@/components/Footer';
import TrustSection from '@/components/TrustSection';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navigation />
      <Hero />
      <TrustSection />
      <BentoGrid />
      <Features />
      <CallToAction />
      <ChatModal />
      <Footer />
    </main>
  );
}
