import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {handleInputChange} from "../service/commonService";
import {fetchMypageEdit, fetchMypageEditWithProfile, getProfileImageUrl} from "../service/ApiService";
import axios from "axios";

const MyPageEdit = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated , updateUser, loading} = useAuth();
    console.log("user : " , user);
    // 페이지 리랜더링이 될 때 현재 데이터를 그대로 유지하기위해 사용
    // 새로고침되어도 초기값으로 돌아가는 것이 아니라 현재 상태를 그대로 유지
    const fileInputRef = useRef(null);
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
        memberProfileImage: ''
    })
    const [profileImage, setProfileImage] = useState('');
    const [profileFile, setProfileFile] = useState(null);
    const [isUploading, setUploading] = useState(false);
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

    useEffect(() => {
        // 로딩중이 종료되었고, 백엔드에서 로그인한 결과가 존재하지 않는게 맞다면
        if (!loading && !isAuthenticated)  navigate("/login");
    },[loading, isAuthenticated, navigate]);

    useEffect(() =>{
        if(user) {
            setFormData(prev => ({
                ...prev,
                memberName: user.memberName || '',
                memberEmail: user.memberEmail || '',
                memberPhone: user.memberPhone || '',
                memberAddress: user.memberAddress || '',
                memberProfileImage: user.memberProfileImage
            }));
            // 프로필 이미지 설정
            setProfileImage(getProfileImageUrl(user));
        }
    },[user?.memberEmail]); // user.memberemail 이 변경될 때만 실행





    // set 해서 값을 추가하면서 추가된 값이 일치하는가 확인
    // handleInputChange 내부에 formData 활용
    // formData에 내장된 새비밀번호와 비밀번호 확인이 일치하는지 체크
    const handleCheckChange = (e) => {
        const {name, value} = e.target;
        // const {name, value} = e.target;
        handleInputChange(e, setFormData);

        /*
         * 새 비밀번호 입력하고 비밀번호 확인 까지 입력
         * 그 후에 새 비밀번호를 변경할 수 있는 가능성이 있기 때문에
         * 새 비밀번호 = 비밀번호확인 일치하는지 체크 후
         * 새 비밀번호 변경하면 비밀번호 확인까지 같이 변경할 수 있도록 세팅
         */
        // 새 비밀번호 입력 시 -> 비밀번호 확인과 비교
        if (name === "newPassword") {
            const isMatch = value === formData.confirmPassword;

            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));

            setMessages(prev => ({
                ...prev,
                confirmPassword: formData.confirmPassword
                    ? (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                    : ""
            }));
        }
        if (name === "confirmPassword") {
            const isMatch = value === formData.newPassword;

            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));

            setMessages(prev => ({
                ...prev,
                confirmPassword: value
                    ? (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                    : ""
            }));
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // 단순히 값이 존재하는지 확인 값이 존재하면 okokokokookokok!!!!!!!
        // d
        if(formData.currentPassword || formData.newPassword || formData.confirmPassword) {
            if(!formData.currentPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                return;
            }
            if(!validation.newPassword ) {
                alert("새 비밀번호를 입력해주세요.");
                return;
            }

            if(!validation.confirmPassword) {
                alert("비밀번호 확인을 입력해주세요.");
                return;
            }

        }
        fetchMypageEdit(axios, formData, navigate, setIsSubmitting);
        // fetchMypageEditWithProfile(axios, formData, profileFile,navigate, setIsSubmitting);
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
    // 프로필 이미지 클릭 시 파일 선택
    const handleProfileClick = () => {
        fileInputRef.current?.click();
    }
    // 프로필 이미지 파일 선택
    const handleProfileChange = async  (e) => {
        const file = e.target.files[0];
        if(!file) return;

        // 이미지 파일인지 확인 이미지 파일이 아닌게 맞을경우
        if(!file.type.startsWith("image/")){
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }

        // 파일 크기 확인 (5MB)
        if(file.size > 5 * 1024 * 1024) {
            alert("파일 크기는 5MB 를 초과할 수 없습니다.");
            return;
        }

        // 미리보기 표기
        const reader = new FileReader();
        reader.onloadend = (e) => {
            setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
        // 파일 저장
        setProfileFile(file);
        await  uploadProfileImage(file);
    }
    const uploadProfileImage = async (file) => {
        setUploading(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);
            uploadFormData.append("memberEmail", user.memberEmail);
            const res = await  axios.post('/api/auth/profile-image', uploadFormData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            if(res.data.success === true) {
                alert("프로필 이미지가 업데이트 되었습니다.");
                setProfileImage(res.data.imageUrl);
                
                // 세션에서 최신 사용자 정보 가져오기
                const sessionRes = await axios.get("/api/auth/check", {
                    withCredentials: true
                });
                
                if(sessionRes.data.user) {
                    updateUser(sessionRes.data.user); //전역 user 상태 업데이트
                }
            }
        }catch (error) {
            alert(error);
            setProfileImage(user?.memberProfileImage ||'/static/img/default-profile.svg');
        } finally {
            setUploading(false);
        }
    }


    return (
        <div className="page-container">
            <h1>회원정보 수정</h1>
            <form onSubmit={handleSubmit}>
                <div className="profile-image-section">
                    <label>프로필 이미지</label>
                    <div className="profile-image-container" onClick={handleProfileClick}>
                        <img src={profileImage}
                             className="profile-image"
                        />
                        <div className="profile-image-overlay">
                            {isUploading ? "업로드 중..." : '이미지 변경'}
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef}
                           onChange={handleProfileChange}
                           accept="image/*"
                           style={{ display: 'none' }}
                    />
                    <span className="form-hint">이미지를 클릭하여 변경할 수 있습니다.(최대 5MB)</span>
                </div>




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
                           value={formData.memberPhone}
                           onChange={handleCheckChange}
                    />
                </label>
                <label>
                    <span className="required">*</span>현재 비밀번호
                    <input type="password"
                           name="currentPassword"
                           value={formData.currentPassword}
                           onChange={handleCheckChange}
                    />
                    <span className="form-hint">비밀번호를 변경하지 않으려면 비워두세요.</span>
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호
                    <input type="password"
                           name="newPassword"
                           value={formData.newPassword}
                           onChange={handleCheckChange}
                           placeholder="영어, 숫자 포함 8자 이상"
                    />
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호 확인
                    <input type="password"
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