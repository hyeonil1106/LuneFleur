import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/Efficacy.css';

// 이미지 imports
import bottleShot from '../assets/images/bottle_shot.png';
import flower01 from '../assets/images/flowers/flower_01.png';
import flower02 from '../assets/images/flowers/flower_02.png';
import flower03 from '../assets/images/flowers/flower_03.png';
import flower04 from '../assets/images/flowers/flower_04.png';
import flower05 from '../assets/images/flowers/flower_05.png';
import flower06 from '../assets/images/flowers/flower_06.png';
import flower07 from '../assets/images/flowers/flower_07.png';
import flower08 from '../assets/images/flowers/flower_08.png';
import flower09 from '../assets/images/flowers/flower_09.png';
import flower10 from '../assets/images/flowers/flower_10.png';
import flower11 from '../assets/images/flowers/flower_11.png';
import flower12 from '../assets/images/flowers/flower_12.png';

const showcaseItems = [
  { 
    id: 'f1', month: 1, nameKo: '수선화', nameEn: 'Daffodil', src: flower01, alt: '1월 수선화 탄생화', colorFilter: 'hue-rotate(-10deg) saturate(0.8) brightness(1.02)',
    fragranceNotes: [
      { name: 'Top (그린 시트러스)', percentage: 70, color: '#dcd6b6' },
      { name: 'Middle (수선화, 은방울꽃)', percentage: 95, color: '#c29b74' },
      { name: 'Base (화이트 머스크)', percentage: 60, color: '#8f9a88' },
      { name: '발향 지속성 (Longevity)', percentage: 80, color: '#d9cdb8' }
    ]
  },
  { 
    id: 'f2', month: 2, nameKo: '제비꽃', nameEn: 'Violet', src: flower02, alt: '2월 제비꽃 탄생화', colorFilter: 'hue-rotate(110deg) saturate(0.6) brightness(1.05)',
    fragranceNotes: [
      { name: 'Top (베르가못, 페어)', percentage: 65, color: '#8984a8' },
      { name: 'Middle (제비꽃, 아이리스)', percentage: 90, color: '#c29b74' },
      { name: 'Base (샌달우드)', percentage: 70, color: '#6e5d80' },
      { name: '발향 지속성 (Longevity)', percentage: 85, color: '#e2dfeb' }
    ]
  },
  { 
    id: 'f3', month: 3, nameKo: '데이지', nameEn: 'Daisy', src: flower03, alt: '3월 데이지 탄생화', colorFilter: 'hue-rotate(-20deg) saturate(0.7) brightness(1.03)',
    fragranceNotes: [
      { name: 'Top (피치, 라즈베리)', percentage: 80, color: '#dfd7b9' },
      { name: 'Middle (데이지, 쟈스민)', percentage: 85, color: '#778a6d' },
      { name: 'Base (엠버, 바닐라)', percentage: 55, color: '#c8b991' },
      { name: '발향 지속성 (Longevity)', percentage: 70, color: '#eae5d8' }
    ]
  },
  { 
    id: 'f4', month: 4, nameKo: '스위트피', nameEn: 'Sweet Pea', src: flower04, alt: '4월 스위트피 탄생화', colorFilter: 'hue-rotate(160deg) saturate(0.7) brightness(1.02)',
    fragranceNotes: [
      { name: 'Top (그레이프프루츠)', percentage: 75, color: '#d8a8b5' },
      { name: 'Middle (스위트피, 로즈)', percentage: 95, color: '#c29b74' },
      { name: 'Base (시더우드)', percentage: 60, color: '#b27c8a' },
      { name: '발향 지속성 (Longevity)', percentage: 75, color: '#f2e1e5' }
    ]
  },
  { 
    id: 'f5', month: 5, nameKo: '은방울꽃', nameEn: 'Lily of the Valley', src: flower05, alt: '5월 은방울꽃 탄생화', colorFilter: 'hue-rotate(40deg) saturate(0.5) brightness(1.08)',
    fragranceNotes: [
      { name: 'Top (그린 애플, 레몬)', percentage: 70, color: '#a7b5a1' },
      { name: 'Middle (은방울꽃, 릴리)', percentage: 90, color: '#c29b74' },
      { name: 'Base (소프트 머스크)', percentage: 65, color: '#7b8e73' },
      { name: '발향 지속성 (Longevity)', percentage: 80, color: '#eaeae6' }
    ]
  },
  { 
    id: 'f6', month: 6, nameKo: '장미', nameEn: 'Rose', src: flower06, alt: '6월 장미 탄생화', colorFilter: 'hue-rotate(180deg) saturate(1.1) brightness(0.98)',
    fragranceNotes: [
      { name: 'Top (핑크 페퍼, 카시스)', percentage: 60, color: '#c87a8b' },
      { name: 'Middle (다마스크 로즈)', percentage: 100, color: '#b7596c' },
      { name: 'Base (패츌리, 오드)', percentage: 85, color: '#9b3e51' },
      { name: '발향 지속성 (Longevity)', percentage: 95, color: '#f5e1e5' }
    ]
  },
  { 
    id: 'f7', month: 7, nameKo: '델피늄', nameEn: 'Delphinium', src: flower07, alt: '7월 델피늄 탄생화', colorFilter: 'hue-rotate(85deg) saturate(0.8) brightness(1.02)',
    fragranceNotes: [
      { name: 'Top (오션 아쿠아, 민트)', percentage: 85, color: '#7998b3' },
      { name: 'Middle (델피늄, 워터릴리)', percentage: 90, color: '#c29b74' },
      { name: 'Base (베티버)', percentage: 70, color: '#4d708e' },
      { name: '발향 지속성 (Longevity)', percentage: 80, color: '#dbe5ee' }
    ]
  },
  { 
    id: 'f8', month: 8, nameKo: '글라디올러스', nameEn: 'Gladiolus', src: flower08, alt: '8월 글라디올러스 탄생화', colorFilter: 'hue-rotate(200deg) saturate(0.9) brightness(1.0)',
    fragranceNotes: [
      { name: 'Top (베르가못, 비터 오렌지)', percentage: 75, color: '#bf8773' },
      { name: 'Middle (글라디올러스, 네롤리)', percentage: 85, color: '#c29b74' },
      { name: 'Base (엠버그리스)', percentage: 80, color: '#9e5f49' },
      { name: '발향 지속성 (Longevity)', percentage: 90, color: '#ede2dd' }
    ]
  },
  { 
    id: 'f9', month: 9, nameKo: '아스터', nameEn: 'Aster', src: flower09, alt: '9월 아스터 탄생화', colorFilter: 'hue-rotate(100deg) saturate(0.7) brightness(1.02)',
    fragranceNotes: [
      { name: 'Top (플럼, 라벤더)', percentage: 65, color: '#897ba8' },
      { name: 'Middle (아스터, 헬리오트로프)', percentage: 90, color: '#c29b74' },
      { name: 'Base (오크모스)', percentage: 75, color: '#63538a' },
      { name: '발향 지속성 (Longevity)', percentage: 85, color: '#e8e4f2' }
    ]
  },
  { 
    id: 'f10', month: 10, nameKo: '금잔화', nameEn: 'Marigold', src: flower10, alt: '10월 금잔화 탄생화', colorFilter: 'hue-rotate(-15deg) saturate(1.2) brightness(0.98)',
    fragranceNotes: [
      { name: 'Top (만다린, 메리골드 잎)', percentage: 80, color: '#cba677' },
      { name: 'Middle (금잔화, 오렌지 블로썸)', percentage: 95, color: '#b78b54' },
      { name: 'Base (시더우드, 벤조인)', percentage: 70, color: '#936733' },
      { name: '발향 지속성 (Longevity)', percentage: 85, color: '#efeae1' }
    ]
  },
  { 
    id: 'f11', month: 11, nameKo: '국화', nameEn: 'Chrysanthemum', src: flower11, alt: '11월 국화 탄생화', colorFilter: 'hue-rotate(-5deg) saturate(0.9) brightness(0.95)',
    fragranceNotes: [
      { name: 'Top (진저, 유자)', percentage: 60, color: '#bfa573' },
      { name: 'Middle (국화, 클라리세이지)', percentage: 90, color: '#c29b74' },
      { name: 'Base (샌달우드, 인센스)', percentage: 85, color: '#8d723f' },
      { name: '발향 지속성 (Longevity)', percentage: 90, color: '#ede6d7' }
    ]
  },
  { 
    id: 'f12', month: 12, nameKo: '포인세티아', nameEn: 'Poinsettia', src: flower12, alt: '12월 포인세티아 탄생화', colorFilter: 'hue-rotate(190deg) saturate(1.2) brightness(0.95)',
    fragranceNotes: [
      { name: 'Top (크랜베리, 시나몬)', percentage: 80, color: '#b56262' },
      { name: 'Middle (포인세티아, 레드 로즈)', percentage: 85, color: '#9e4747' },
      { name: 'Base (바닐라, 우드)', percentage: 90, color: '#792a2a' },
      { name: '발향 지속성 (Longevity)', percentage: 95, color: '#eae0e0' }
    ]
  }
];

