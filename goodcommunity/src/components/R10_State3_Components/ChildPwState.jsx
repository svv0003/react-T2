import {useState} from "react";

// 자식 내부에서 input 값에 변경이 일어나면
// 부모에게 handler 라는 명칭으로 변경된 내용 전달하며
// handler 는 부모와 자식을 상호작용 할 수 있도록 해주는 중간다리역할의 변수 이름
const ChildPwState = ({handler}) => {
    return(
        <div className="wrapper">
            <label>PW
                <input type="password" id="inputPw" onChange={handler} />
            </label>
        </div>
    )
}

export default ChildPwState;