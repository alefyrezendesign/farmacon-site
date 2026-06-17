import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import SecaoHero from '../components/home/SecaoHero';
import NumerosAutoridade from '../components/home/NumerosAutoridade';
import CarrosselParceiros from '../components/home/CarrosselParceiros';
import Beneficios from '../components/home/Beneficios';
import FraseImpactante from '../components/home/FraseImpactante';
import ResumoSolucoes from '../components/home/ResumoSolucoes';
import Demonstracao from '../components/home/Demonstracao';
import EcossistemaRx from '../components/home/EcossistemaRx';
import Depoimentos from '../components/home/Depoimentos';
import PerguntasFrequentes from '../components/home/PerguntasFrequentes';
import WorldScrollSequence from '../components/home/WorldScrollSequence';

import AnalisesRx from '../components/home/AnalisesRx';

const Home = () => {
  const sequenceContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sequenceProgress } = useScroll({
    target: sequenceContainerRef,
    offset: ["start end", "end start"]
  });

  return (
    <>
      <SecaoHero />

      <div className="relative z-20 -mt-[100vh] h-auto min-h-screen lg:h-screen w-full shrink-0">
        <NumerosAutoridade />
      </div>

      <div ref={sequenceContainerRef} className="relative w-full bg-white flex flex-col items-center">
        <div className="relative z-10 w-full shrink-0">
          <Beneficios />
        </div>

        {/* Globe sequence positioned in normal flow but with negative margin to overlap sections */}
        <div className="relative z-0 w-full flex justify-center -mt-28 sm:-mt-20 md:-mt-52 lg:-mt-64 mb-0 md:mb-10">
          <WorldScrollSequence progress={sequenceProgress} />
        </div>

        <div className="relative z-10 w-full shrink-0 -mt-8 sm:-mt-10 md:-mt-32 lg:-mt-60">
          <AnalisesRx />
        </div>
      </div>

      <div className="w-full shrink-0 bg-white pt-6 md:pt-16 lg:pt-20">
        <FraseImpactante />
      </div>

      <div className="w-full shrink-0 h-[350vh]">
        <Demonstracao />
      </div>

      <div className="relative z-20 -mt-[100vh] w-full shrink-0 bg-white">
        <ResumoSolucoes />
      </div>

      <div id="rx-solucoes" className="relative z-30 w-full shrink-0 flex items-center justify-center bg-white">
        <EcossistemaRx />
      </div>

      <div className="w-full shrink-0 bg-white -mt-[1px] relative z-30">
        <Depoimentos />
      </div>

      <div className="w-full shrink-0 bg-white">
        <CarrosselParceiros />
      </div>

      <div className="w-full shrink-0 bg-white">
        <PerguntasFrequentes />
      </div>
    </>
  );
};

export default Home;
