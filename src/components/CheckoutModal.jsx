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
              <option value="f1">탄생화 문장 패키지 - 수선화 (1월)</option>
              <option value="f2">탄생화 문장 패키지 - 제비꽃 (2월)</option>
              <option value="f3">탄생화 문장 패키지 - 데이지 (3월)</option>
              <option value="f4">탄생화 문장 패키지 - 스위트피 (4월)</option>
              <option value="f5">탄생화 문장 패키지 - 은방울꽃 (5월)</option>
              <option value="f6">탄생화 문장 패키지 - 장미 (6월)</option>
              <option value="f7">탄생화 문장 패키지 - 델피늄 (7월)</option>
              <option value="f8">탄생화 문장 패키지 - 글라디올러스 (8월)</option>
              <option value="f9">탄생화 문장 패키지 - 아스터 (9월)</option>
              <option value="f10">탄생화 문장 패키지 - 금잔화 (10월)</option>
              <option value="f11">탄생화 문장 패키지 - 국화 (11월)</option>
              <option value="f12">탄생화 문장 패키지 - 포인세티아 (12월)</option>
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
