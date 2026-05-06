import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Header from './components/Header';
import HeroLight from './components/HeroLight';
import Authority from './components/Authority';
import PartnersCarousel from './components/PartnersCarousel';
import NarrativeEvolution from './components/NarrativeEvolution';
import SolutionsHover from './components/SolutionsHover';
import RxEcosystem from './components/RxEcosystem';
import TestimonialsLight from './components/TestimonialsLight';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Keep Modals if they will be reused
import PartnerModal from './components/PartnerModal';
import { PartnerModalProvider } from './context/PartnerModalContext';
import SolutionsModal from './components/SolutionsModal';
import { SolutionsModalProvider } from './context/SolutionsModalContext';

// Lazy-loaded
const RxDiagnosis = lazy(() => import('./components/RxAnalises'));

const SectionSkeleton = () => <div className="min-h-[400px] bg-white border-b border-surface-100" />;

const App = () => {
  return (
    <SolutionsModalProvider>
        <PartnerModalProvider>
          <LazyMotion features={domAnimation} strict>
        <main className="bg-white min-h-screen font-sans relative">
            <Header />

            <HeroLight />
            <style>{`
              html {
                scroll-snap-type: y proximity;
              }
            `}</style>
            
            <div className="relative z-20 -mt-[100vh] h-screen w-full snap-start shrink-0">
              <Authority />
            </div>

            <div className="min-h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white py-[clamp(72px,8vw,120px)]">
              <Suspense fallback={<SectionSkeleton />}>
                 <RxDiagnosis />
              </Suspense>
            </div>

            <div className="min-h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white py-[clamp(72px,8vw,120px)]">
              <NarrativeEvolution />
            </div>

            <div className="h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white">
              <SolutionsHover />
            </div>

            <div className="h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white">
              <RxEcosystem />
            </div>

            <div className="min-h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white py-[clamp(72px,8vw,120px)]">
              <TestimonialsLight />
            </div>

            <div className="h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white">
              <FAQ />
            </div>

            <div className="h-screen w-full snap-start shrink-0 flex items-center justify-center bg-white">
              <PartnersCarousel />
            </div>

            <div className="h-screen w-full snap-start shrink-0 flex items-end justify-center bg-white">
              <Footer />
            </div>
            
        </main>

        {/* Modals */}
        <PartnerModal />
        <SolutionsModal />
      </LazyMotion>
    </PartnerModalProvider>
    </SolutionsModalProvider>
  );
};

export default App;
