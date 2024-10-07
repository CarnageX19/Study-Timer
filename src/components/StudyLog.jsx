import React from 'react';
import { useSelector } from 'react-redux';

export default function StudyLog() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const records = JSON.parse(localStorage.getItem('study-record')) || {};

  return (
    <div className="flex justify-end w-full p-6">
      <div className={`p-6 w-full md:w-2/3 lg:w-1/2 ${currentTheme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} rounded-lg shadow-lg`}>
        <h2 className={`text-2xl mb-4 ${currentTheme === 'light' ? 'text-black' : 'text-white'}`}>
          Study Log
        </h2>
        {Object.keys(records).length === 0 ? (
          <p className={`${currentTheme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            No records found.
          </p>
        ) : (
          Object.entries(records).map(([date, times], index) => (
            <div key={index} className="mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${currentTheme === 'light' ? 'text-black' : 'text-white'}`}>
                {date}
              </h3>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                {times.map((time, i) => (
                  <li key={i} className={`${currentTheme === 'light' ? 'text-black' : 'text-white'}`}>
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
