import SobreHero from '../components/sobre/SobreHero';
import SobreHistoria from '../components/sobre/SobreHistoria';
import SobreNumeros from '../components/sobre/SobreNumeros';
import SobreVideoCTA from '../components/sobre/SobreVideoCTA';
import SobreVisao from '../components/sobre/SobreVisao';
import SobreTimeline from '../components/sobre/SobreTimeline';
import SobreMomentos from '../components/sobre/SobreMomentos';

import SobreCultura from '../components/sobre/SobreCultura';

import SobreDiretoria from '../components/sobre/SobreDiretoria';


const Sobre = () => {
  return (
    <div className="bg-white min-h-screen relative overflow-clip">
      <SobreHero />
      <SobreHistoria />
      <SobreTimeline />
      <SobreNumeros />
      <SobreVideoCTA />
      <SobreCultura />
      <SobreVisao />
      <SobreDiretoria />
      <SobreMomentos />


    </div>
  );
};

export default Sobre;
