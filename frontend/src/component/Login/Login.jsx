import React, { useState,useEffect} from 'react'; 
import token123 from '../../key/key.js'
import { useDispatch } from 'react-redux'
import authService from '../../Api.js/auth.js'
import { Link,useNavigate } from 'react-router-dom'
import {Buttons,Input} from '../index'
import {useForm} from 'react-hook-form'
import { login as Authlogin } from '../../store/authSlice.js'

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
    const [error, setError] = useState("");
    const token = localStorage.getItem(token123)

    useEffect(() => {
    if(token){
        navigate('/')
    }
    },[token])

    const handleLogin = async (data) => {
        setError("");
        try {
            const {email, password} = data
            const response = await authService.login(email, password);

            if (response) {

                localStorage.setItem("userData", JSON.stringify({
                    id: response.userid,
                    name: response.name,
                }));
                localStorage.setItem(token123, response.token);

                const userData = JSON.parse(localStorage.getItem('userData')) 

                dispatch(Authlogin({
                    userData: userData, 
                    token: response.token
                }));

                navigate('/');
            }
            
        } catch (error) {
            console.log("Login error:", error);
        setError(error.message || "Login failed");
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}> 
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(handleLogin,(err)=>{ console.error("Validation error:", err);})} className='mt-8'>
            <div className='space-y-5'>
                <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            // validate: {
                            //     matchPattern: (value) =>
                            //       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email must be valid",
                            //   }
                            
                        }
                    })}
                />
                <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Buttons
                    type="submit"
                    className="flex items-center justify-center  hover:bg-blue-400"
                    ButtonsText="Login"
                ></Buttons>
            </div>
        </form>
        </div>
    </div>
  )
}
