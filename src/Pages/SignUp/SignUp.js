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
        fetch('http://localhost:5000/users', {
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
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="w-full px-3 py-2 border rounded-md       " />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="w-full px-3 py-2 border rounded-md       " />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="w-full px-3 py-2 border rounded-md       " />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='w-full px-8 py-3 font-semibold rounded-md bg-violet-400' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className="px-8 py-3 font-semibold border rounded dark:border-gray-100   "><FcGoogle></FcGoogle>  Google Sign In</button>

            </div>
        </div>
    );
};

export default SignUp;