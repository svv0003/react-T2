import React, { useState } from 'react';

// 자식 1: 섭씨 입력 - 한국 유럽 대부분의 국가
const CelsiusInput = ({ value, handler }) => {
    return (
        <div>
            <label>섭씨 (°C): </label>
            {/* input 만들기 */}
            <input

            placeholder="온도를 입력하세요."
            />
        </div>
    );
}

// 자식 2: 화씨 표시 -- 할 것 없음! 미국에서 주로 사용
const FahrenheitDisplay = ({ celsius }) => {
    // 화씨 계산
    const fahrenheit = (celsius * 9/5) + 32;
    return (
        <div>
            {/* 화씨 표시 */}
            {celsius === '' ?'-' :fahrenheit.toFixed(2)};
        </div>
    );
}

// 자식 3: 캘빈 표시 -- 할 것 없음!  물리학 화학 용어로 사용
const KelvinDisplay = ({ celsius }) => {
    // 캘빈 계산
    const kelvin = parseFloat(celsius) + 273.15;
    return (
        <div>
            {celsius === '' ?'-' :kelvin.toFixed(2)};
        </div>
    );
}

// 부모 컴포넌트
const TemperatureConverter = () => {
    // 여기에 코드 작성
    // 1. useState로 섭씨 온도 상태 만들기
    const [celsius,setCelsius] = useState('');

    // 2. 온도 변경 핸들러  만들기     만들어주세요~!
    const handleTemperatureChange = (e)=>{
        setCelsius(e.target.value);
    }
    // 3. 초기화 핸들러 만들기          만들어주세요~!
    const handleReset = () => {
        setCelsius('');
    }
    // 4. 온도에 따른 메시지 조건부 렌더링
    const getTemperatureMessage = () => {
        const temp = parseFloat(celsius);
        
        // if  else if 이용해서 return 으로 "추워요 적당해요 더워요" 반환
    }
    /*
    - 0도 미만: "🥶 추워요"
    - 0~25도: "😊 적당해요"
    - 25도 초과: "🥵 더워요"
     */
    return (
        <div>
            <h2>온도 변환기</h2>
            {/* CelsiusInput */}
            <CelsiusInput value={celsius} handler={handleTemperatureChange} />
            {/* FahrenheitDisplay */}
            <FahrenheitDisplay celsius={celsius} />
            {/* KelvinDisplay */}
            <KelvinDisplay celsius={celsius} />
            {/* 온도 메시지 */}
            {getTemperatureMessage()}
            {/* 초기화 버튼 */}
            <button onClick={handleReset}>
                초기화
            </button>
        </div>
    );
}

export default TemperatureConverter;