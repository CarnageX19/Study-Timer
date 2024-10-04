import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const currentTheme = useSelector((state)=> state.theme.theme)
  // Timer functionality to count seconds
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Function to toggle the start/stop button
  const toggle = () => {
    setIsActive(!isActive);
  };

  // Function to reset the stopwatch
  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className={
        `flex justify-center items-center h-screen
        ${currentTheme==='light'?'bg-white':'bg-blue-950'}`
        }>
      <div className="flex flex-col justify-center items-center">
        {/* Stopwatch circular dial */}
        <div className={`w-64 h-64 border-4 
            ${currentTheme==='light'?'border-blue-500':'border-white'}
            rounded-full flex justify-center items-center`}>
          <span className={`text-5xl 
                ${currentTheme==='light'?'text-blue-700':'text-white'}`}>
            {("0" + Math.floor((time / 3600) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
            {("0" + (time % 60)).slice(-2)}
          </span>
        </div>
        {/* Buttons */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={toggle}
            className={`px-4 py-2 text-white ${
              isActive ? 'bg-red-500' : 'bg-green-500'
            } rounded`}
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
