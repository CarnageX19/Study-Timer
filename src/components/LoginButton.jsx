import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/AuthSlice'; // importing logout action

function LoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, email } = useSelector((state) => state.auth); // Selecting status and email from authSlice
  const currentTheme = useSelector((state)=>state.theme.theme)
  const handleLoginClick = () => {
    if (!status) {
      // If the user is not logged in, redirect to the login form
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    // If the user is logged in, logout using redux
    dispatch(logout());
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
