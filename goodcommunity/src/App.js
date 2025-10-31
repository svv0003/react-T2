// logo 라는 명칭으로 사용하겠다. svg 파일을 가져와 파일 내부에서
import logo                        from './logo.svg';
import './App.css';

//import [여기서 사용할 이름] from [js or jsx 파일 경로]
import ComponentEx            from "./components/R01_ClassComponent"; // css 를 얻어오고 아래 작성된 컴포넌트에 적용
/* App 컴포넌트 (최상위 컴포넌트)
*
* 보통 맨 최상위 컴포넌트는 function 을 사용하여 최상위임을 표기
* 이외는 const 형식으로 주로 사용하여 일반 컴포넌트로 최상위 컴포넌트가 아님을 표기
*
* */
function App() {
    // js 와 관련된 코드를 작성하는 공간



    // return 내부에는 html 코드 작성
  return (
      /*
      fragment(<> </>) : 반환되는 요소(컴포넌트)를 묶는 용도, 해석 x
      css 가 없는 감싸는 태그로 활용할 때 사용
       */
   <>
       {/* 반드시 return 에서 시작과 끝을 감싸는 태그 하나 필요*/}

       <ComponentEx />
   </>
  );
}

export default App;
