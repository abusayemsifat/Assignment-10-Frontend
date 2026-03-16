import { lazy, Suspense } from 'react';
import HeroSection       from '../components/sections/HeroSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import PartnersSection   from '../components/sections/PartnersSection';

const FeaturedSection     = lazy(() => import('../components/sections/FeaturedSection'));
const HowItWorks          = lazy(() => import('../components/sections/HowItWorks'));
const StatsSection        = lazy(() => import('../components/sections/StatsSection'));
const TestimonialsSection = lazy(() => import('../components/sections/TestimonialsSection'));
const FAQSection          = lazy(() => import('../components/sections/FAQSection'));
const NewsletterSection   = lazy(() => import('../components/sections/NewsletterSection'));
const CTASection          = lazy(() => import('../components/sections/CTASection'));

const Fallback = () => (
  <div className="flex justify-center py-16">
    <span className="loading loading-spinner loading-lg text-primary" />
  </div>
);

const Home = () => (
  <>
    <HeroSection />
    <PartnersSection />
    <CategoriesSection />
    <Suspense fallback={<Fallback />}><FeaturedSection /></Suspense>
    <Suspense fallback={<Fallback />}><HowItWorks /></Suspense>
    <Suspense fallback={<Fallback />}><StatsSection /></Suspense>
    <Suspense fallback={<Fallback />}><TestimonialsSection /></Suspense>
    <Suspense fallback={<Fallback />}><FAQSection /></Suspense>
    <Suspense fallback={<Fallback />}><NewsletterSection /></Suspense>
    <Suspense fallback={<Fallback />}><CTASection /></Suspense>
  </>
);

export default Home;