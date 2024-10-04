import React from 'react'
import { useSelector } from 'react-redux'

function UserDisplay() {
  const status = useSelector((state)=>state.auth.status)
  const user = useSelector((state)=>state.auth.email)
  const theme = useSelector((state)=>state.theme.theme)

  if(status)
    {
        return (
            <div className={`${theme === 'dark'?'text-white':'text-black'}`}>
                {user}
            </div>
        )
    }
  return null
}

export default UserDisplay