import React from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Board from "./pages/Board";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import BoardWrite from "./pages/BoardWrite";
import './App.css';
import BoardDetail from "./pages/BoardDetail";
import {useAuth} from "./context/AuthContext";
import NotificationToast from "./components/NotificationToast";
import ProductUpload from "./pages/ProductUpload";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import MyPageEdit from "./pages/MyPageEdit";
import ProductEdit from "./pages/ProductEdit";
// 단순히 가져와서 적용할 때는 from 생략
// 1. 라우팅에 필요한 컴포넌트 임포트
//    공통 스타일 임포트
// 2. useAuth 훅 임포트

function App() {
    const {user, isAuthenticated, logoutFn} = useAuth();

    // 로그아웃 처리 기능
    const handleLogout = () => {
        logoutFn()                                      // AuthContext 에서 가져온 로그아웃 기능
            .then(                                      // 로그아웃 백엔드 연결을 성공하고
                result => {                             // 성공결과로
                    if (result.success) {                // success 를 전달받으면
                        alert("로그아웃 되었습니다.");  // 클라이언트에게 로그아웃되었음을 알림
                    }
                }
            )
    }
    return (
        <div className="App">
            {/* 모든 곳에서 실시간 알림 토스트 */}
            <NotificationToast/>
            {/* --- 5. 공통 내비게이션 바 --- */}
            <nav className="navbar">
                <Link to="/" className="logo">myhomepage</Link>
                <div className="nav-links">
                    <NavLink to="/">메인</NavLink>
                    <NavLink to="/board">게시판</NavLink>
                    <NavLink to="/products">상품</NavLink>


                    {/* 로그인 상태에 따라 다른 메뉴 표시 */}
                    {isAuthenticated ? /* return 이 생략된 형태 */(
                        <>
                            <NavLink to="/write">글쓰기</NavLink>
                            <NavLink to="/mypage">마이페이지</NavLink>
                            <NavLink to="/upload">상품 업로드</NavLink>

                            <button onClick={handleLogout}
                                    className="logout-btn"
                            >
                                로그아웃
                            </button>

                            {/* /api/auth/check 에서 로그인 상태가 확인되어야지 표기 */}
                            <span className="user-email">
                                {user?.memberEmail}
                            </span>
                        </>
                    ) : (<NavLink to="/login">로그인</NavLink>)
                    }
                </div>
            </nav>

            {/* --- 6. 페이지가 렌더링될 영역 --- */}
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/board" element={<Board/>}/>
                <Route path="/board/:id" element={<BoardDetail/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/mypage/edit" element={<MyPageEdit/>}/>
                <Route path="/write" element={<BoardWrite/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/product/edit/:id" element={<ProductEdit/>}/>
                <Route path="/upload" element={<ProductUpload/>}/>


            </Routes>

            {/* 공통 푸터 - 모든 페이지에 보이는 footer 작성 */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>myhomepage</h3>
                        <p>&copy; 2025 All rights reserved.</p>
                    </div>
                    {/*
                    React 에서는 a 태그 대신 Link 태그를 사용하지만
                    Link 태그는 웹 페이지에서 a 태그로 변환됨
                    css 를 적용할 때는 Link 라는 태그 대신에 a 태그에 css 적용
                    Link 태그 내부에 a 태그 속성이 존재함
                    a 태그의 경우 html 이나 외부 링크 주소로 이동하는 속성을 지니고 있기 때문에
                    이 속성을 리액트에 맞추어 변환시켜 Link 태그 형태로 사용하는 것
                     <div className="footer-section">
                        <h4>링크</h4>
                        <Link to="/">메인</Link>
                        <Link to="/board">게시판</Link>
                        <Link to="/write">글쓰기</Link>
                    </div>
                    .footer-section a { // 메인 게시판 글쓰기에 적용되는 스타일시트
                        display: block;
                        color: #bdc3c7;
                        text-decoration: none;
                        margin: 5px 0;
                        transition: color 0.3s;
                    }

                    .footer-section a:hover {
                        color: #3498db;
                    }




                    */}
                    <div className="footer-section">
                        <h4>링크</h4>
                        <Link to="/">메인</Link>
                        <Link to="/board">게시판</Link>
                        <Link to="/write">글쓰기</Link>
                    </div>
                    <div className="footer-section">
                        <h4>문의</h4>
                        <p>Email : contact@myhomepage.com</p>
                        <p>Tel : 02-1234-5678</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default App;
