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
            console.log("productAll" , r.data);
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
    const formattedDate = `${today.getFullYear()}년
                ${String(today.getMonth() + 1).padStart(2,'0')}월
                ${String(today.getDate()).padStart(2,'0')}일`;

    // 가격 포멧팅
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    }
    // 과제 : 상세보기와 같이 과제 클릭했을 때 이동 설정
    // 게시글 클릭
    const handleIDClick = (id) => {
        navigate(`/board/${id}`);
    }
    // 상품 클릭
    const handleProductClick = (productId) => {  navigate(`/product/${productId}`);};

    if(loading){
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner">
                        <p>로딩 중 ...</p>
                    </div>
                </div>
            </div>
        );
    }
    return(
    <div className="page-container">
        <h1>메인 페이지</h1>
        <p className="main-date">{formattedDate}</p>

        <section className="main-section">
            <div className="section-header">
                <h2>인기글</h2>
                <button
                    onClick={() => navigate('/board')}
                    className="view-more-btn">
                    더보기 →
                </button>
            </div>

            {boards.length > 0 ?(
                <ul className="board-list">
                    {boards.map((board) => (
                        <li key={board.id}
                            className="board-item"
                            onClick={() => handleIDClick(board.id)}
                        >
                            <span className="board-title">{board.title}</span>
                            <div className="board-meta">
                                <span className="board-author">{board.writer}</span>
                                <span className="board-views">{board.views}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ): (
                <p className="no-data">인기글이 없습니다.</p>
            )}
        </section>
        <section className="main-section">
            <div className="section-header">
                <h2>추천 상품</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="view-more-btn">
                    더보기 →
                </button>
            </div>

            {products.length > 0 ?(
                <ul className="main-product-grid">
                    {products.map((p) => (
                        <li key={p.id}
                            className="main-product-card"
                            onClick={() => handleProductClick(p.id)}
                        >
                           
                            <div className="main-product-image">
                                {p.imageUrl ?(
                                    <img src={p.imageUrl} alt={p.productName}
                                    onError={(e) =>{
                                        e.target.onerror=null;
                                        e.target.src="상품이 존재하지 않을 경우 기본 이미지 url 작성"
                                    }}
                                    />
                                ):(
                                    <div className="no-image">
                                       <img src="/static/img/default.png" alt="default"/>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ): (
                <p className="no-data">제품이 없습니다.</p>
            )}
        </section>

    </div>
    )
};


export default Main;