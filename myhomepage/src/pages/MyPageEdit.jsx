import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {handleChange, handleInputChange} from "../context/scripts";
/*
과제 1: 새로 작성한 비밀번호와 비밀번호 확인이 일치하는지 여부 기능 완성
*/
const MyPageEdit = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    const [formData, setFormData] = useState({
        memberName: '',
        memberEmail: '',
        memberPhone: '',
        memberPostCode:'',
        memberAddress: '',
        memberDetailAddress: '',
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
    /*
    업로드, 업데이트 와 같은 모든 사이트에서 활용하는 공통 기능
    scripts.js 이동하여 상태관리를 진행하고 재사용
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(p => ({
            ...p,
            [name]: value
        }))
    }
    */
    const handleCheckChange = (e) => {
       // const {name, value} = e.target;
        handleInputChange(e, setFormData);
    }

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = '';

                if( data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                setFormData(p => ({
                    ...p,
                    memberPostCode : data.zonecode,
                    memberAddress: addr
                }))

             /*
              코드를
              document.getElementById('postcode').value = data.zonecode;
              document.getElementById('address').value = addr;
              리액트에서는
              memberPostCode : data.zonecode,
              memberAddress: addr
                    사용한다.

              */
                document.getElementById("detailAddress")?.focus();
            }
        }).open();
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
                    {/*
                    type = number
                    int byte short long 과 같은 숫자계열은
                    맨 앞에 있는 0을 생략한 상태로 값을 저장하기 때문에
                    주민등록번호에서 00년생 ~ 09년생의 경우 앞에 있는 0이 자동으로 새략


                    */}
                    <span className="required">*</span>핸드폰 번호
                    <input type="text"
                           name="memberPhone"
                           value={user?.memberPhone}
                           onChange={handleCheckChange}

                    />
                </label>
                <label>
                    <span className="required">*</span>현재 비밀번호
                    <input type="text"
                           name="currentPassword"
                           value={formData.currentPassword}
                           onChange={handleCheckChange}
                    />
                    <span className="form-hint">비밀번호를 변경하지 않으려면 비워두세요.</span>
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호
                    <input type="text"
                           name="newPassword"
                           value={formData.newPassword}
                           onChange={handleCheckChange}
                           placeholder="영어, 숫자 포함 8자 이상"
                    />
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호 확인
                    <input type="text"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleCheckChange}
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
                               placeholder="주소 검색을 클릭하세요"
                               onClick={handleAddressSearch}
                               readOnly
                        />
                        <button
                            type="button"
                            onClick={handleAddressSearch}>
                            주소검색
                        </button>
                    </div>
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberAddress"
                               name="memberAddress"
                               value={formData.memberAddress}
                               placeholder="도로명/지번 주소"
                               onClick={handleAddressSearch}
                               readOnly />
                    </div>
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberDetailAddress"
                               name="memberDetailAddress"
                               value={formData.memberDetailAddress}
                               placeholder="상세 주소를 입력하세요."
                               onChange={handleCheckChange}
                               required />
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