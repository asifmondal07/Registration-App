import {Container} from "../index.js"
import {useNavigate,Link} from "react-router-dom"
import  {useSelector,useDispatch} from "react-redux"
import token123 from '../../key/key.js'
import { useEffect } from "react"
import {LogoutBtn} from "../index.js"
import { login } from "../../store/authSlice.js"



function Header() {
    const authStatus=useSelector((state)=>state.auth?.status)
    const userName= useSelector((state) => state.auth?.userData?.name)
    const firstName=userName?.split(' ')[0]
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
    const token = localStorage.getItem(token123)
    const userData = JSON.parse(localStorage.getItem('userData')) 
    
      if(token && !authStatus){
          dispatch(login({
            token:token,
            userData:userData
          }))
      }else if(!token && authStatus){
          dispatch(logout())
      }
  }
  ,[navigate,dispatch])

    const navItems =[

        {name:'Home', path:"/", active:true},

        {name:'Login', path:"/login", active:!authStatus},

        {name:'Signup',path:'/signup',active:!authStatus},

    ]
  return (
    <header className='bg-amber-100 shadow-md'>
      <Container>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-2xl font-bold'>My Blog</h1>
          <nav className='flex space-x-4'>
            {navItems
            .filter((item) => item.active)
            .map((item) =>(
              <button
                key={item.name}
                to={item.path}
                className={`text-lg inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${item.active ? 'text-blue-500' : 'text-gray-700'}`}
                onClick={() => {
                  if (item.active) {
                    navigate(item.path)
                  }
                }}
              >
                {item.name}
              </button>
            ))}
            { authStatus && (

              <div>
                <Link
                className='text-lg text-red-500'
                onClick={() => {
                  navigate('/')
                }}
              >
                  <LogoutBtn />
              </Link>
              <button 
                key={firstName}
                to='/profile'
                className={`text-lg inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full 
                    ${firstName ? 'text-blue-500' : 'text-gray-700'}`}

              >
                {firstName}
              </button>

              </div>

            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header
