import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/AuthSlice";
import appwriteService from "../appwrite/backend";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.theme)
  const handleLogin = async () => {
    try {
      const isAuthenticated = await appwriteService.authenticateUser(email, password);
      
      if (isAuthenticated) {
        dispatch(login({ email }));
        navigate("/"); // Redirect to home after login
      }
      else
        setErrorMessage("Incorrect Username or Password")
    } catch (error) {
      setErrorMessage(error.message); // Show error message
    }
  };

  const handleSignup=()=>{
    navigate("/signup")
  }

  return (
    <div className={`
    ${currentTheme === 'light'?'bg-gray-100':'bg-blue-950'}
    flex items-center justify-center min-h-screen`}>
      <div className={`${currentTheme==='light'?'bg-white':'bg-blue-800'} 
        p-6 rounded-lg shadow-lg w-96`}>
        <h2 className={`
            ${currentTheme==='light'?'text-black':'text-white'}
            text-2xl font-semibold mb-4 text-center`}>Login</h2>
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        <button 
          onClick={handleSignup}
          className={`${currentTheme ==='light'?' text-blue-950':' text-white'}
            w-full py-2 rounded hover:bg-blue-600 transition duration-200`}
        >
          Dont Have an account? Signup
        </button>

        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
