import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ChatModal from '@/components/ChatModal';
import Navigation from '@/components/Navigation';
import PopularCareers from '@/components/homepage/PopularCareers';
import TrendingSkills from '@/components/homepage/TrendingSkills';
import FeaturedCourses from '@/components/homepage/FeaturedCourses';
import StartupIdeas from '@/components/homepage/StartupIdeas';
import LearningRoadmaps from '@/components/homepage/LearningRoadmaps';
import TrendingTech from '@/components/homepage/TrendingTech';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <PopularCareers />
      <TrendingSkills />
      <FeaturedCourses />
      <StartupIdeas />
      <LearningRoadmaps />
      <TrendingTech />
      <Features />
      <ChatModal />
      <Footer />
    </main>
  );
}
