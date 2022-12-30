import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('')
    const { createUser, updateUser, singInGoogle } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()


    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'


    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                navigate(from, { replace: true });

                const userInfo = {
                    displayName: data.name,
                    email: data.email,
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name,  email) => {

        const user = {
            displayName: name,
            email: email,
        }
        fetch('https://task-manager-server-nine.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {

            })
    }

    const handleGoogleSignIn = () => {
        
        singInGoogle(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user)
                saveUser(user.displayName, user.email)

            })
            .catch(error => console.error(error))
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs mt-5">
                       
				<label for="email" className="block text-base ">Name</label>
                       
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="w-full px-3 py-2 border-violet-400 rounded-md  ring-2 ring-offset-1  ring-violet-400" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mt-5">
                      
				<label for="email" className="block text-base">Email address</label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="w-full px-3 py-2 border-violet-400 rounded-md  ring-2 ring-offset-1  ring-violet-400       " />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mt-5 mb-5">
                        
				<label for="email" className="block text-base">Password</label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="w-full px-3 py-2 border-violet-400 rounded-md  ring-2 ring-offset-1  ring-violet-400       " />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='w-full px-8 py-3 font-semibold rounded-md bg-violet-400' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full text-gray-500"/>
                        <p className="px-3 text-gray-500">OR</p>
                        <hr className="w-full text-gray-500" />
                        </div>
                <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full p-4 space-x-4 border-violet-400 rounded-md ring-2 ring-offset-1  ring-violet-400"><FcGoogle className='text-3xl'></FcGoogle>  Google Sign In</button>

            </div>
        </div>
    );
};

export default SignUp;