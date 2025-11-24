import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Header } from './component/index.js'
import token123 from './key/key.js'
import { login}  from './store/authSlice.js'

function App() {
  const [Loading, setLoading] = useState(true)
  const navigate=useNavigate();
  const dispatch=useDispatch();


   useEffect(() => {
 
    const token = localStorage.getItem(token123);
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (token && userData) {
      dispatch(login({ token, userData }));
      navigate("/")
    }

    setLoading(false);
  }, [dispatch]); 

  return Loading ? (
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          
          <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    </div>
  ) : (
    
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
