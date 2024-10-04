import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/ThemeSlice';

function ThemeToggler() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  // Function to handle theme change on slider toggle
  const handleSliderChange = () => {
    dispatch(changeTheme());
  };

  return (
    <div className="relative">
      <label className="flex items-center cursor-pointer">
        <span className="mr-2 text-sm text-gray-700">Dark Mode</span>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={handleSliderChange}
          className="toggle-checkbox hidden"
        />
        <div
          className={`
            w-10 h-6 
            ${theme === 'light' ? 'bg-gray-300' : 'bg-blue-800'} 
            rounded-full shadow-inner toggle-label relative 
            border-2 
            ${theme === 'light' ? 'border-blue-950' : 'border-white'}`}
        >
          <div
            className={`w-4 h-4 bg-blue-500 rounded-full shadow absolute top-1 transition-transform ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default ThemeToggler;
