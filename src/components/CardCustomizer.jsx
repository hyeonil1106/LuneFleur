import React, { useState, useEffect, useRef } from 'react';
import '../styles/sections/CardCustomizer.css';

// 이미지 imports (오리지널)
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

// 이미지 imports (투명 누끼 - 어두운 배경 대응용)
import flower01Isolated from '../assets/images/flowers/flower_01_isolated.png';
import flower02Isolated from '../assets/images/flowers/flower_02_isolated.png';
import flower03Isolated from '../assets/images/flowers/flower_03_isolated.png';
import flower04Isolated from '../assets/images/flowers/flower_04_isolated.png';
import flower05Isolated from '../assets/images/flowers/flower_05_isolated.png';
import flower06Isolated from '../assets/images/flowers/flower_06_isolated.png';
import flower07Isolated from '../assets/images/flowers/flower_07_isolated.png';
import flower08Isolated from '../assets/images/flowers/flower_08_isolated.png';
import flower09Isolated from '../assets/images/flowers/flower_09_isolated.png';
import flower10Isolated from '../assets/images/flowers/flower_10_isolated.png';
import flower11Isolated from '../assets/images/flowers/flower_11_isolated.png';
import flower12Isolated from '../assets/images/flowers/flower_12_isolated.png';

const customFlowers = [
  { month: 1, nameKo: '수선화', nameEn: 'Daffodil', image: flower01, isolatedImage: flower01Isolated, meaning: '자기사랑, 자존심, 고결' },
  { month: 2, nameKo: '제비꽃', nameEn: 'Violet', image: flower02, isolatedImage: flower02Isolated, meaning: '겸손, 진실한 사랑' },
  { month: 3, nameKo: '데이지', nameEn: 'Daisy', image: flower03, isolatedImage: flower03Isolated, meaning: '명랑, 순수한 마음' },
  { month: 4, nameKo: '스위트피', nameEn: 'Sweet Pea', image: flower04, isolatedImage: flower04Isolated, meaning: '우아한 추억, 사랑의 기쁨' },
  { month: 5, nameKo: '은방울꽃', nameEn: 'Lily of the Valley', image: flower05, isolatedImage: flower05Isolated, meaning: '틀림없이 행복해집니다, 순결' },
  { month: 6, nameKo: '장미', nameEn: 'Rose', image: flower06, isolatedImage: flower06Isolated, meaning: '사랑, 아름다움, 열정' },
  { month: 7, nameKo: '델피늄', nameEn: 'Delphinium', image: flower07, isolatedImage: flower07Isolated, meaning: '당신을 행복하게 해줄게요, 청명' },
  { month: 8, nameKo: '글라디올러스', nameEn: 'Gladiolus', image: flower08, isolatedImage: flower08Isolated, meaning: '견고한 성격, 무장, 사랑의 고백' },
  { month: 9, nameKo: '아스터', nameEn: 'Aster', image: flower09, isolatedImage: flower09Isolated, meaning: '추억, 믿음, 사랑의 결실' },
  { month: 10, nameKo: '금잔화', nameEn: 'Marigold', image: flower10, isolatedImage: flower10Isolated, meaning: '우정, 예언, 이별의 슬픔' },
  { month: 11, nameKo: '국화', nameEn: 'Chrysanthemum', image: flower11, isolatedImage: flower11Isolated, meaning: '청조, 평화, 지조' },
  { month: 12, nameKo: '포인세티아', nameEn: 'Poinsettia', image: flower12, isolatedImage: flower12Isolated, meaning: '축복, 뜨거운 마음' }
];

const defaultMessages = {
  1: "자신을 사랑하는 마음이 가장 아름다운 향기에요.",
  2: "당신의 겸손하고 진실된 사랑을 응원합니다.",
  3: "명랑하고 순수한 당신의 미소를 늘 기억할게요.",
  4: "우리 함께 나눈 시간이 아름다운 추억으로 남기를.",
  5: "당신의 삶에 틀림없이 행복이 찾아올 거에요.",
  6: "열정적이고 아름다운 당신은 장미보다 찬란합니다.",
  7: "언제나 당신 곁에서 행복을 지켜줄게요.",
  8: "당신의 견고한 신념 and 고백을 지지합니다.",
  9: "우리의 소중한 기억이 사랑의 결실을 맺기를.",
  10: "우리가 함께한 우정이 늘 변함없기를 바래요.",
  11: "평화롭고 지조 있는 당신의 삶을 존경합니다.",
  12: "뜨거운 마음을 담아 당신에게 축복을 보냅니다."
};

