import React, { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveIntro from './components/InteractiveIntro';
import Showcase from './components/Showcase';
import Efficacy from './components/Efficacy';
import SocialProof from './components/SocialProof';
import EpilogueCTA from './components/EpilogueCTA';

function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we can unobserve if we only want the animation to run once.
            // This is better for performance.
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -60px 0px', // Trigger slightly before it enters the viewport
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
