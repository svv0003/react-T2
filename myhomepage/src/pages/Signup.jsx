// 회원가입
import {useState} from "react";
import axios from "axios";

const Signup = () => {

    const [formData, setFormData] = useState({
        memberName:'',
        memberEmail:'',
        memberPw:'',
        memberPwConfirm:'',
        authKey:''
        /* 집주소, 전화번호 추가예정 */

    });
// 클라이언트가 회사가 원하는 방향으로 정보를 작성하지 않았을 경우 띄워주는 메세지 초기 표기
    const [message, SetMessage] = useState({
        email:'받을 수 있는 이메일을 입력하세요.',
        authKey:'',
        password : '영어, 숫자 6~20글자 사이로 입력해주세요.',
        fullname : "한글 2~5자 작성"
    })

    const [checkObj, setCheckObj] = useState({
        memberName:false,
        memberEmail:false,
        memberPw:false,
        memberPwConfirm:false,
        authKey:false
    })

    const [timer, setTimer] = useState({
        min:4,
        sec:59,
        active:false
    })
    // js 기능 추가
    /*
    동기   : 순차적으로 진행 은행 번호표 와 같이 순서대로.. 진행
    비동기 : 나중에 결과를 보여줄게 와 같은 약속을 한 상태에서 잠시 대기 상태로 둔 후,
             완료되면 해당 기능 완성
             커피 주문 ... 순서대로 나오지 않는 것과 같이 진행
   대표적으로 .then .catch 가 존재
        바로바로 js 를 실행하는 것이 아니라 백엔드 작업이 진행될동안 잠시
        js 상태 멈춘 상태로, 백엔드 결과가 나오면 js 아래 작업 진행
        결과에 따른 성공 실패 유무 클라이언트에게 전달

   async await 는 then catch 를 더 간략하게 작성하는 방법
   현재는 제일 많이 사용하는 형식
       async : 이 기능은 비동기 기능으로 js를 순차적으로 진행하기 보다는
               백엔드나 기타 기능을 중간중간 진행해야 하는 경우 아래 js 는 잠시 멈추고 기다릴 수 있다.
       await : 위 작업이 완료되고 결과가 전달될 때 까지 기다리는 상태
       await 가 작성된 코드 구문이 완료될 때 까지 하위 코드들은 잠시 작업 중단 상태
    *
    *
    * */
    const handleSubmit = async (e) => {
        // 제출관련 기능 설정
        e.preventDefault(); // 일시정시 제출상태
        // 필수 항목 체크
        if(!formData.memberName) {
            alert('이름을 입력해주세요.')
            return; // 돌려보내기 하위기능 작동x
        }
        // DB에 저장할 데이터만 전송
        // body 형태로 전달하기
        // requestBody requestParam
        //    body         header
        const signupData = {
            memberName:formData.memberName,
            memberEmail:formData.memberEmail,
            memberPassword:formData.memberPw,
        }
        const res = await axios.post("/api/auth/signup",signupData);
        if(res.data === "success" || res.status === 200) {
            console.log("res.data   : ",res.data);
            console.log("res.status : ",res.status);
            alert('회원가입이 완료되었습니다.');
            window.location.href="/";
        }  else if(res.data === "duplicate" )
             alert("이미 가입된 이메일 입니다.");
           else
            alert("회원가입에 실패하였습니다.");


        // axios.post
        // 백엔드는 무사히 저장되지만 프론트엔드에서 회원가입 실패가 뜬다.
        // 이를 해결하자
        // 비동기 vs 동기 무조건 알고있기
        // async - await : 백엔드 작업이 끝날때까지 기다린 후
        // 회원가입 결과 여부 확인
        //아래 코드는 백엔드 응답을 기다리지 않고, 바로 확인해서 회원가입 실패가 뜸
        /*
        const res = axios.post("/api/auth/signup",signupData);

        if(res.data === "success" || res.status === 200) {
            alert('회원가입이 완료되었씁니다.');
        } else {
            alert("회원가입에 실패하였습니다.");
        }

         */
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(p => ({
            // p 기존의 name과 name 에 해당하는 value 데이터 보유한 변수이름
            // ...p : 기존 name 키 value 데이터의 값에
            //     , [name] : value 이벤트가 감지된 name의 value 값으로
            //         데이터를 수정해서 추가
            //          없던 키-값 을 추가해서
            // formData 변수이름에 setter 로 저장
                ...p, [name] :value

        }))
    }
    return(
        <div className="page-container">

            <form onSubmit={handleSubmit}>

                <label htmlFor="memberEmail">
                    <span className="required">*</span> 아이디(이메일)
                </label>

                <div className="signUp-input-area">
                    <input type="text"
                           name="memberEmail"
                           value={formData.memberEmail}
                           onChange={handleChange}
                           placeholder="아이디(이메일)" maxLength="30"/>

                    <button id="sendAuthKeyBtn" type="button">인증번호 받기</button>
                </div>

                <span className="signUp-message" id="emailMessage">메일을 받을 수 있는 이메일을 입력해주세요.</span>


                <label htmlFor="emailCheck">
                    <span className="required">*</span> 인증번호
                </label>

                <div className="signUp-input-area">
                    <input type="text" name="authKey" id="authKey" placeholder="인증번호 입력" maxLength="6"
                           autoComplete="off"/>

                    <button id="checkAuthKeyBtn" type="button">인증하기</button>
                </div>

                <span className="signUp-message" id="authKeyMessage"></span>

                <label htmlFor="memberPw">
                    <span className="required">*</span> 비밀번호
                </label>

                <div className="signUp-input-area">
                    <input type="password"
                           name="memberPw"
                           value={formData.memberPw}
                           onChange={handleChange}
                           placeholder="비밀번호"
                           maxLength="20"/>
                </div>

                <div className="signUp-input-area">
                    <input type="password"
                           name="memberPwConfirm"
                           value={formData.memberPwConfirm}
                           onChange={handleChange}
                           placeholder="비밀번호 확인"
                           maxLength="20"/>
                </div>

                <span className="signUp-message" id="pwMessage">영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.</span>

                <label htmlFor="memberName">
                    <span className="required">*</span> 이름
                </label>

                <div className="signUp-input-area">
                    <input type="text" name="memberName"
                           value={formData.memberName}
                           onChange={handleChange}
                           placeholder="이름을 입력하세요."
                           maxLength="5"/>
                </div>

                <span className="signUp-message" id="nickMessage">한글 2~5글자</span>


                <label htmlFor="memberTel">
                    <span className="required">*</span> 전화번호
                </label>

                <div className="signUp-input-area">
                    <input type="text" name="memberTel" id="memberTel" placeholder="(- 없이 숫자만 입력)" maxLength="11"/>
                </div>

                <span className="signUp-message" id="telMessage">전화번호를 입력해주세요.(- 제외)</span>


                <label htmlFor="memberAddress">주소</label>

                <div className="signUp-input-area">
                    <input type="text" name="memberAddress" placeholder="우편번호" maxLength="6" id="postcode"/>

                    <button type="button" id="searchAddress">검색</button>
                </div>

                <div className="signUp-input-area">
                    <input type="text" name="memberAddress" placeholder="도로명/지번 주소" id="address"/>
                </div>

                <div className="signUp-input-area">
                    <input type="text" name="memberAddress" placeholder="상세 주소" id="detailAddress"/>
                </div>

                <button id="signUpBtn">가입하기</button>
            </form>
        </div>
    )
};


export default Signup;