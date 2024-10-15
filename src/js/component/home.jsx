import React, { useState, useEffect } from "react";
import "../../styles/index.css";
import { FaClock } from "react-icons/fa"; 

// create your first component
const Home = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [targetTime, setTargetTime] = useState(""); 

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => (countdown ? prev - 1 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, countdown]);

  useEffect(() => {
    if (countdown && seconds <= 0) {
      setIsRunning(false);
      alert("¡Cuenta regresiva finalizada!");
    }
    if (seconds === parseInt(targetTime)) {
      alert(`¡Has alcanzado los ${targetTime} segundos!`);
    }
  }, [seconds, countdown, targetTime]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleCountdown = () => {
    const value = parseInt(prompt("Ingrese un número para la cuenta regresiva:"));
    if (isNaN(value) || value <= 0) return;
    setCountdown(true);
    setSeconds(value);
    setIsRunning(true);
  };

  return (
    <div className="counter-container">
      <div className="clock-icon">
        <FaClock />
      </div>
      {String(seconds).padStart(6, "0").split("").map((digit, index) => (
        <div key={index} className="digit-box">
          {digit}
        </div>
      ))}
      <div className="buttons-container">
        <button onClick={start}>Iniciar</button>
        <button onClick={stop}>Parar</button>
        <button onClick={reset}>Reiniciar</button>
        <button onClick={handleCountdown}>Cuenta Regresiva</button>
        <input
          type="number"
          placeholder="Alerta en..."
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;