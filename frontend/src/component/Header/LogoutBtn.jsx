  import React from 'react'
 
  import { useDispatch } from 'react-redux'
import authService from '../../Api.js/auth'
import token123 from '../../key/key'
import { logout } from '../../store/authSlice'
  

  export default function LogoutBtn() {
      const dispatch = useDispatch()
      const token = localStorage.getItem(token123)
      const handleLogout=async()=>{
        try {
          await authService.logout(token)
              localStorage.removeItem(token123)
              localStorage.removeItem('userData')
              dispatch(logout())

        } catch (error) {
           console.log("LogoutBtn error: ", error)
        }
      }
      
    return (
      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={handleLogout}>Logout</button>
    )
  }
