import {useEffect, useState} from "react";

const Effect2 = () => {
    const [seconds, setSeconds] = useState(0);

    /*
    setInterval   : 시작 만 해놓고 종료를 안하면 메모리를 닫을 방법이 없음
    clearInterval : 종료

    자동시작을 한 후 버튼을 클릭해서 개발자와 회사가 원하는 특정 시간에 멈추고 싶다면
    useRef -> 내일
     */
    useEffect(() => {
       const timerId =  setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
            },1000);
          // 1000 ms = 1초

         // 시작한 타이머를 종료할 clear 설정
        // 뒷정리 함수
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div>
            <h2>자동 타이머</h2>
           <p>{seconds}초</p>
        </div>
    );
};

export default Effect2;