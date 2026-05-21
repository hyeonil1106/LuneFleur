import React from 'react';
import '../styles/components/CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          &times;
        </button>
        <h3 className="modal-title">주문 정보 입력</h3>
        <p className="modal-subtitle">상품 옵션과 배송지를 입력해주세요.</p>
        
        <form className="checkout-form" onSubmit={(e) => {
          e.preventDefault();
          alert('결제가 성공적으로 처리되었습니다!');
          onClose();
        }}>
          <div className="form-group">
            <select id="product" required defaultValue="">
              <option value="" disabled hidden>상품 옵션을 선택해주세요</option>
              <option value="rose">탄생화 문장 패키지 - 장미 (5월)</option>
              <option value="lily">탄생화 문장 패키지 - 백합 (6월)</option>
              <option value="sunflower">탄생화 문장 패키지 - 해바라기 (8월)</option>
              <option value="custom">커스텀 탄생화 문장 패키지</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" id="name" placeholder="받는 분 성함 (예: 홍길동)" required />
            <input type="tel" id="phone" placeholder="연락처 (예: 010-1234-5678)" required className="mt-2" />
          </div>
          <div className="form-group">
            <input type="text" id="address" placeholder="기본 주소 (예: 서울특별시 강남구...)" required />
            <input type="text" id="detailAddress" placeholder="상세 주소 (예: 101동 101호)" required className="mt-2" />
          </div>
          <button type="submit" className="payment-btn">결제하기</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
