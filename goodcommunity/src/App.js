// logo 라는 명칭으로 사용하겠다. svg 파일을 가져와 파일 내부에서
import logo                        from './logo.svg';
import './App.css';

//import [여기서 사용할 이름] from [js or jsx 파일 경로]
import ComponentEx            from "./components/R01_ClassComponent";
import FunctionEx             from "./components/R02_FunctionComponent";
import PropsEx1 from "./components/R03_Props1";
import MyProfile from "./components/practices/day1/MyProfile";
import Greeting from "./components/practices/day1/Greeting";
import Product from "./components/practices/day1/Product";
import Weather from "./components/practices/day1/Weather";
import PropsEx3 from "./components/R05_Props3";
import ChildComponent from "./components/R06_Props4";
import R08_State1 from "./components/R08_State1";
import State2 from "./components/R09_State2";
import ParentComponent from "./components/R10_State3";
import ParentState from "./components/R10_State3_Components/ParentState";
import Parent from "./components/R12_Context2";
import Effect1 from "./components/R13_Effect1";
import Effect2 from "./components/R14_Effect2";
import Effect3 from "./components/R15_Effect3_axios";
import PopularBoards from "./components/R16_Effect/PopularBoards"; // css 를 얻어오고 아래 작성된 컴포넌트에 적용
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
       {/*<ParentComponent />
       <ParentState />
        <Parent />

       <Effect1/>
       <Effect2 />

       <Effect3 />
       */}
       <PopularBoards/>
       {/*
       <R08_State1 />
       <State2 init={50} step={10} />
        */}


       {/*
       <ComponentEx />
       <FunctionEx />
       */}

       {/*
       PropsEx1 라는 함수에 데이터를 전달하는 방식
       전달할 데이터에서 변수이름 job 이 존재하지 않기 때문에
       job 을 받는 곳의 데이터는 null 상태로 보여짐

       <PropsEx1 num='1' name='홍길동' age='20' score='90'/>
       <PropsEx1  name='고말숙' age='30' num='2' score='100'/>
       <PropsEx3 name="강감찬" age='72' gender='남자' />
       <ChildComponent name={'고말숙'}/>
       <ChildComponent name={'김영희'}/>
       <MyProfile
           name="홍길동"
           age={20}
           school="서울대학교"
       />

       <Greeting message="안녕하세요! React 입니다" />

       <Product productName="노트북" price={1500000} />
       <Product productName="마우스" price={30000} />

       <Weather city="서울" temperature={25} />
       <Weather city="부산" temperature={28} />
        */}
   </>
  );
}

export default App;
