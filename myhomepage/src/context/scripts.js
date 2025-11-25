/*************************************
 컴포넌트 들에서 공통으로 사용하는 기능 작성하는 js
 ********************************** */

// 기능을 나눌 때 여러 ui 태그에서 반복적으로 사용하는 기능인가?

// 기태 : 로딩 기능
// ========== 로딩 관련 함수 ==========
export  const renderLoading = (message = '로딩중') => {
    return(
        <div className="page-container">
            <div className="loading-container">
                <div className="loading-spinner">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
// 로딩 후 데이터가 존재하지 않을 경우
export const renderNoData = (message = '데이터가 없습니다.') => {
    return(
        <div className="no-data">
            <p>{message}</p>
        </div>
    )
}


// 로딩 상태 관리 래퍼 함수
// abc 에 해당하는 데이터 가져오기 기능을 수행하고,
// 데이터가 무사히 들어오면 로딩 멈춤
export const withLoading = async (abc, setLoading) => {
    if(setLoading) setLoading(true);
    try{
        await abc();
    } finally {
        if(setLoading) setLoading(false);
    }
}
// 연희 : 네비게이트
// ========== 네비게이트 관련 함수 ==========
// 게시글 상세보기로 이동
/*
goToPage 하나면 navigateToBoard navigateToProduct 필요하지 않는다.
export  const navigateToBoard = (navigate, boardId) => {
    navigate(`/board/${boardId}`);
}

export  const navigateToProduct = (navigate, productId) => {
    navigate(`/product/${productId}`);
}

//  navigateToBoard navigateToProduct goToPage 만 있으면 필요 없음
*/
export  const goToPage = (navigate, path) => {
    navigate(path);
}



export  const goBack = (navigate, confirmMessage = null) => {
    if(confirmMessage) {
        if(window.confirm(confirmMessage))  navigate(-1);
    } else  navigate(-1);
}










// 유성 : fetchProduct
// ========== API 데이터 페칭 관련 함수 ==========
/*
const API_URL 의 경우 내부에서만 사용할 수 있도록 설정된 상태
외부에서 사용 가능한 형태로 변경하길 원한다면
export const API_URL 로 export를 추가하면 된다.

export const API_URLS의 경우 외부 내부 어디서든 활용 가능하도록 설정
내부에서만 사용 가능한 형태로 변경하길 원한다면
export 를 제거한다.
* */
const API_URL = 'http://localhost:8085'

export const API_URLS = {
    AUTH :`${API_URL}/api/auth`,
    BOARD :`${API_URL}/api/board`,
    PRODUCT :`${API_URL}/api/product`,
    EMAIL :`${API_URL}/api/email`
}
export  const fetchAllProducts= async (axios, setProducts, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.PRODUCT}/all`);
        setProducts(res.data);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}
export  const fetchProductDetail= async (axios, id, setProduct, navigate, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.PRODUCT}/${id}`);
        setProduct(res.data);
    } catch (error) {
        alert("상품 정보를 불러올 수 없습니다.");
        navigate("/products"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}
export  const fetchAllBoards = async (axios, setBoards, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/all`);
        setBoards(res.data);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}

export  const fetchAllPopularBoards = async (axios, setBoards, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/popular`);
        setBoards(res.data);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}



export  const fetchBoardDetail= async (axios, id, setBoard, navigate, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/${id}`);
        setBoard(res.data);
    } catch (error) {
        alert("게시물 정보를 불러올 수 없습니다.");
        navigate("/board"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}

// 세원 : 날짜포멧팅

// 윤선 : 가격포멧팅
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
}
// 형빈 : 카테고리









