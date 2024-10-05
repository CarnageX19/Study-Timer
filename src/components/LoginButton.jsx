import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/AuthSlice';

function LoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state)=>state.theme.theme)
  const status = useSelector((state) => state.auth.status)
  const handleLoginClick = () => {
      navigate("/login"); //redirect to login form
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    localStorage.getItem("study-timer-user")
    localStorage.removeItem("study-timer-user")
  };

  return (
    <div className={`rounded-lg p-1 ${currentTheme==='light' ? 'text-black bg-gray-300' : 'text-white bg-blue-500'}
    
    `}>
      {status ? (
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <button onClick={handleLoginClick}>Login to save progress</button>
      )}
    </div>
  );
}

export default LoginButton;
