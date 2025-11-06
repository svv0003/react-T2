import React, { useState } from 'react';

const CelsiusInput = ({ value, handler }) => {
    return (
        <div>
            <label>섭씨 (°C): </label>
            <input
                value={value}
                onChange={handler}

            placeholder="온도를 입력하세요."
            />
        </div>
    );
}

const FahrenheitDisplay = ({ celsius }) => {
    const fahrenheit = (celsius * 9/5) + 32;
    return (
        <div>
            {celsius === '' ?'-' :fahrenheit.toFixed(2)};
        </div>
    );
}

const KelvinDisplay = ({ celsius }) => {
    const kelvin = parseFloat(celsius) + 273.15;
    return (
        <div>
            {celsius === '' ?'-' :kelvin.toFixed(2)};
        </div>
    );
}

const TemperatureConverter = () => {
    const [celsius,setCelsius] = useState('');
    const handleTemperatureChange = (e)=>{
        setCelsius(e.target.value);
    }
    const handleReset = () => {
        setCelsius('');
    }
    const getTemperatureMessage = () => {
        const temp = parseFloat(celsius);
        if(temp < 0 ) {
            return <div>추워요</div>;
        } else  if( temp <= 25) {
            return <div>적당해요</div>;
        } else {
            return <div>더워요</div>;
        }
    }
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