import React, { useEffect, useRef } from 'react';
import '../styles/sections/EpilogueCTA.css';
import giftBoxImg from '../assets/images/gift_box_new.jpg';

const EpilogueCTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Revert background color when scrolling out to maintain feeling
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="epilogue-cta" ref={sectionRef}>
      <div className="epilogue-content">
        <div className="epilogue-img-wrapper">
          <img
            src={giftBoxImg}
            alt="프리미엄 기프트 패키징"
            className="epilogue-img"
            loading="lazy"
          />
        </div>

        <h2 className="epilogue-title">
          가장 특별한 날에 태어난 당신에게,<br />
          탄생화의 문장을 선물하세요.
        </h2>

        <button className="final-cta-btn">
          선물하기
        </button>
      </div>
    </section>
  );
};

export default EpilogueCTA;
