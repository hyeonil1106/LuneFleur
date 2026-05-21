import React, { useState, useEffect } from 'react';
import '../styles/components/Navbar.css';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (selector) => {
    setIsOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          LUNE FLEUR
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-menu">
          <button onClick={() => scrollToSection('.hero')} className="menu-link">스토리</button>
          <button onClick={() => scrollToSection('.interactive-intro')} className="menu-link">탄생화</button>
          <button onClick={() => scrollToSection('.showcase')} className="menu-link">쇼케이스</button>
          <button onClick={() => scrollToSection('.efficacy')} className="menu-link">효능</button>
          <button onClick={() => scrollToSection('.social-proof')} className="menu-link">리뷰</button>
          <button onClick={() => scrollToSection('.epilogue-cta')} className="menu-link">선물하기</button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'is-open' : ''}`}>
        <nav className="mobile-drawer-menu">
          <button onClick={() => scrollToSection('.hero')} className="mobile-menu-link">스토리</button>
          <button onClick={() => scrollToSection('.interactive-intro')} className="mobile-menu-link">탄생화</button>
          <button onClick={() => scrollToSection('.showcase')} className="mobile-menu-link">쇼케이스</button>
          <button onClick={() => scrollToSection('.efficacy')} className="mobile-menu-link">효능</button>
          <button onClick={() => scrollToSection('.social-proof')} className="mobile-menu-link">리뷰</button>
          <button onClick={() => scrollToSection('.epilogue-cta')} className="mobile-menu-link">선물하기</button>
          <button 
            onClick={() => scrollToSection('.interactive-intro')} 
            className="mobile-cta-btn"
          >
            나만의 향수 만들기
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
