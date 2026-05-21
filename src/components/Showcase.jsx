import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/Showcase.css';

const showcaseItems = [
  { id: 'f1', month: 1, nameKo: '수선화', nameEn: 'Daffodil', src: '/assets/images/flowers/flower_01.png', isolatedSrc: '/assets/images/flowers/flower_01_isolated.png', alt: '1월 수선화 탄생화 디테일', meaning: '자기사랑, 자존심, 고결', colorFilter: 'hue-rotate(-10deg) saturate(0.8) brightness(1.02)' },
  { id: 'f2', month: 2, nameKo: '제비꽃', nameEn: 'Violet', src: '/assets/images/flowers/flower_02.png', isolatedSrc: '/assets/images/flowers/flower_02_isolated.png', alt: '2월 제비꽃 탄생화 디테일', meaning: '겸손, 진실한 사랑', colorFilter: 'hue-rotate(110deg) saturate(0.6) brightness(1.05)' },
  { id: 'f3', month: 3, nameKo: '데이지', nameEn: 'Daisy', src: '/assets/images/flowers/flower_03.png', isolatedSrc: '/assets/images/flowers/flower_03_isolated.png', alt: '3월 데이지 탄생화 디테일', meaning: '명랑, 순수한 마음', colorFilter: 'hue-rotate(-20deg) saturate(0.7) brightness(1.03)' },
  { id: 'f4', month: 4, nameKo: '스위트피', nameEn: 'Sweet Pea', src: '/assets/images/flowers/flower_04.png', isolatedSrc: '/assets/images/flowers/flower_04_isolated.png', alt: '4월 스위트피 탄생화 디테일', meaning: '우아한 추억, 사랑의 기쁨', colorFilter: 'hue-rotate(160deg) saturate(0.7) brightness(1.02)' },
  { id: 'f5', month: 5, nameKo: '은방울꽃', nameEn: 'Lily of the Valley', src: '/assets/images/flowers/flower_05.png', isolatedSrc: '/assets/images/flowers/flower_05_isolated.png', alt: '5월 은방울꽃 탄생화 디테일', meaning: '틀림없이 행복해집니다, 순결', colorFilter: 'hue-rotate(40deg) saturate(0.5) brightness(1.08)' },
  { id: 'f6', month: 6, nameKo: '장미', nameEn: 'Rose', src: '/assets/images/flowers/flower_06.png', isolatedSrc: '/assets/images/flowers/flower_06_isolated.png', alt: '6월 장미 탄생화 디테일', meaning: '사랑, 아름다움, 열정', colorFilter: 'hue-rotate(180deg) saturate(1.1) brightness(0.98)' },
  { id: 'f7', month: 7, nameKo: '델피늄', nameEn: 'Delphinium', src: '/assets/images/flowers/flower_07.png', isolatedSrc: '/assets/images/flowers/flower_07_isolated.png', alt: '7월 델피늄 탄생화 디테일', meaning: '당신을 행복하게 해줄게요, 청명', colorFilter: 'hue-rotate(85deg) saturate(0.8) brightness(1.02)' },
  { id: 'f8', month: 8, nameKo: '글라디올러스', nameEn: 'Gladiolus', src: '/assets/images/flowers/flower_08.png', isolatedSrc: '/assets/images/flowers/flower_08_isolated.png', alt: '8월 글라디올러스 탄생화 디테일', meaning: '견고한 성격, 무장, 사랑의 고백', colorFilter: 'hue-rotate(200deg) saturate(0.9) brightness(1.0)' },
  { id: 'f9', month: 9, nameKo: '아스터', nameEn: 'Aster', src: '/assets/images/flowers/flower_09.png', isolatedSrc: '/assets/images/flowers/flower_09_isolated.png', alt: '9월 아스터 탄생화 디테일', meaning: '추억, 믿음, 사랑의 결실', colorFilter: 'hue-rotate(100deg) saturate(0.7) brightness(1.02)' },
  { id: 'f10', month: 10, nameKo: '금잔화', nameEn: 'Marigold', src: '/assets/images/flowers/flower_10.png', isolatedSrc: '/assets/images/flowers/flower_10_isolated.png', alt: '10월 금잔화 탄생화 디테일', meaning: '우정, 예언, 이별의 슬픔', colorFilter: 'hue-rotate(-15deg) saturate(1.2) brightness(0.98)' },
  { id: 'f11', month: 11, nameKo: '국화', nameEn: 'Chrysanthemum', src: '/assets/images/flowers/flower_11.png', isolatedSrc: '/assets/images/flowers/flower_11_isolated.png', alt: '11월 국화 탄생화 디테일', meaning: '청조, 평화, 지조', colorFilter: 'hue-rotate(-5deg) saturate(0.9) brightness(0.95)' },
  { id: 'f12', month: 12, nameKo: '포인세티아', nameEn: 'Poinsettia', src: '/assets/images/flowers/flower_12.png', isolatedSrc: '/assets/images/flowers/flower_12_isolated.png', alt: '12월 포인세티아 탄생화 디테일', meaning: '축복, 뜨거운 마음', colorFilter: 'hue-rotate(190deg) saturate(1.2) brightness(0.95)' },
];

