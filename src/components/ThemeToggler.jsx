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
            {theme === 'light' ? (
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-black mr-4">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
            ) : (
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-white mr-4">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                </svg>
            )}

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
