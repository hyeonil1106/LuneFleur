import React, { useEffect, useRef } from 'react';
import '../styles/sections/SocialProof.css';

// 이미지 imports
import bottleShot from '../assets/images/bottle_shot.png';
import flower02 from '../assets/images/flowers/flower_02.png';
import flower04 from '../assets/images/flowers/flower_04.png';
import flower06 from '../assets/images/flowers/flower_06.png';
import flower07 from '../assets/images/flowers/flower_07.png';
import flower11 from '../assets/images/flowers/flower_11.png';
import flower12 from '../assets/images/flowers/flower_12.png';

const SocialProof = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const reviews = [
    {
      id: 1,
      month: 6,
      flowerSrc: flower06,
      colorFilter: "hue-rotate(180deg) saturate(1.1) brightness(0.98)",
      text: "처음 뿌렸을 때의 상쾌함이 퇴근할 때까지 은은하게 남아있어요. 제 생일꽃이라는 의미까지 더해져 매일 아침 리추얼이 되었습니다.",
      author: "김서연 (26, 브랜드 마케터)",
      rating: "★★★★★"
    },
    {
      id: 2,
      month: 2,
      flowerSrc: flower02,
      colorFilter: "hue-rotate(110deg) saturate(0.6) brightness(1.05)",
      text: "보틀 속에 흔들리는 꽃잎이 너무 아름다워요. 오일 베이스라 건조한 제 피부에도 촉촉하게 스며들고 잔향이 정말 오래갑니다.",
      author: "이유진 (29, 디자이너)",
      rating: "★★★★★"
    },
    {
      id: 3,
      month: 7,
      flowerSrc: flower07,
      colorFilter: "hue-rotate(85deg) saturate(0.8) brightness(1.02)",
      text: "선물용으로 구매했는데 패키징부터 향까지 너무 고급스러워서 받는 분이 정말 좋아하셨어요. 나를 위한 선물로도 완벽합니다.",
      author: "박지민 (31, 프리랜서)",
      rating: "★★★★★"
    },
    {
      id: 4,
      month: 11,
      flowerSrc: flower11,
      colorFilter: "hue-rotate(20deg) saturate(0.9) brightness(1.05)",
      text: "최근에 리뉴얼된 국화 향수 이미지가 너무 마음에 들어 구매했어요. 따뜻하면서도 포근한 가을 향기가 하루 종일 맴돕니다.",
      author: "최수영 (24, 대학생)",
      rating: "★★★★★"
    },
    {
      id: 5,
      month: 12,
      flowerSrc: flower12,
      colorFilter: "hue-rotate(340deg) saturate(1.2) brightness(0.95)",
      text: "연말 파티에 뿌리고 나갔는데 어디 향수냐고 여러 번 질문을 받았어요. 우아하면서도 잔향이 정말 오래가는 인생 향수입니다.",
      author: "정태양 (33, 기획자)",
      rating: "★★★★★"
    },
    {
      id: 6,
      month: 4,
      flowerSrc: flower04,
      colorFilter: "hue-rotate(310deg) saturate(0.7) brightness(1.1)",
      text: "벚꽃이 만개한 봄날의 기분을 담은 향이에요. 향수 하나로 방 안 가득 봄기운이 퍼지는 느낌이라 기분 전환에 최고예요!",
      author: "강지민 (28, 에디터)",
      rating: "★★★★★"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    if (gridRef.current) {
      gridRef.current.classList.add('is-dragging');
      startX.current = e.pageX - gridRef.current.offsetLeft;
      scrollLeft.current = gridRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (gridRef.current) gridRef.current.classList.remove('is-dragging');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (gridRef.current) gridRef.current.classList.remove('is-dragging');
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !gridRef.current) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    gridRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="section social-proof" ref={sectionRef}>
      <div className="container">
        <div className="social-header reveal reveal-up">
          <h2 className="social-title">실제 사용자들의 리뷰를 확인해 보세요</h2>
        </div>

        <div 
          className="social-grid"
          ref={gridRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {reviews.map((review, index) => (
            <div className={`review-card reveal reveal-up delay-${((index % 3) * 200) + 100}`} key={review.id}>
              <div className="review-img-wrapper">
                {/* Base Perfume Bottle */}
                <img
                  src={bottleShot}
                  alt="LuneFleur Perfume Bottle"
                  className="review-bottle-img"
                  style={{ filter: review.colorFilter }}
                  loading="lazy"
                />
                {/* Watercolor Floral decoration */}
                <img
                  src={review.flowerSrc}
                  alt={`${review.month}월 탄생화`}
                  className="review-watercolor-deco"
                  loading="lazy"
                />
                {/* Month label badge */}
                <div className="review-month-badge">{review.month}월</div>
              </div>
              <div className="review-content">
                <div className="stars">{review.rating}</div>
                <p className="review-text">"{review.text}"</p>
                <span className="review-author">{review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
