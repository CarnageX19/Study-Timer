import React from 'react';
import ThemeToggler from './ThemeToggler';
import { useSelector } from 'react-redux';

function Header() {
  const currentTheme = useSelector((state)=>state.theme.theme)

  return (
    <div className={`relative flex justify-between items-center p-4 
        ${currentTheme=='light'?'bg-gray-100':'bg-blue-900'}
    shadow-md`}>
      <h1 className="text-xl font-semibold">Study Timer</h1>
      <div className="absolute top-4 right-4">
        <ThemeToggler />
      </div>
    </div>
  );
}

export default Header;
