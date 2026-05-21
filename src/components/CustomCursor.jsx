import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/CustomCursor.css';
import bottleShot from '../assets/images/bottle_shot.png';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredFlowerImg, setHoveredFlowerImg] = useState('');
  const [hoveredColorFilter, setHoveredColorFilter] = useState('');

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    
    // Smooth cursor movement variables
    let cursorX = 0;
    let cursorY = 0;
    
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.8;
      cursorY += (mouseY - cursorY) * 0.8;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationFrame = requestAnimationFrame(animateCursor);

    // Add specific interaction listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('.showcase-item');
      if (target) {
        setIsExpanded(true);
        const flowerImg = target.getAttribute('data-flower-img');
        const colorFilter = target.getAttribute('data-color-filter');
        if (flowerImg) {
          setHoveredFlowerImg(flowerImg);
        }
        if (colorFilter) {
          setHoveredColorFilter(colorFilter);
        }
        setText('DRAG');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('.showcase-item');
      if (target) {
        setIsExpanded(false);
        setHoveredFlowerImg('');
        setHoveredColorFilter('');
        setText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Hide custom cursor completely on mobile/touch
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className={`custom-cursor ${isExpanded ? 'is-expanded' : ''}`} ref={cursorRef}>
      {isExpanded && hoveredFlowerImg ? (
        <div className="cursor-bottle-wrapper">
          {/* Miniature Perfume Bottle */}
          <img 
            src={bottleShot} 
            className="cursor-bottle-bg" 
            alt="cursor bottle"
            style={{ filter: hoveredColorFilter }}
          />
          {/* Circle Flower Sticker in the middle of bottle */}
          <div className="cursor-sticker-container">
            <img 
              src={hoveredFlowerImg} 
              className="cursor-flower-sticker" 
              alt="cursor flower"
            />
          </div>
          <span className="cursor-text">{text}</span>
        </div>
      ) : (
        <div className="cursor-dot" />
      )}
    </div>
  );
};

export default CustomCursor;
