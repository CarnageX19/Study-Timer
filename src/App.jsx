import {Stopwatch} from './components'
import {Header} from './components'
import { Routes,Route } from 'react-router-dom'
import {LoginForm} from './components'
import {SignupForm} from './components'
function App() {

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
