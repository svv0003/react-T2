import {useEffect, useState} from "react";
import axios from "axios";

/*
axios fetch
fetch : 브라우저에서 기본으로 가지고 있는 API 요청기능
fetch 업그레이드
 jquery : ajax  - 비동기
 react  : axios - API 요청을 쉽게 할 수 있게 도와주는 라이브러리
                 자동 JSON 변환(response.json() 생략)
                 404, 500 에러 처리 용이
                 요청 취소, 타임아웃 과 같은 부과 기능
                 npm i axios
                 yarn add axios
                 npm install axios
 */


const Effect3 = () => {
    // service.js 로 기능 추후 분리하기
    const API_BASE_URL = "http://localhost:8080";
    // 1. 데이터를 저장할 state 변수
    // 백엔드에서 가져온 데이터를
    // 화면에 보여주기위해 변수이름에 데이터 저장
    const [boards, setBoards] = useState([]); //전체 게시물 목록

    useEffect( () => {
        const res = axios.get(`${API_BASE_URL}/api/board/all`)
            .then(res => {
                setBoards(res.data);
                console.log(boards);
            })
            .catch( err => {
                alert("데이터를 가져오는 중 문제가 발생했습니다.")
            })
    },[])

    useEffect(() => {

    }, []); // []);  생략하는 순간 무한 로딩
    return (
        <div>
            <h1>게시판 전체 조회</h1>
            <h2>전체 게시물 (총 {boards.length} 개)</h2>
            <ul>
                {boards.map(b => (
                    <li>
                        <strong>{b.title}</strong>(작성자 : {b.writer})
                    </li>
                ))}


            </ul>
        </div>
    );
};

export default Effect3;