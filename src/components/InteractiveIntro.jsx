import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/InteractiveIntro.css';

const birthFlowers = {
  1: { nameKo: '수선화', nameEn: 'Daffodil', image: '/assets/images/flowers/flower_01.png', meaning: '자기사랑, 자존심, 고결' },
  2: { nameKo: '제비꽃', nameEn: 'Violet', image: '/assets/images/flowers/flower_02.png', meaning: '겸손, 진실한 사랑' },
  3: { nameKo: '데이지', nameEn: 'Daisy', image: '/assets/images/flowers/flower_03.png', meaning: '명랑, 순수한 마음' },
  4: { nameKo: '스위트피', nameEn: 'Sweet Pea', image: '/assets/images/flowers/flower_04.png', meaning: '우아한 추억, 사랑의 기쁨' },
  5: { nameKo: '은방울꽃', nameEn: 'Lily of the Valley', image: '/assets/images/flowers/flower_05.png', meaning: '틀림없이 행복해집니다, 순결' },
  6: { nameKo: '장미', nameEn: 'Rose', image: '/assets/images/flowers/flower_06.png', meaning: '사랑, 아름다움, 열정' },
  7: { nameKo: '델피늄', nameEn: 'Delphinium', image: '/assets/images/flowers/flower_07.png', meaning: '당신을 행복하게 해줄게요, 청명' },
  8: { nameKo: '글라디올러스', nameEn: 'Gladiolus', image: '/assets/images/flowers/flower_08.png', meaning: '견고한 성격, 무장, 사랑의 고백' },
  9: { nameKo: '아스터', nameEn: 'Aster', image: '/assets/images/flowers/flower_09.png', meaning: '추억, 믿음, 사랑의 결실' },
  10: { nameKo: '금잔화', nameEn: 'Marigold', image: '/assets/images/flowers/flower_10.png', meaning: '우정, 예언, 이별의 슬픔' },
  11: { nameKo: '국화', nameEn: 'Chrysanthemum', image: '/assets/images/flowers/flower_11.png', meaning: '청조, 평화, 지조' },
  12: { nameKo: '포인세티아', nameEn: 'Poinsettia', image: '/assets/images/flowers/flower_12.png', meaning: '축복, 뜨거운 마음' },
};

const InteractiveIntro = () => {
  const sectionRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [birthFlower, setBirthFlower] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMonth || !selectedDay) return;
    
    setIsAnimating(true);
    setImageLoading(true);
    
    // 카드가 부드럽게 사라졌다가 교체되어 나타나도록 하는 애니메이션 딜레이 (300ms)
    setTimeout(() => {
      const flower = birthFlowers[selectedMonth];
      setBirthFlower({
        ...flower,
        month: selectedMonth,
        day: selectedDay
      });
      setShowResult(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleReset = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowResult(false);
      setBirthFlower(null);
      setSelectedMonth('');
      setSelectedDay('');
      setIsAnimating(false);
    }, 400);
  };

  return (
    <section 
      className="section interactive-intro" 
      ref={sectionRef}
    >
      <div className="blur-overlay"></div>
      <div className="container intro-container">
        
        <div className="intro-text-col">
          <h2 className="intro-heading">당신의 계절이 시작된 날,<br/>어떤 꽃이 피어났나요?</h2>
          <p className="intro-desc">
            가장 개인적인 기억을 향기로 기록합니다.<br/>
            당신이 태어난 달과 날짜에 깃든 탄생화의 문장과, <br/>
            그날의 공기를 닮은 특별한 조향을 확인해보세요.
          </p>
        </div>

        <div className="intro-form-col">
          <div className={`form-card-wrapper ${isAnimating ? 'is-animating' : ''}`}>
            {!showResult ? (
              <form onSubmit={handleSubmit} className="intro-form">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <div className="select-wrapper">
                    <select 
                      className="custom-select" 
                      value={selectedMonth} 
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>월 (Month)</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={`month-${i+1}`} value={i + 1}>{i + 1}월</option>
                      ))}
                    </select>
                    <select 
                      className="custom-select" 
                      value={selectedDay} 
                      onChange={(e) => setSelectedDay(e.target.value)}
                      required
                    >
                      <option value="" disabled hidden>일 (Day)</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={`day-${i+1}`} value={i + 1}>{i + 1}일</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="submit-btn">
                  나만의 탄생화 발견하기
                </button>
              </form>
            ) : (
              <div className="intro-result-card">
                <div className="result-header">
                  <span className="result-date">{birthFlower.month}월 {birthFlower.day}일의 탄생화</span>
                  <button className="reset-btn" onClick={handleReset} aria-label="다시 조회하기">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flower-frame">
                  {imageLoading && (
                    <div className="flower-placeholder">
                      <div className="watercolor-spinner"></div>
                      <span className="placeholder-text">탄생화 준비중 입니다.</span>
                    </div>
                  )}
                  
                  {/* Rotating background watercolor decoration */}
                  {!imageLoading && (
                    <div 
                      className="flower-bg-rotate"
                      style={{ backgroundImage: `url(${birthFlower.image})` }}
                    ></div>
                  )}
                  
                  <img 
                    src={birthFlower.image} 
                    alt={birthFlower.nameKo} 
                    className={`flower-img ${birthFlower.image.includes('isolated') ? 'is-isolated' : ''} ${!imageLoading ? 'is-loaded' : ''}`} 
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
                
                <div className="flower-info">
                  <h3 className="flower-name">
                    <span className="flower-name-ko">{birthFlower.nameKo}</span>
                    <span className="flower-name-en">{birthFlower.nameEn}</span>
                  </h3>
                  <div className="flower-meaning-badge">
                    <span className="meaning-label">꽃말</span>
                    <p className="meaning-text">“ {birthFlower.meaning} ”</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveIntro;
