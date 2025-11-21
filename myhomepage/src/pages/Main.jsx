// 메인 페이지 (인기글)
import {useEffect, useState} from "react";
import axios from "axios";

const Main = () => {
    const [boards, setBoards] = useState([]);
    // console.log 로  res.data 데이터를 조회 F12
    useEffect( () =>{
        axios.get("http://localhost:8085/api/board/popular")
            // 1. 어떤 언어 코드에서든
            // 하나의 기능을 작성할 경우 {} 생략
            // .then(res => res.data)
            // 다른 기능을 할 필요를 못느껴서!
            .then(res => {
                console.log(res.data); // System.out.print 데이터 확인
                setBoards(res.data);  // 확인된 데이터 배열에 넣어주기
            })
            .catch(e =>{
                alert("데이터를 백엔드에서 가져올 수 없습니다.")
            })
    },[]);

    // 오늘 날짜 포멧팅
    // react가 아닌
    // javascript 에서 기본으로 사용할 수 있는 날짜 표현법
    // getMonth 의 경우 0월 ~ 11월 로 되어 있어 어떤 언어에서든 +1 을 해줌
    // .padStart(2,'0') 형식을 어떻게 시작할 것인가
    // 2자리 숫자로 맞출 것인데 하나의 자리만 존재한다면 맨 앞에 0 추가
    // 5월 11일 -> 05월 11일 형태로 자리수를 맞춰 표기
    const today = new Date();
    const 회사가원하는형식의날짜표현 = `${today.getFullYear()}년
                ${String(today.getMonth() + 1).padStart(2,'0')}월
                ${String(today.getDate()).padStart(2,'0')}일`;
    return(
    <div className="page-container">
        <h1>메인 페이지</h1>
        <p> {회사가원하는형식의날짜표현} 인기글 목록</p>

        <ul >
                {/*
                html 내부에서 {} 는
                자바스크립트에서 선언한
                변수이름 상수이름 기능구현을 작성
                */}
                {boards.map((b => (
                    <li key={b.id}> {b.title}</li>
                )
                ))}

        </ul>


    </div>
    )
};


export default Main;