const bgPresets = [
  { id: 'mist', name: '새벽 안개', value: 'linear-gradient(135deg, #e3ece4 0%, #c4d7c5 100%)', textColor: '#2C352A' },
  { id: 'sunset', name: '노을빛 장미', value: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', textColor: '#4a148c' },
  { id: 'mint', name: '레몬 민트', value: 'linear-gradient(135deg, #f0f4e3 0%, #dbe7c4 100%)', textColor: '#334411' },
  { id: 'aurora', name: '블루밍 오로라', value: 'linear-gradient(135deg, #e0f2f1 0%, #b3e5fc 100%)', textColor: '#0d47a1' },
  { id: 'night', name: '보랏빛 밤', value: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', textColor: '#311b92' }
];

const fontPresets = [
  { id: 'font-serif', name: '기본 서체(명조)', style: "'Noto Serif KR', serif" },
  { id: 'font-pen', name: '감성 필기체', style: "'Nanum Pen Script', cursive" },
  { id: 'font-dokdo', name: '붓글씨체', style: "'East Sea Dokdo', cursive" },
  { id: 'font-garamond', name: '영문 세리프', style: "'Cormorant Garamond', 'Noto Serif KR', serif" }
];

const CardCustomizer = ({ sharedBirthFlower }) => {
  const [selectedFlower, setSelectedFlower] = useState(customFlowers[4]); // 기본값: 5월 은방울꽃
  const [bgPreset, setBgPreset] = useState(bgPresets[0]);
  const [selectedFont, setSelectedFont] = useState(fontPresets[0]);
  const [toText, setToText] = useState('Dear. 소중한 당신에게');
  const [fromText, setFromText] = useState('From. LuneFleur');
  const [message, setMessage] = useState(defaultMessages[5]); // 5월 은방울꽃 한 문장 메시지
  const [isSuccessEffect, setIsSuccessEffect] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const sectionRef = useRef(null);

  // 상위 상태(InteractiveIntro에서 선택된 탄생화)가 변경되면 그 꽃으로 자동 동기화
  useEffect(() => {
    if (sharedBirthFlower) {
      const match = customFlowers.find(f => f.month === Number(sharedBirthFlower.month));
      if (match) {
        setSelectedFlower(match);
        setToText('Dear. 소중한 당신에게');
        setMessage(defaultMessages[match.month] || "꽃처럼 향기로운 하루를 보내세요.");
      }
    }
  }, [sharedBirthFlower]);

  // 꽃 선택 변경 시 메시지 템플릿 변경
  const handleFlowerChange = (month) => {
    const target = customFlowers.find(f => f.month === Number(month));
    if (target) {
      setSelectedFlower(target);
      setMessage(defaultMessages[target.month] || "꽃처럼 향기로운 하루를 보내세요.");
    }
  };

  const handleSaveCard = () => {
    setIsSuccessEffect(true);
    setTimeout(() => {
      setShowSaveModal(true);
    }, 400);
  };

  const handleCloseModal = () => {
    setShowSaveModal(false);
    setIsSuccessEffect(false);
  };

  return (
    <section className="section card-customizer" ref={sectionRef}>
      <div className="customizer-overlay-blur"></div>
      
      <div className="container customizer-container">
        <div className="customizer-header reveal reveal-up">
          <h2 className="customizer-title">나만의 꽃말 카드 제작소</h2>
          <p className="customizer-subtitle">
            선택한 탄생화와 전하고 싶은 고유의 메시지, <br />
            그리고 당신이 고른 감각적인 폰트와 배경으로 영원히 간직할 향기 카드를 디자인해보세요.
          </p>
        </div>

        <div className="customizer-layout">
          {/* Left Side: Real-time Preview Card */}
          <div className="preview-column reveal reveal-left">
            <div 
              className={`preview-card-frame ${isSuccessEffect ? 'saving-effect' : ''} ${bgPreset.isDark ? 'theme-dark' : ''}`}
              style={{ background: bgPreset.value, color: bgPreset.textColor }}
            >
              <div className="card-texture"></div>
              
              <div className="card-top-info">
                <span className="card-date-badge">{selectedFlower.month}월의 탄생화</span>
                <span className="card-brand-logo">LuneFleur</span>
              </div>

              <div className="card-illustration-frame">
                <div className="watercolor-circle"></div>
                <img 
                  src={bgPreset.isDark ? selectedFlower.isolatedImage : selectedFlower.image} 
                  alt={selectedFlower.nameKo} 
                  className="card-flower-image"
                />
              </div>

              {/* 카드 내부 메시지 텍스트 에어리어 */}
              <div className="card-text-area" style={{ fontFamily: selectedFont.style }}>
                <div className="card-to-field">{toText}</div>
                
                {/* 꽃말 구역 항상 노출 */}
                <div className="card-flower-meaning-zone">
                  <span className="card-meaning-title">꽃말 (Language of Flower)</span>
                  <div className="card-meaning-text">“ {selectedFlower.meaning} ”</div>
                </div>

                {/* 꽃말 아래 한 문장 메시지 */}
                <div className="card-message-field custom-one-liner">{message}</div>
                
                <div className="card-from-field">{fromText}</div>
              </div>

              <div className="card-bottom-meaning">
                <p className="meaning-desc">{selectedFlower.nameKo} ({selectedFlower.nameEn})</p>
              </div>

              {isSuccessEffect && <div className="stamp-overlay">APPROVED</div>}
            </div>
            
            <p className="preview-tip">
              * 조율된 카드는 아래 저장 버튼을 눌러 인쇄용 이미지로 확정할 수 있습니다.
            </p>
          </div>

          {/* Right Side: Controllers */}
          <div className="control-column reveal reveal-right">
            <div className="control-card">
              
              {/* STEP 1: 꽃 선택 */}
              <div className="control-section">
                <h3 className="section-step"><span>01</span> 탄생화 설정</h3>
                <div className="select-wrapper">
                  <select 
                    value={selectedFlower.month} 
                    onChange={(e) => handleFlowerChange(e.target.value)}
                    className="customizer-select"
                  >
                    {customFlowers.map((f) => (
                      <option key={f.month} value={f.month}>
                        {f.month}월 - {f.nameKo} ({f.nameEn})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* STEP 2: 카드 배경 선택 */}
              <div className="control-section">
                <h3 className="section-step"><span>02</span> 카드 배경 테마</h3>
                <div className="bg-preset-grid">
                  {bgPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setBgPreset(preset)}
                      className={`preset-btn ${bgPreset.id === preset.id ? 'active' : ''}`}
                      style={{ background: preset.value }}
                      title={preset.name}
                      aria-label={`${preset.name} 배경 선택`}
                    >
                      <span className="preset-name">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: 문구 변경 */}
              <div className="control-section">
                <h3 className="section-step"><span>03</span> 메시지 커스터마이징</h3>
                <div className="input-group">
                  <label className="input-label">To. 받는 분</label>
                  <input 
                    type="text" 
                    value={toText}
                    onChange={(e) => setToText(e.target.value)}
                    maxLength={30}
                    className="customizer-input"
                    placeholder="Dear. 소중한 사람에게"
                  />
                </div>
                
                {/* 텍스트 영역이 한 문장 메시지 입력창으로 대폭 축소 및 1줄 입력화 */}
                <div className="input-group">
                  <label className="input-label">Message. 꽃말 밑 한 문장 메시지</label>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={50}
                    className="customizer-input"
                    placeholder="꽃말 밑에 들어갈 한 문장의 진심을 적어보세요."
                  />
                  <span className="char-count">{message.length}/50자</span>
                </div>
                
                <div className="input-group">
                  <label className="input-label">From. 보내는 분</label>
                  <input 
                    type="text" 
                    value={fromText}
                    onChange={(e) => setFromText(e.target.value)}
                    maxLength={30}
                    className="customizer-input"
                    placeholder="From. LuneFleur"
                  />
                </div>
              </div>

              {/* STEP 4: 글꼴 선택 */}
              <div className="control-section">
                <h3 className="section-step"><span>04</span> 글꼴 스타일</h3>
                <div className="font-preset-grid">
                  {fontPresets.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={`font-btn ${selectedFont.id === font.id ? 'active' : ''}`}
                      style={{ fontFamily: font.style }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-section">
                <button className="save-card-btn" onClick={handleSaveCard}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  카드 확정 및 이미지 저장하기
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSaveModal && (
        <div className="save-modal-overlay" onClick={handleCloseModal}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="modal-title">나만의 꽃말 카드 저장 완료</h3>
            <p className="modal-desc">
              귀하의 맞춤형 카드가 디자인 데이터베이스에 정식 등록되었습니다.<br />
              이 카드는 향수 패키지 발송 시 고급 캘리그라피 엽서로 동봉되어 배송됩니다.
            </p>
            <div className="modal-card-summary" style={{ background: bgPreset.value, color: bgPreset.textColor }}>
              <div className="summary-flower-name">{selectedFlower.month}월 {selectedFlower.nameKo} ({selectedFlower.nameEn})</div>
              <div className="summary-text" style={{ fontFamily: selectedFont.style }}>"{message}"</div>
            </div>
            <button className="modal-close-btn" onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardCustomizer;
