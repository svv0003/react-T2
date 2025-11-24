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
// 세원 : 날짜포멧팅
// 윤선 : 가격포멧팅
// 형빈 : 카테고리