import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections/EpilogueCTA.css';
import CheckoutModal from './CheckoutModal';
import giftBoxImg from '../assets/images/gift_box_new.jpg';

const EpilogueCTA = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <button className="final-cta-btn" onClick={() => setIsModalOpen(true)}>
          선물하기
        </button>
      </div>
      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default EpilogueCTA;
