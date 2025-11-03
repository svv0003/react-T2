import {useState} from "react";
import ChildIdState from "./ChildIdState";
import ChildPwState from "./ChildPwState";

/**
React 에서 매우 중요한 상태 끌어올리기(Lifting State Up) Pattern

 부모 컴포넌트가 모든 데이터(상태)와 그 데이터를 변경하는 함수를 가지고 있고,
 그 자식 컴포넌트(ChildIdState, ChildPwState) 는 부모로부터 그 함수를 전달받아
 실행만 하는 구조이며,
 자식 컴포넌트는 UI를 중점으로 코딩 기술

 부모 컴포넌트 = 기능, 데이터 중점으로 코드 작성
 자식 컴포넌트 = 기능과 데이터는 부모에게 전달받고, UI를 중점으로 코드 작성
 */
const ParentState = () => {

    // useState를 이용해서 id, pw 라는 모든 상태 값을 관리
    // 위 상태들을 변경하는 함수 (idHandler, pwHandler) 도 모두 정의

    // 상태관리할 변수 명칭들 초기 세팅
    // 모든 상태관리를 부모 컴포넌트에 작성하기 때문에
    // 전체 상태 핸들링 조정이 편리함
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 각 기능들 명세
    const idHandler = (e) => {
        setId(e.target.value);
    };

    const pwHandler = (e) => {
        setPw(e.target.value);
    };

    return (
        <>
            {/* 자식들에게 기능을 전달할 때,

            <자식컴포넌트 자식내부에서 확인할 기능 명칭={부모내부에 작성한 기능 제목} />
            <ChildIdState                       handler={         idHandler         } />
            ChildIdState 컴포넌트 내부에서는 idHandler 라는 기능을 전달 받을 때
            handler 라는 이름으로 기능을 전달받아 사용한다.
            */}
            <ChildIdState handler={idHandler} />
            <ChildPwState handler={pwHandler} />
            <div className="wrapper">
                <button disabled={id.length === 0 || pw.length === 0} >
                    Login
                </button>
            </div>

        </>
    );
};

export default ParentState;