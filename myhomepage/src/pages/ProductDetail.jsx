import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


const ProductDetail = () => {
    const {id} = useParams(); //URL 에서 id 가져오기
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]); // id 값이 조회될 때마다 상품 상세보기 데이터 조회

    const fetchProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:8085/api/product/${id}`);
            setProduct(res.data);
        } catch (err) {
            alert("상품 정보를 불러올 수 없습니다.");
            // 소비자가 url로 상품 상세보기 데이터 접속할 경우, 제품목록창으로 돌려보내기
            navigate("/products");
        } finally {
            setLoading(false);
        }
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    }

    if(loading){
        return (
            <div className="page-container">
                <div className="loading-container">
                    <p className="no-data">상품을 찾을 수 없습니다.</p>
                </div>
            </div>
        )
    }
    return(
        <div className="page-container">
            <div className="product-detail-header">
                <h1>상품 상세정보</h1>
                <button className="btn-back"
                onClick={()=>navigate("/products")}
                >
                    ← 목록으로
                </button>
            </div>
            <div  className="product-detail-image">
                {product.imageUrl
                    ?
                    <img src={product.imageUrl}
                         alt={product.productName}
                    />
                    :
                    <img src="/static/img/default.png"
                         alt="default"
                    />}
            </div>
            <div className="product-detail-info">
                <div className="product-detail-category">
                    {product.category}
                </div>
                
                <h2 className="product-detail-name">
                    {product.productName}
                </h2>
                
                <div className="product-detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">상품코드</span>
                    </div>
                </div>
            </div>
        </div>
    )


}

export  default ProductDetail;