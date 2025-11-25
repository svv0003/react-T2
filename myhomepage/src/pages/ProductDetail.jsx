import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {deleteProduct, fetchProductDetail, formatDate, formatPrice, renderLoading} from "../context/scripts";

/*

과제 4
재고가 10개 이상이면 개 글자를 뒤에 붙여주기
 */
const ProductDetail = () => {
    const {id} = useParams(); //URL 에서 id 가져오기
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductDetail(axios, id, setProduct, navigate, setLoading);
    }, [id]);

    // 삭제 버튼에 직접적으로 기능을 작성할 수 있지만
    // ui 와 js 환경을 구분하기 위하여 handleDelete 기능명칭으로 삭제 상태관리를 진행한다.
    const handleDelete = async () => {
            if(window.confirm("정말 삭제하시겠습니까?")) {
                await deleteProduct(axios, id, navigate);
            }
    }


    if(loading)  return renderLoading('게시물을 불러오는 중');

    if(!product) renderLoading('상품을 찾을 수 없습니다.');

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
                <div className="product-detail-price">
                        <span className="price-label">판매가</span>
                        <span className="price-value">{formatPrice(product.price)}원</span>
                </div>
                <div className="product-detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">상품코드</span>
                        <span className={"meta-value"}>{product.productCode}</span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">제조사</span>
                        <span className={"meta-value"}>{product.manufacturer || '-'}</span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">재고</span>
                        <span className={`meta-value ${product.stockQuantity < 10 ?'low-stock' : ''}`}>
                            {product.stockQuantity < 10 ?'매진 임박' : product.stockQuantity+'개'} {/* `${product.stockQuantity}개`*/}
                        </span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">판매상태</span>
                        <span className={"meta-value"}>
                            {/* mysql 은 boolean 데이터로 가능, oracle char 로 변경 확인하기

                            product.isActive : Y
                            ProductDetail.jsx:87 product.isActive : Y
                            {product.isActive ? '판매중'  : '판매중지'} 상태는
                             product.isActive가 'N' 이어도 값 존재 유무만 확인한 상태에서
                             값이 존재하면  true 가 발생하는 상황이기 때문에
                             판매중지임에도 판매중으로 표기됨
                            {product.isActive ? '판매중'  : '판매중지'}
                            데이터가 'Y' 가 맞을 경우에만 판매중으로 표기할 것이다.
                            */}
                            {console.log('product.isActive : ' + product.isActive)}
                            {product.isActive ==='Y' ? '판매중'  : '판매중지'}
                        </span>
                    </div>

                    <div className="meta-item">
                        <span className="meta-label">등록일</span>
                        <span className={"meta-value"}>{formatDate(product.createdAt)}</span>
                    </div>
                    {/*  수정날짜 존재하고 && 수정날짜랑 다른경우에만 생성일자가 &&  (ui를 표기하겠다.) */}
                    {product.updatedAt && product.updatedAt !== product.createdAt && (

                        <div className="meta-item">
                            <span className="meta-label">수정일</span>
                            <span className={"meta-value"}>{formatDate(product.updatedAt)}</span>
                        </div>
                        )}
                </div>
                {/* 상품 설명이 존재할 경우에만 상품 설명 ui를 보여주겠다. */}
                {product.description && (
                    <div className={"product-detail-description"}>
                        <h3>상품 설명</h3>
                        <p>{product.description}</p>
                    </div>
                )}
                {/* 아래 버튼은 로그인한 계정이 admin 일 경우 수정 / 삭제 가능하게 표기하기 */}
                <div className="product-detail-buttons">
                    <button
                        className="btn-edit"
                        onClick={()=>navigate(`/products/edit/${id}`)}>
                        수정
                    </button>
                    <button
                        className="btn-delete"
                        onClick={handleDelete}>
                        삭제
                    </button>
                    {/*
                    삭제 기능을 직접적으로 작성한 예제
                    <button
                        className="btn-delete"
                        onClick={() => {
                            if(window.confirm("정말 삭제하시겠습니까?")) {
                                 deleteProduct(axios, id, navigate);
                            } }}>
                        삭제
                    </button>
                    */}
                </div>

            </div>
        </div>
    )


}

export  default ProductDetail;