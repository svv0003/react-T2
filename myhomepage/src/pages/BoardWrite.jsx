// 글쓰기
import {useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {handleChangeImage, handleInputChange} from "../service/commonService";
import {boardSave} from "../service/ApiService";
/*
TODO : 게시물 작성 페이지에서 게시물 관련 이미지 추가 넣기
1. 게시물 작성 시 게시물 이미지 선택하는 label 추가하기
2. 이미지만 선택 가능하도록 input 설정하고, 숨기기
3. 이미지 선택 시 해당 이미지가 보이도록 변경하기
 */
/*
user?.memberEmail = 삼항연산자의 줄임표현
user 객체가 존재하면 user.memberEmail 반환
user 가  null 또는 undefined 라면 에러 없이 undefined 반환

const email = user.memberEmail;
        의 경우 user가 null 일 경우 error 발생

const email = user?.memberEmail'
        의 경우 user가 null 일 경우 undefined 발생


user?.memberEmail 아래와 동일하게 작동

user ? user.memberEmail : undefined 형태

let email;
if (user) {
      email = user.memberEmail;
} else {
      email = undefined;
}
* */
const BoardWrite = () => {
    // form 데이터 내부 초기값
    // 작성자 -> 나중에 로그인한 아이디로 박제 변경불가하게
    // react-router-dom 에 존재하는 path 주소 변경 기능 사용
    const navigate = useNavigate();
    const {user, isAuthenticated, logoutFn} = useAuth();
    const fileInputRef = useRef(null);

    const [uploadedImageFile, setUploadedImageFile] = useState(null);   // 실제 DB 업로드 및 파일 폴더 저장할 이미지 파일
    const [boardImagePreview, setBoardImagePreview] = useState(null);   // 이미지 미리보기 URL
    const [boards, setBoards] = useState({
        title: '',
        content: '',
        writer: user?.memberEmail || '',
        imageUrl: ''
    })
    /*
    imageFile : 업로드할 이미지 파일 따로 저장
    imageUrl  : 클라이언트가 input창에 넣어준 데이터
     */
    const [isUploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    /*
    @boards                 상태 관리 변수명, 기능 객체
        언제 사용?          input, textarea 등에서 value = {boards.title} 형태로 화면에 표시한다.
        업데이트            setBoards()를 통해 값을 변경할 때
        예시                사용자가 제목을 입력하면 boards.title에 저장된다.

    @boardUploadFormData    백엔드에 데이터 전송하기 위한 formData 특수 객체
        타입                 파일 업로드를 위한 HTML5 API
        언제 사용?           axios.post()로 서버에 데이터를 전송할 때
        특징                 JSON + 파일 데이터를 함께 전송 가능하다. (multipart/form-data)
        예시                 제목, 내용(JSON) + 이미지 파일을 한 번에 전송할 때
     */

    const handleSubmit = async (e) => {
        e.preventDefault(); //제출 일시 중지
        try {
            /*
            1. imageUrl 제외한 나머지 데이터 JSON 변환하기
            2. 게시물 작성자에 로그인 user 아이디 넣기
            3. boardDataBlob
             */
            const boardUploadFormData = new FormData();
            const {imageUrl, ...boardDataWithoutImage} = boards;
            boardDataWithoutImage.writer = user?.memberEmail;
            const boardDataBlob = new Blob(
                [JSON.stringify(boardDataWithoutImage)],
                {type: "application/json"}
            );
            boardUploadFormData.append("board", boardDataBlob);
            if (uploadedImageFile) {
                boardUploadFormData.append("imageFile", uploadedImageFile);
            }
            await boardSave(axios, boardUploadFormData, navigate);
        } catch (err) {
            alert("서버에 문제가 발생했습니다.")
        }
    };
    //export const formatPrice = (price) => {
    //     return new Intl.NumberFormat("ko-KR").format(price);
    // }
    const handleChange = (e) => {
       handleInputChange(e, setBoards);
    }
    // ok를 할 경우 게시물 목록으로 돌려보내기   기능이 하나이기 때문에 if 다음 navigate 는 {} 생략 후 작성
    const handleCancel = () => {
        if (window.confirm("작성을 취소하시겠습니까?")) navigate('/board');
    }
    return (
        <div className="page-container">
            {isAuthenticated ? /* return 이 생략된 형태 */(
                <>
                    <h1>글쓰기</h1>
                    <form onSubmit={handleSubmit}>
                        {/* 로그인 상태에 따라 다른 메뉴 표시
                         formData.writer 에 user?.memberEmail 데이터를 전달하기
                         */}
                        <div className="writer-section">
                            <label>작성자 :</label>
                            <div className="writer-display">
                                <span className="writer-email">{user?.memberName}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl" className="btn-upload">
                                게시물 이미지 추가하기
                            </label>
                            <input
                                type="file"
                                id="imageUrl"
                                name="imageUrl"
                                ref={fileInputRef}
                                onChange={handleChangeImage(setBoardImagePreview, setUploadedImageFile, setBoards)}
                                accept="image/*"
                                style={{display: 'none'}}
                            />
                            <small className="form-hint">
                                게시물 이미지를 업로드 하세요. (최대 5MB, 이미지 파일만 가능)
                            </small>

                            {boardImagePreview && (
                                <div className="image-preview">
                                    <img
                                        src={boardImagePreview}
                                        alt="미리보기"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '400px',
                                            marginTop: '10px',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: '5px'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <label>제목 :
                            <input type="text"
                                   id="title"
                                   name="title"
                                   value={boards.title}
                                   onChange={handleChange}
                                   placeholder="제목을 입력하세요."
                                   maxLength={200}
                                   required
                            />
                        </label>
                        <label>내용 :
                            <textarea
                                id="content"
                                name="content"
                                value={boards.content}
                                onChange={handleChange}
                                placeholder="내용을 입력하세요."
                                rows={15}
                                required
                            />
                        </label>
                        <div className="form-buttons">
                            <button type="submit"
                                    className="btn-submit">
                                작성하기
                            </button>
                            <button
                                type="button"
                                className="btn-cancel "
                                onClick={handleCancel}
                            >
                                돌아가기
                            </button>
                        </div>

                    </form>
                </>
                ) : (
                navigate('/login')
                )
            }
        </div>
    )
};


    export default BoardWrite;