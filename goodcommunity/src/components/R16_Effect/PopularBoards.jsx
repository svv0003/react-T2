import {useEffect, useState} from "react";

const PopularBoards = () => {
    const API_BASE_URL = "http://localhost:8080";
    const [popBoards, setPopBoards] = useState([]);

    useEffect(() => {
        // axios.get 을 이용해서 인기 게시물 데이터 가져오기
    }, []);
    return (
        <>
            <h2>  인기게시물 </h2>
            <ul>
                {popBoards.map(p => (
                    <li>
                        <strong>게시물 명칭 (저자)</strong>

                    </li>
                ))}
            </ul>
        </>
    );
};

export default PopularBoards;