const Efficacy = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const activeCardRef = useRef(null); // Ref to track active card for click-outside detection
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // New state to toggle 3D Flip on click
  
  // Drag gesture interaction states
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const [activeDragClass, setActiveDragClass] = useState('');
  
  // Use a ref to ensure event listeners always read the latest active state
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;
  const isFlippedRef = useRef(false);
  isFlippedRef.current = isFlipped;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Fluid Morphing Background based on scroll
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight && rect.bottom > 0) {
        const progress = 1 - (sectionTop / windowHeight);
        const rotate = progress * 45;
        const translateY = progress * -100;
        
        bgRef.current.style.transform = `rotate(${rotate}deg) translateY(${translateY}px)`;
      }
    };

    // Click outside handler to flip card back
    const handleClickOutside = (e) => {
      if (isFlippedRef.current && activeCardRef.current && !activeCardRef.current.contains(e.target)) {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    // Rotate active monthly perfume card every 3 seconds if not hovered/dragged/flipped
    const interval = setInterval(() => {
      if (isHoveredRef.current || isDragging.current || isFlippedRef.current) return; // Pause rotation while user is inspecting

      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 3000);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(interval);
    };
  }, []);

  const length = showcaseItems.length;

  // Drag interaction handlers
  const handleDragStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setActiveDragClass('is-dragging');
    setIsHovered(true); // Pause auto-rotation immediately
    setIsFlipped(false); // Reset card flip on drag start
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    
    // Prevent default browser drag highlights
    if (e.cancelable) e.preventDefault();

    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diffX = currentX - dragStartX.current;

    const threshold = 60; // 60px sensitivity
    if (diffX > threshold) {
      setCurrentIndex((prev) => (prev - 1 + length) % length);
      setIsFlipped(false);
      dragStartX.current = currentX;
    } else if (diffX < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % length);
      setIsFlipped(false);
      dragStartX.current = currentX;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setActiveDragClass('');
    setIsHovered(false); // Resume auto-rotation
  };

  return (
    <section className="section efficacy" ref={sectionRef}>
      <div className="morph-bg" ref={bgRef}></div>
      
      <div className="container efficacy-container">
        <div className="efficacy-content">
          <h2 className="efficacy-title">코 끝에 머무는 은은함,<br/>아침의 설렘이 퇴근길의 잔향으로</h2>
          <p className="efficacy-desc">
            일반적인 알코올 베이스가 아닌, 워터와 오일의 이중(Biphase) 구조가
            당신의 피부에 얇은 보습막을 형성합니다. 체온과 자연스럽게 어우러져
            휘발되지 않고 8시간 이상 은은한 잔향을 선사합니다.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">8+ hrs</span>
              <span className="stat-label">Long-lasting Aura</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0%</span>
              <span className="stat-label">Alcohol-free</span>
            </div>
          </div>
        </div>
        
        <div className="efficacy-visual">
          <div 
            className={`circular-gallery-container ${activeDragClass}`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {showcaseItems.map((item, idx) => {
              // Calculate shortest circular distance
              let diff = idx - currentIndex;
              if (diff < -length / 2) diff += length;
              if (diff > length / 2) diff -= length;

              // Determine slot classes
              let slotClass = '';
              let isSlotActive = false;
              
              if (diff === 0) {
                slotClass = 'is-active';
                isSlotActive = true;
              } else if (diff === -1) {
                slotClass = 'is-prev';
              } else if (diff === 1) {
                slotClass = 'is-next';
              } else if (diff < -1) {
                slotClass = 'is-far-prev';
              } else if (diff > 1) {
                slotClass = 'is-far-next';
              }

              return (
                <div 
                  key={item.id}
                  ref={isSlotActive ? activeCardRef : null}
                  className={`gallery-card-slot ${slotClass} ${isSlotActive && isFlipped ? 'is-flipped' : ''}`}
                  onMouseEnter={() => {
                    if (isSlotActive) setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    if (isSlotActive) setIsHovered(false);
                  }}
                  onClick={() => {
                    if (isSlotActive) {
                      setIsFlipped((prev) => !prev); // Toggle flip only on center active card click
                    } else {
                      setCurrentIndex(idx);
                      setIsFlipped(false); // Reset flip state when focusing new card
                    }
                  }}
                >
                  <div className="visual-card-inner">
                    {/* Card Front */}
                    <div className="visual-card-front">
                      <div className="visual-card-front-content">
                        <img 
                          src={bottleShot} 
                          alt="LuneFleur Perfume Bottle" 
                          className="visual-bottle-img"
                          style={{ filter: item.colorFilter }}
                        />
                        <img 
                          src={item.src} 
                          alt={item.alt} 
                          className="visual-watercolor-deco"
                        />
                        <div className="visual-month-badge">{item.month}월</div>
                      </div>
                    </div>

                    {/* Card Back (Ingredients Chart) - Rendered only for the active card to optimize performance */}
                    {isSlotActive && (
                      <div className="visual-card-back">
                        <div className="visual-chart-content">
                          <h3 className="visual-chart-title">{item.month}월의 향기 노트 프로파일</h3>
                          <div className="visual-chart-divider"></div>
                          
                          <div className="chart-list">
                            {item.fragranceNotes.map((ing, idxIng) => (
                              <div className="chart-item" key={idxIng}>
                                <div className="chart-item-header">
                                  <span className="chart-item-name">{ing.name}</span>
                                  <span className="chart-item-percent">{ing.percentage}%</span>
                                </div>
                                <div className="chart-bar-bg">
                                  <div 
                                    className="chart-bar-fill" 
                                    style={{ 
                                      width: isFlipped ? `${ing.percentage}%` : '0%', 
                                      backgroundColor: ing.color 
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="visual-chart-caption">
                            * LuneFleur는 알코올 프리 워터-오일 층으로 구성되어 탑 노트부터 베이스 노트까지 오랜 시간 피부에 머뭅니다.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Efficacy;
