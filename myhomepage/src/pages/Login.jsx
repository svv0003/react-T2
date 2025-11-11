// 로그인
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext";

// 게시물이나, 회원가입에서 사용하는 방식
// 단순 로그인과 비밀번호 찾기, 아이디 찾기에서는 지양하는 방식
const LoginHandleChangeVersion = () => {
    /*
        const handleChange = (e) => {     const {name, value} = e.target;    }
        를 사용할 경우에는
        const [memberEmail, setMemberEmail] = useState('');
        const [memberPassword, setMemberPassword] = useState('');
        필요하지 않음
    */
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState( {
        memberEmail : '', //  초기 값만 한 번에 관리
        memberPassword:''

    })
    /**
     * value onChang 에러 해결
     * 제출 방지, useEffect 활용해서 backend api post 형태로 연동
     */
    const handleSubmit = () => {

    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(기존데이터 => ({
            ...기존데이터, [name] : value // [name] 은 memberEmail 또는 memberPassword 가 된다.
        }))
        // 기존에 formData에 내장되어 있는 name 에 해당하는 데이터 를 클라이언트가 작성한대로 ...복사하여
        // 덮어쓸 키의 name 과 데이터를 저장
    }
    return (
        <div className="page-container">
            <div className="login-box">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>이메일
                        <input type="email"
                        id="memberEmail"
                               placeholder="이메일을 입력하세요"
                               name="memberEmail"
                               value={formData.memberEmail}
                               onChange={handleChange}
                        />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>비밀번호
                            <input type="password"
                                   id="memberPassword"
                                   name="memberPassword"
                                   placeholder="비밀번호 입력하세요"
                                   value={formData.memberPassword}
                                   onChange={handleChange}
                            />
                        </label>
                    </div>
                    {message && (<div className="error-message">{message}</div> )}
                    <button className="button">로그인</button>
                </form>
                <div className="login-footer">
                    <p>계정이 없으신가요?<Link to="/signup">회원가입</Link></p>
                </div>
            </div>

        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const {loginFn} = useAuth(); // 변수명칭 뿐만 아니라 기능 명칭 또한 {} 로 형태로 가져와서 사용
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(''); //이전 오류 메세지 초기화

        if(!memberEmail || !memberPassword) {
            setMessage('이메일과 비밀번호를 입력하세요.');
            return; // 돌려보내기
        }
        // console.log로 로그인 결과 유무를 확인하고자 할 경우
        // const a = loginFn(memberEmail,memberPassword);
        // console.log("로그인 결과 : ", a);
        loginFn(memberEmail,memberPassword)
            .then(result => {
                if(result.success){
                    alert("로그인 성공하였습니다.");
                    navigate("/");
                } else{
                    // 로그인 실패에 대한 메세지 전달
                    setMessage(result.message);
                }
            })
        
        
        
    /*
    AuthContext.js 에서 작성한 loginFn 기능 을 사용해서 로그인 기능 사용
        axios.post('http://localhost:8085/api/auth/login',
            {memberEmail,memberPassword},
            {withCredentials:true})
            .then(
                res => {
                    // 2. 요청성공(200 ~ 299)
                    // 서버가 응답을 성공적으로 보냈을 때 실행
                    alert("로그인 성공하였습니다.");
                }
            )
            .catch( err => {
                console.error("로그인 에러 : ", err);
                setMessage("로그인 중 오류가 발생했습니다.");
            })
    */


        ; // session 유지를 위한 쿠키 전송


    }

    return (
        <div className="page-container">
            <div className="login-box">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>이메일
                            <input type="email"
                                   id="memberEmail"
                                   placeholder="이메일을 입력하세요"
                                   value={memberEmail}
                                   onChange={(e) => setMemberEmail((e.target.value))}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>비밀번호
                            <input type="password"
                                   id="memberPassword"
                                   placeholder="비밀번호 입력하세요"
                                   value={memberPassword}
                                   onChange={(e) => setMemberPassword((e.target.value))}
                            />
                        </label>
                    </div>
                    {message && (<div className="error-message">{message}</div> )}
                    <button className="button">로그인</button>
                </form>
                <div className="login-footer">
                    <p>계정이 없으신가요?<Link to="/signup">회원가입</Link></p>
                </div>
            </div>

        </div>
    );
};

export default Login;