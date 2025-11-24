import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import token123 from '../../key/key.js';
import authService from '../../Api.js/auth.js';
import { login as Authlogin } from '../../store/authSlice.js';
import {Buttons ,Input} from '../index.js';

function Signup() {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState();
    const [message,setMessage]=useState()
    



    const handleSignup=async (data)=>{

        try {
            const {name,email,password}=data;

            const response= await authService.create(name,email,password)

            if(response){setMessage(response.message)}
        } catch (error) {
            console.error("Signup Error:", error);
            const errorMessage = error?.message || "Signup failed";
            setError(errorMessage);
        }
    }


  return (
    <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}> 
                <h2 className="text-center text-2xl font-bold leading-tight">Signup in to your account</h2>
    
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                </p>
    
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {message && <p className="text-green-600 mt-8 text-center">{message}</p>}
    
                <form onSubmit={handleSubmit(handleSignup,(err)=>{ console.error("Validation error:", err);})} className='mt-8'>
                <div className='space-y-5'>

                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register("name",{
                            required:true
                        })}
                    />

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
                        ButtonsText="Signup"
                    ></Buttons>
                </div>
            </form>
            </div>
        </div>
  )
}

export default Signup
