import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StudyLog, TotalDuration } from '../components';
import appwriteService from '../appwrite/backend';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);
  const currentUser = useSelector((state)=>state.auth.email);

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

  const getTimeString = () => {
    const TimeString =
      ('0' + Math.floor((time / 3600) % 60)).slice(-2) +
      ':' +
      ('0' + Math.floor((time / 60) % 60)).slice(-2) +
      ':' +
      ('0' + (time % 60)).slice(-2);
    return TimeString;
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const save = () => {
    if (time === 0) return;

    const date = new Date();
    const today = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const currentTimestamp = getTimeString();
    const savedRecords = JSON.parse(localStorage.getItem('study-record')) || {};
    const todayRecords = savedRecords[today] || [];
    todayRecords.push(currentTimestamp);
    savedRecords[today] = todayRecords;

    localStorage.setItem('study-record', JSON.stringify({ [today]: todayRecords }));

    if (currentUser) {
      appwriteService.addDuration(currentUser, JSON.stringify({ [today]: todayRecords }));
    }

    setTime(0);
    setIsActive(false);
  };

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  return (
    <div className={`flex flex-col md:flex-row justify-center items-center h-screen px-10 pb-20 
      ${currentTheme === 'light' ? 'bg-white' : 'bg-blue-950'}`}> {/* Added bottom padding */}
      <TotalDuration />
      <div className="flex-grow flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className={`w-64 h-64 border-4 ${currentTheme === 'light' ? 'border-blue-500' : 'border-white'} rounded-full flex justify-center items-center`}>
            <span className={`text-5xl ${currentTheme === 'light' ? 'text-blue-700' : 'text-white'}`}>
              {getTimeString()}
            </span>
          </div>
          <div className="mt-4 flex space-x-4">
            <button onClick={toggle} className={`px-4 py-2 text-white ${isActive ? 'bg-red-500' : 'bg-green-500'} rounded`}>
              {isActive ? 'Stop' : 'Start'}
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={reset}>
              Reset
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow-0 w-full md:w-2/3 lg:w-1/3 flex justify-center mt-8 md:mt-0">
        <StudyLog />
      </div>
    </div>
  );
}

export default Stopwatch;
