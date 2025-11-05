import {createContext, useContext} from "react";
/* 1. Context 객체 생성

// Context를 저장하는 변수명은 무조건 대문자 시작

*/
const TestContext = createContext();

/* 4. 후손 컴포넌트 */
const GrandChild = () => {
    // 현재 컴포넌트에서 Content 객체를 얻어와 사용
    // TestContext 에서 제공하는 값 ('Parent 에서 전달한 값')을 얻어와
    // parentValue 에   대입
    const parentValue = useContext(TestContext);
    return(
        <>
        <h3>GrandChild Component ({parentValue}</h3>
        </>
    )
}

/* 3. 자식 컴포넌트 */
const Child = () => {
    return(
        <>
        <h2>Child Component</h2>
            <GrandChild />
        </>
    )
}
/* 2. 부모 컴포넌트 */
const Parent = () => {
    return (
            /* Context 객체를 이용해서 하위 컴포넌트에 value 제공 */
            <TestContext.Provider value='Parent에서 전달한 값'>
                <h1>Parent Component</h1>
                <Child />
            </TestContext.Provider>

    );
};

export default Parent;