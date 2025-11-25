import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {useAuth} from "../context/AuthContext";
/*
과제 1: 새로 작성한 비밀번호와 비밀번호 확인이 일치하는지 여부 기능 완성
과제 2: 핸드폰번호 css 다른 input 창과 동일하게 스타일 작성
과제 3: 참고해서 주소검색 창 띄우기

function daumPostCode(){
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = '';

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if( data.userSelectedType === 'R') { //사용자가 도로명 주소를 사용할 경우 Road
                addr = data.roadAddress;
            } else { // === 'J' Jibun 을 선택했을 경우 지번주소를 가져온다.
                addr = data.jibunAddress;
            }

            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            document.getElementById("detailAddress").focus();
        }
    }).open();
}
document.querySelector("#searchAddress").addEventListener("click",daumPostCode);
            <label for="memberAddress">주소</label>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="우편번호" maxlength="6" id="postcode">
                <button type="button" id="searchAddress">검색</button>
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="도로명/지번 주소" id="address">
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="상세 주소" id="detailAddress">
            </div>
*/
const MyPageEdit = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    const [formData, setFormData] = useState({
        memberName: '',
        memberEmail: '',
        memberPhone: '',
        memberAddress: '',
        newPassword: '',
        currentPassword: '',
        confirmPassword: '',
    })

    const [validation, setValidation] = useState({
        memberPhone: true,
        newPassword: true,
        confirmPassword: true,
    })
    const [messages, setMessages] = useState({
        memberPhone: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const handleChange = () => {

    }

    const handleAddressSearch = () => {

    }
    // 게시물 작성, 수정, 상품 업로드 작성, 수정, 마이페이지 수정 동시 사용
    // 인자값 msg, navigate path
    const handleCancel = () => {
        if(window.confirm("수정을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")){
            navigate("/mypage");
        }
    };
    return (
        <div className="page-container">
            <h1>회원정보 수정</h1>
            <form onSubmit={handleSubmit}>
                {/* 이름 / 이메일 ( 읽기 전용) 수정 불가 */}
                <label>
                    <span className="required">*</span>이름
                    <input type="text"
                           name="memberName"
                           value={user?.memberName}
                           readOnly
                    />
                    <span className="form-hint">이름은 변경할 수 없습니다.</span>
                </label>
                <label>
                    <span className="required">*</span>이메일
                    <input type="text"
                           name="memberEmail"
                           value={user?.memberEmail}
                           readOnly
                    />
                    <span className="form-hint">이메일은 변경할 수 없습니다.</span>
                </label>
                <label>
                    <span className="required">*</span>핸드폰 번호
                    <input type="number"
                           name="memberPhone"
                           value={user?.memberPhone}
                           onChange={handleChange}

                    />
                </label>
                <label>
                    <span className="required">*</span>현재 비밀번호
                    <input type="text"
                           name="currentPassword"
                           value={formData.currentPassword}
                           onChange={handleChange}
                    />
                    <span className="form-hint">비밀번호를 변경하지 않으려면 비워두세요.</span>
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호
                    <input type="text"
                           name="newPassword"
                           value={formData.newPassword}
                           onChange={handleChange}
                           placeholder="영어, 숫자 포함 8자 이상"
                    />
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호 확인
                    <input type="text"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                    />
                    <span className={`signUp-message ${validation.confirmPassword && formData.confirmPassword ? 'confirm' :'error' } `}>
                        {messages.confirmPassword}
                    </span>
                </label>
                <label>
                    주소 : 
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberPostCode"
                               name="memberPostCode"
                               value={formData.memberAddress}
                               readOnly
                        />
                        <button
                            type="button"
                            onClick={handleAddressSearch}>
                            주소검색
                        </button>
                    </div>
                    
                   
                </label>
                <div className="form-buttons">
                    <button className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? '수정 중...' : '수정 완료'}
                    </button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={handleCancel}
                        disabled={isSubmitting}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MyPageEdit;