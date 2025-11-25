import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {fetchAllProducts, formatPrice, goToPage, renderNoData} from "../context/scripts";

// ctrl + alt + l -> 코드 정렬 단축키

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // null -> [] 변경
    const [filterProduct, setFilterProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectCategory, setSelectCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');

    const categories = ["전체", "전자기기", "의류", "식품", "도서", "생활용품", "기타"];


    useEffect(() => {
        // 현재는 setFilterProduct 로 상품 조회 하지만 setProducts 로 변경
        fetchAllProducts(axios, setFilterProduct);
        //  fetchAllProducts(axios, setProducts);
    }, []);

    useEffect(() => {
        filterProducts();

    }, [selectCategory, searchKeyword, products]);


    const filterProducts = async () => {
        // products 를 spread 이용해서 배열 복제
        let filtered = [];

        // 카테고리 필터

        // 검색필터 = 양옆 공백제외

        // 카테고리나, 검색된 filtered 를 setter 이용해서 filterProduct 에 저장

    };

    const handleSearch = (e) => {
        e.preventDefault();
        filterProducts();
    }
    /*
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }
    */
    const handleProductClick = (id) => {
        goToPage(navigate, `/product/${id}`)
    }


    return (
        <div className="page-container product-list-container">
            <div className="product-header">
                <h2>상품 목록</h2>
                <button className="btn-add-product"
                        onClick={() => navigate(`/product/upload}`)}>
                    + 상품등록
                </button>
            </div>

            {/* 카테고리 필터 */}
            <div className="category-filter">
                {categories.map((c) => (
                    <button
                        key={c}
                        className={`category-btn ${selectCategory} === c ? "active" : ""}`}
                        onClick={() => setSelectCategory(c)}>
                        {c}
                    </button>
                ))}
            </div>

            {/*  검색 박스  */}
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="상품명, 상품코드, 제조사로 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button>검색</button>
            </form>

            {/* 상품 개수 */}
            <div className="product-count">
                총 <strong>{filterProduct.length}</strong>개의 상품
            </div>

            {/* 상품 목록*/}
            {filterProduct.length > 0 ? (
                    <div className="product-grid">
                        {filterProduct.map((product) => (
                            <div key={product.id}
                                 className="product-card"
                                 onClick={() => handleProductClick(product.id)}>
                                <div className="product-image">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.productName}/>
                                    ) : (
                                        <img src="/static/img/default.png" alt="default"/>
                                    )}
                                </div>
                                <div className="product-info">
                                    <span className="product-category">{product.category}</span>
                                    <h3 className="product-name">
                                        {product.productName}
                                    </h3>
                                    <p className="product-code">
                                        {product.productCode}
                                    </p>
                                    <p className="product-manufacturer">
                                        {product.manufacturer}
                                    </p>
                                    <div className="product-footer">
                                    <span className="product-price">
                                        {formatPrice(product.price)}원
                                    </span>
                                        <span
                                            className={`product-stock ${product.stockQuantity < 10 ? "매진임박" : ""}`}></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                renderNoData('상품이 존재하지 않습니다.')
            }
        </div>
    )
}

export default Products;