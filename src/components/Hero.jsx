import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/Hero.css';
import { ArrowRight } from 'lucide-react';
import SplashCursor from './SplashCursor';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null); // Reference for native loop control
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Force mute and native loop on the DOM node directly to bypass browser autoplay policies seamlessly
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(err => {
        console.warn("Autoplay initialization blocked:", err);
      });
    }

    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      const scrollY = window.scrollY;
      
      // Parallax and fade effect for text
      if (scrollY < window.innerHeight) {
        const opacity = 1 - (scrollY / window.innerHeight) * 1.5;
        const translateY = scrollY * 0.4;
        
        textRef.current.style.opacity = Math.max(0, opacity);
        textRef.current.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${1 + scrollY * 0.0005})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial entrance animation triggers after a slight delay
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('is-loaded');
        setIsLoaded(true);
      }
    }, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {isLoaded && <SplashCursor RAINBOW_MODE COLOR="#c799f3" />}
      {/* Background Video */}
      <video 
        ref={videoRef}
        className="hero-video-bg" 
        src="/assets/mp4.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
      />
      {/* Cinematic overlay for reading safety */}
      <div className="hero-video-overlay" />

      {/* Fluid morphing gradients blobs background */}
      <div className="fluid-bg-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>



      <div className="hero-content" ref={textRef}>
        <h1 className="hero-title">당신이 태어난 달의 문장,<br/>하루 종일 은은하게 피어나는 향</h1>
        
        <button 
          className="hero-cta"
          onClick={() => {
            const el = document.querySelector('.interactive-intro');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>내 탄생화 향수 확인하기</span>
          <ArrowRight size={20} className="cta-icon" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
