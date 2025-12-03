import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {goToPage, renderLoading} from "../service/commonService";
import {render} from "@testing-library/react";
import {fetchBoardDetail} from "../service/ApiService";

const BoardDetail = () => {
    const {id} = useParams(); //URL 에서 id 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBoardDetail(axios, id, setBoard, navigate, setLoading);
    }, [id]);

    // 로딩중 일 때
    if (loading) return renderLoading('게시물을 불러오는 중');

    if (!board) {
        renderLoading('게시물을 찾을 수 없습니다.');
        goToPage(navigate, "/board");
    }

    return (
        <div className="page-container">
            <h1 className="board-detail-title">
                {board.title}
            </h1>
            <div className="board-detail-info">
                <span>작성자 : {board.writer}</span>
                <span>조회수 : {board.viewCount}</span>
                <span>작성일 : {board.createdAt}</span>
            </div>
            <div className="image-preview">
                <img src={board.boardImage}
                     alt="게시물 사진"
                />
            </div>
            <div className="board-detail-content">
                {board.content}
            </div>
            <button className="button"
                    onClick={
                        () => goToPage(navigate, '/board')
                    }
            >
                목록으로
            </button>
        </div>
    );
};

export default BoardDetail;