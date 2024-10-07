import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/backend";
import { login } from "../features/AuthSlice";
import HomeButton from "./HomeButton";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const currentTheme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignup = async () => {
    try {
      const accountExists = await appwriteService.doesAccountExist(email);

      if (accountExists) {
        setErrorMessage("Account already exists. Please login.");
      } else {
        await appwriteService.createAccount(email, password);
        dispatch(login({email}))
        navigate("/")
      }
    } catch (error) {
      setErrorMessage(error.message); 
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className={`${currentTheme === 'light' ? 'bg-gray-100' : 'bg-blue-950'} flex items-center justify-center min-h-screen`}>
      <div className={`${currentTheme === 'light' ? 'bg-white' : 'bg-blue-800'} p-6 rounded-lg shadow-lg w-96`}>
        <h2 className={`${currentTheme === 'light' ? 'text-black' : 'text-white'} text-2xl font-semibold mb-4 text-center`}>Sign Up</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>

        <button
          onClick={handleLoginRedirect}
          className={`${currentTheme === 'light' ? 'text-blue-950' : 'text-white'} w-full py-2 rounded hover:bg-blue-600 transition duration-200 mt-4`}
        >
          Already have an account? Login
        </button>
        <div className="flex justify-center mt-6">
          <HomeButton />
        </div>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignupForm;
