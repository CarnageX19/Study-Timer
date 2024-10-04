import React from 'react';
import ThemeToggler from './ThemeToggler';
import { useSelector } from 'react-redux';
import LoginButton from './LoginButton';
import { useNavigate } from 'react-router-dom';

function Header() {
  const currentTheme = useSelector((state)=>state.theme.theme)
  const navigate = useNavigate()
  const headHome = ()=>{
    navigate("/")
  }
  return (
    <div className={`relative flex justify-between items-center p-4 
        ${currentTheme=='light'?'bg-gray-100':'bg-blue-900'}
    shadow-md`}>
      <h1 className={`text-xl 
        ${currentTheme=='light'?'text-black':'text-white'}
        font-semibold`} onClick={headHome}>Study Timer</h1>
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <LoginButton />
        <ThemeToggler />
      </div>
    </div>
  );
}

export default Header;
