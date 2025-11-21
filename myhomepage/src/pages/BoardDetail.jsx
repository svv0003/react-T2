import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const BoardDetail = () => {
    const {id} = useParams(); //URL 에서 id 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8085/api/board/${id}`)
            .then((res => {
             //   console.log(res.data);
                setBoard(res.data);
                // 3. 로딩상태 해지
                setLoading(false);
            }))
            .catch(e => {
                alert("게시물을 불러올 수 없습니다.");
                navigate('/board'); //게시물 전체 목록으로 돌려보내기
            })
    }, [id, navigate]);

    // 로딩중 일 때
    if(loading) {
        return <div className="page-container">로딩 중 ...</div>
    }
    return (
        <div className="page-container">
            <h1 className="board-detail-title">{board.title}</h1>
            <div className="board-detail-info">
                <span>작성자 : {board.writer}</span>
                <span>조회수 : {board.viewCount}</span>
                <span>작성일 : {board.createdAt}</span>
            </div>
            <div className="board-detail-content">
                {board.content}
            </div>
            <button className="button" onClick={() => navigate('/board')}>
                목록으로
            </button>

        </div>
    );
};

export default BoardDetail;