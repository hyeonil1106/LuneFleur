import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveIntro from './components/InteractiveIntro';
import Showcase from './components/Showcase';
import Efficacy from './components/Efficacy';
import SocialProof from './components/SocialProof';
import EpilogueCTA from './components/EpilogueCTA';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <InteractiveIntro />
        <Showcase />
        <Efficacy />
        <SocialProof />
        <EpilogueCTA />
      </main>
    </>
  );
}

export default App;
