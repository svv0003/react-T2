// 메인 페이지 (인기글)
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log 로  res.data 데이터를 조회 F12
    useEffect( () =>{
       fetchBoards();
       fetchProducts();
    },[]);


const fetchProducts = async () => {
        try{
            const r=  await  axios.get("http://localhost:8085/api/product/all");
            setProducts(r.data);
        } catch (err) {
            alert("데이터를 백엔드에서 가져올 수 없습니다.")
        }finally {
        setLoading(false);
        }
}

    const fetchBoards = async () => {
        try{
            const r=  await  axios.get("http://localhost:8085/api/board/popular");
            setBoards(r.data.slice(0, 6)); // 0 ~ 5 번 까지의 상품 가져오기
        } catch (err) {
            alert("데이터를 백엔드에서 가져올 수 없습니다.")
        }finally {
            setLoading(false);
        }
    }
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