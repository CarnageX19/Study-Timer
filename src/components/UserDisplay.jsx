import React,{useState} from 'react'
import { useSelector } from 'react-redux'

function UserDisplay() {
  const status = useSelector((state)=>state.auth.status)
  const user = useSelector((state)=>state.auth.email)
  const theme = useSelector((state)=>state.theme.theme)
  const [hover, setHover] = useState(false);

  if(status)
    {
      const initials = user ? user.substring(0, 2).toUpperCase() : '';
        return (
          <div
          className="relative flex items-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full cursor-pointer 
            ${theme === 'light' ? 'bg-gray-400 text-white border-blue-500' : 'bg-gray-800 text-white border-white'}
            border-2`}
          >
            {initials}
          </div>
  
          {/* Full email on hover */}
          {hover && (
            <div
              className={`absolute top-full left-0 mt-2 p-2 text-sm shadow-lg 
              ${theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-800 text-white'}`}
            >
              {user}
            </div>
          )}
        </div>
        )
    }
  return null
}

export default UserDisplay