import {Stopwatch} from './components'
import {Header} from './components'
import { Routes,Route } from 'react-router-dom'
import {LoginForm} from './components'
import {SignupForm} from './components'
import authReducer, { login } from './features/AuthSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


function App() {

  const dispatch = useDispatch()
  useEffect(()=>{
    const email  = localStorage.getItem("study-timer-user") || null
    if(email)
    {
      dispatch(login({email}))
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
