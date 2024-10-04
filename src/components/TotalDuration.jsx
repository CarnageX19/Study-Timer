import React from 'react';
import { useSelector } from 'react-redux';

function TotalDuration() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const savedRecords = JSON.parse(localStorage.getItem('study-record')) || {};
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const calculateTotalDuration = () => {
    const durations = savedRecords[today] || [];
    let totalSeconds = durations.reduce((acc, duration) => {
      const [hours, minutes, seconds] = duration.split(':').map(Number);
      return acc + (hours * 3600) + (minutes * 60) + seconds;
    }, 0);

    // Convert seconds back to a "HH:MM:SS" format
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalRemainingSeconds = totalSeconds % 60;

    return `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalRemainingSeconds.toString().padStart(2, '0')}`;
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div
      className={`flex justify-center items-center h-16 px-4 rounded-md shadow-md 
      ${currentTheme === 'light' ? 'bg-white text-black' : 'bg-blue-950 text-white'}`}
    >
      <h2 className="text-lg font-semibold">Total Duration Studied Today: {totalDuration}</h2>
    </div>
  );
}

export default TotalDuration;
