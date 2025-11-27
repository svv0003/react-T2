// 회원가입
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {clear} from "@testing-library/user-event/dist/clear";
import {handleInputChange} from "../service/commonService";
import {fetchSignup} from "../service/ApiService";

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
    const [message, setMessage] = useState({
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
    });
    const timerRef =useRef(null);


    // 초의 경우 지속적으로 1초마다 시간을 줄이고, 0분 0초 일 경우 인증 실패 처리
    // 3분 00초일 경우 59 초부터 다시 시작하도록 세팅
    useEffect(() => {
        if(timer.active) {
            timerRef.current = setInterval(() => {
                setTimer( p => {
                    // 분 초가 모두 0일 때 시간초 중지하고, 인증 실패로 종결
                    if(p.min === 0 && p.sec === 0 ) {
                        clearInterval(timerRef.current);
                        setCheckObj(p => ({...p,authKey: false}));
                        setMessage(p => ({...p, authKey: '시간이 만료되었습니다.'}));
                        return {...p, active:false};
                    }
                    // 초가 0 일 때는 59초부터 다시시작
                    if(p.sec === 0) {
                        return  { min: p.min -1 , sec:59, active:true};
                    }
                    // 이외에는 초를 1초마다 -1 씩 줄여서 전달
                    return  {...p, sec: p.sec -1};
                });
            },1000);
        }
        return () => clearInterval(timerRef.current);
    }, [timer.active]);


    /*
    handleSubmit handleChange 의 경우 특정 값을 반환하는 것이 아니라
    기능을 수행하는 목적을 가진 메서드
    zeroPlus 의 경우 메서드를 수행한 후, 수행된 결과를 표기
    zeroPlus 기능을 실행하고, 실행된 결과를 반환하는 return 이  필요

    1번 zeroPlus 기능
    const zeroPlus = (num) => {
       js 기능을 추가적으로 작성하고 , 작성된 결과를 return 반환하여 html 형태로 전달
       return(
        num < 10 ? `0${num}` : num
       )
    }

    2번 zeroPlus 기능
    {} 내부에 기능이 존재하고, 존재하는 기능의 결과를 삼항연산자를 이용해서 결과 반환하여 전달
    전달반환하는 return() 이 생략되서 에러 발생
    const zeroPlus = (num) => {  num < 10 ? `0${num}` : num }


    3번 zeroPlus 기능
    {} 작성을 생략하고 바로 return() 반환하는 형태로 작성으로 문제가 없음
    const zeroPlus = (num) => ( num < 10 ? `0${num}` : num )
    * */
    const zeroPlus = (num) => {
       return(
        num < 10 ? `0${num}` : num
       )
    };

    // 인증키와 관련된 백엔드 기능을 수행하고, 수행한 결과를 표기 하기 위하여
    // 백엔드가 실행되고, 실행된 결과를 res.status 형태로 반환하기 전까지 js 하위기능 잠시 멈춤 처리
    const sendAuthKey = async  () => {
        // 기존 인증실패해서 0분 0초인 상태를 4분 59초 형태로 변환하기
        clearInterval(timerRef.current);
        setTimer({min:4, sec:59, active:false});
        // 백엔드 응답 결과를 res 라는 변수이름에 담아두기
       const res =  await  axios.post('/api/email/signup',
                            formData.memberEmail,
                    {
                        headers: {'Content-Type': 'application/json'} // 글자형태로 전달설정
                    }
        );
       /*
           @Override
            public String sendMail(String htmlName, String email) {
            백엔드에서는  String 형태로 자료형을 반환하는데
            비교는 int 형태로 되어 있어 결과값은 항상 false 가 나옴

            if (res.data == 1){

        */
        //console.log("응답 데이터 : ",res.data);
        //console.log("응답 상태 : ", res.status);
       if(res.data === 1 ){
           setMessage(prev => ({...prev,authKey: '05:00'}));
           setTimer({min:4, sec:59, active: true});
           alert('인증번호가 발송되었습니다.');
       } else {
           alert('인증번호 발송 중 오류가 발생했습니다.');
       }
    }

    // async = 중간에 기다림이 있어야하는 기능입니다.
    // 만약에 await 가 작성되어 있는 구문은 백엔드나 다른 api에서 return 결과가 도착할 때 까지
    // 하위 js 코드를 실행하지 않고 잠시 기다립니다.
    // post 에서 url 과 data 는 필수 cookie 나 header 와 같은 속성전달은 선택사항
    // post("url",{data}) 필수 형태
    /*
    *  == 동등 타입 변환 하며, 값만 비교
    * === 일치 타입 변환 안함, 값 + 타입 모두 비교
    */
    const checkAuthKey = async () => {
        if(timer.min === 0 && timer.sec ===0) {
            alert('인증번호 입력 시간을 초과하였습니다.');
            return;
        }
        if (formData.authKey.length < 6 || formData.authKey.length > 6) {
            alert('인증번호를 정확히 입력해주세요.');
            return;
        }

        try { //프론트엔드에서 백엔드로 연결 시도
            console.log("이메일 : ",formData.memberEmail);
            console.log("인증키 : ",formData.authKey);
            const r = await axios.post(
                '/api/email/checkAuthKey', // 1번 데이터 보낼 백엔드 api endPoint 작성
                {                        // 2번 어떤 데이터를 백엔드에 어떤 명칭으로 전달할 것인지 작성
                    email: formData.memberEmail,
                    authKey: formData.authKey
                }                             // header 에 글자형태만 전달한다, 이미지나 파일데이터도 전달한다와 같은 구문을 작성해야할 경우 3번도 필요
            )
           // if (r.data.success === true) {
            if (r.data === 1) {
                clearInterval(timerRef.current);
                setTimer({min:0,sec: 0,active: false});
                setMessage(prev => ({...prev, authKey: '인증되었습니다.'}));
                setCheckObj(prev =>({...prev,authKey: true}));
                alert("인증이 완료되었습니다.");
            } else {
                setCheckObj(prev =>({...prev,authKey: false}));
                alert('인증번호가 일치하지 않습니다.');
            }
        } catch (err) { // 백엔드연결시도를 실패했을경우
            console.log("인증확인실패 : ",err);
            alert("인증 확인 중 서버에 연결되지 않는 오류가 발생했습니다.");
        }
    }









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
        e.preventDefault();
        await fetchSignup(axios,formData);


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
        handleInputChange(e,setFormData);
        // 개발자가 원하는 정규식이나, 입력형식에 일치하게 작성했는지 체크
    }
    return(
        <div className="page-container">

            <form onSubmit={handleSubmit}>

                <label htmlFor="memberEmail">
                    <span className="required">*</span> 아이디(이메일)
                    <span className="signUp-message" id="emailMessage">{message.email}</span>
                </label>

                <div className="signUp-input-area">
                    <input type="text"
                           name="memberEmail"
                           value={formData.memberEmail}
                           onChange={handleChange}
                           placeholder="아이디(이메일)" maxLength="30"/>

                    <button id="sendAuthKeyBtn"
                            onClick={sendAuthKey}
                            type="button"
                    >인증번호 받기</button>
                </div>



                <label htmlFor="emailCheck">
                    <span className="required">*</span> 인증번호
                    <span className="signUp-message" id="authKeyMessage">
                    {timer.active && (
                        <span style={{color: 'red', fontWeight: 'bold'}}>
                            {zeroPlus(timer.min)}:{zeroPlus((timer.sec))}
                        </span>
                    )}
                    {!timer.active && message.authKey && (
                        <span style={{color: checkObj.authKey ?'green' : 'red'}}>
                        {message.authKey}
                    </span>
                    )}
                </span>
                </label>

                <div className="signUp-input-area">
                    <input type="text"
                           name="authKey"
                           id="authKey"
                           placeholder="인증번호 입력"
                           value={formData.authKey}
                           onChange={handleChange}
                           maxLength="6"
                           autoComplete="off"/>

                    <button id="checkAuthKeyBtn"
                            type="button"
                            onClick={checkAuthKey}
                    >인증하기</button>
                </div>



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

                <span className="signUp-message" id="pwMessage">{message.password}</span>

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
                <span className="signUp-message" id="nickMessage">{message.fullname}</span>


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