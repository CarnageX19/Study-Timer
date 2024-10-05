import {Stopwatch} from './components'
import {Header} from './components'
import { Routes,Route } from 'react-router-dom'
import {LoginForm} from './components'
import {SignupForm} from './components'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import appwriteService from './appwrite/backend'
import { logout,login } from './features/AuthSlice'

function App() {

  const dispatch = useDispatch()
  
  const checkExistence = async(email)=>{// function to check if account exists for a given email
    try {
      const res = await appwriteService.doesAccountExist(email)
      return res || null
    } catch (error) {
      console,log(`checkExistence error ${error}`)
      throw error
    }
  }

  const loginIfExists = async(email)=>{
    try {
      const exists = await checkExistence(email)
      if(exists)
      {
        dispatch(login({email}))
      }
      else
      {
        dispatch(logout())//clear state variable from unknown email
        localStorage.removeItem("study-timer-user")//clear local storage from unknown email
      }
    } catch (error) {
      console.log(`loginIfExists error ${error}`)
      throw error
    }
  }

  useEffect(()=>{
    const email  = localStorage.getItem("study-timer-user") || null
    if(email)
    {
      //Login only if email exists in the database
      //this is to prevent someone modifying the local storage with incorrect email
      loginIfExists(email)
    }
    else
    {
      dispatch(logout())
      localStorage.removeItem("study-timer-user")
    }
  },[])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Stopwatch />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  )
}

export default App