const AUTOPLAY_SPEED = 1.8; // Speed coefficient (pixels per frame)

const Showcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const dragOffset = useRef(0);
  const halfWidth = useRef(0);
  const animationFrameId = useRef(null);
  const autoPlayDelayTimeout = useRef(null);

  const [flippedCards, setFlippedCards] = useState({});
  const [isDraggingState, setIsDraggingState] = useState(false);

  const handleCardClick = (cardKey, e) => {
    if (Math.abs(dragOffset.current) >= 5) {
      e.preventDefault();
      return;
    }
    setFlippedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  useEffect(() => {
    const updateHalfWidth = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
    };

    window.addEventListener('load', updateHalfWidth);
    window.addEventListener('resize', updateHalfWidth);
    
    const timer = setTimeout(updateHalfWidth, 600);

    const autoPlay = () => {
      if (isDragging.current || isHovered.current) return;
      
      currentTranslate.current -= AUTOPLAY_SPEED;
      
      if (halfWidth.current > 0 && currentTranslate.current <= -halfWidth.current) {
        currentTranslate.current = 0;
      }
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
      }
      
      animationFrameId.current = requestAnimationFrame(autoPlay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            updateHalfWidth();
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = requestAnimationFrame(autoPlay);
          } else {
            cancelAnimationFrame(animationFrameId.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('load', updateHalfWidth);
      window.removeEventListener('resize', updateHalfWidth);
      cancelAnimationFrame(animationFrameId.current);
      clearTimeout(timer);
      clearTimeout(autoPlayDelayTimeout.current);
    };
  }, []);

  const handleDragStart = (e) => {
    isDragging.current = true;
    setIsDraggingState(true);
    
    const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
    startX.current = pageX;
    prevTranslate.current = currentTranslate.current;
    dragOffset.current = 0;
    
    cancelAnimationFrame(animationFrameId.current);
    clearTimeout(autoPlayDelayTimeout.current);
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    
    const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
    dragOffset.current = pageX - startX.current;
    
    let targetTranslate = prevTranslate.current + dragOffset.current;
    
    if (halfWidth.current > 0) {
      if (targetTranslate > 0) {
        targetTranslate -= halfWidth.current;
        prevTranslate.current -= halfWidth.current;
      } else if (targetTranslate < -halfWidth.current) {
        targetTranslate += halfWidth.current;
        prevTranslate.current += halfWidth.current;
      }
    }
    
    currentTranslate.current = targetTranslate;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);
    
    clearTimeout(autoPlayDelayTimeout.current);
    autoPlayDelayTimeout.current = setTimeout(() => {
      if (!isHovered.current && !isDragging.current) {
        cancelAnimationFrame(animationFrameId.current);
        const resumeAutoPlay = () => {
          if (isDragging.current || isHovered.current) return;
          currentTranslate.current -= AUTOPLAY_SPEED;
          if (halfWidth.current > 0 && currentTranslate.current <= -halfWidth.current) {
            currentTranslate.current = 0;
          }
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
          }
          animationFrameId.current = requestAnimationFrame(resumeAutoPlay);
        };
        animationFrameId.current = requestAnimationFrame(resumeAutoPlay);
      }
    }, 1500);
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    cancelAnimationFrame(animationFrameId.current);
    clearTimeout(autoPlayDelayTimeout.current);
  };

  const handleMouseLeave = () => {
    handleDragEnd();
    isHovered.current = false;
    
    // Resume flow quicker when leaving mouse context
    clearTimeout(autoPlayDelayTimeout.current);
    autoPlayDelayTimeout.current = setTimeout(() => {
      if (!isDragging.current && !isHovered.current) {
        cancelAnimationFrame(animationFrameId.current);
        const resumeAutoPlay = () => {
          if (isDragging.current || isHovered.current) return;
          currentTranslate.current -= AUTOPLAY_SPEED;
          if (halfWidth.current > 0 && currentTranslate.current <= -halfWidth.current) {
            currentTranslate.current = 0;
          }
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
          }
          animationFrameId.current = requestAnimationFrame(resumeAutoPlay);
        };
        animationFrameId.current = requestAnimationFrame(resumeAutoPlay);
      }
    }, 800);
  };

  const renderCard = (item, setIndex, idx) => {
    const cardKey = `set${setIndex}-${item.id}-${idx}`;
    const isFlipped = !!flippedCards[cardKey];

    return (
      <div 
        key={cardKey} 
        className={`showcase-item ${isFlipped ? 'is-flipped' : ''}`}
        onClick={(e) => handleCardClick(cardKey, e)}
        data-flower-img={item.isolatedSrc}
        data-color-filter={item.colorFilter}
      >
        <div className="showcase-card-inner">
          {/* Card Front (Bottle + Watercolor Deco) */}
          <div className="showcase-card-front">
            {/* Base Perfume Bottle Body */}
            <img 
              src="/assets/images/bottle_shot.png" 
              alt="LuneFleur Perfume Bottle" 
              className="showcase-bottle-img"
              style={{ filter: item.colorFilter }}
              loading="lazy"
            />
            {/* Watercolor Birth Flower Deco (Bottom Left) */}
            <img 
              src={item.src} 
              alt={item.alt} 
              className="showcase-watercolor-deco"
              loading="lazy"
            />
            <div className="card-month-badge">{item.month}월</div>
          </div>
          
          {/* Card Back */}
          <div className="showcase-card-back">
            <div className="card-back-content">
              <span className="card-back-month">{item.month}월의 탄생화</span>
              <h3 className="card-back-title">
                <span className="card-back-name-ko">{item.nameKo}</span>
                <span className="card-back-name-en">{item.nameEn}</span>
              </h3>
              <div className="card-back-divider"></div>
              <div className="card-back-meaning">
                <span className="meaning-label">꽃말</span>
                <p className="meaning-text">“ {item.meaning} ”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="showcase" ref={sectionRef}>
      <div className="showcase-header">
        <h2 className="showcase-title">눈을 감아도, 떠도 영롱한.<br/>보틀 속에 박제된 당신의 탄생화</h2>
      </div>

      <div className="showcase-grid"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="showcase-track" ref={trackRef}>
          {/* First set */}
          {showcaseItems.map((item, idx) => renderCard(item, 1, idx))}
          {/* Second set for seamless loop */}
          {showcaseItems.map((item, idx) => renderCard(item, 2, idx))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
