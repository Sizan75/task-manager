import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const { signIn, singInGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider()
    const from = location.state?.from?.pathname || '/';


    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    const saveUser = (name, email) => {

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
                navigate('/')
            })
    }

    const handleGoogleSignIn = () => {

        singInGoogle(googleProvider)
            .then(result => {
                const user = result.user;

                saveUser(user.displayName, user.email)

            })
            .catch(error => console.error(error))
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs mt-5">

                    <label for="email" className="block text-base">Email Address</label>
                        
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="w-full px-3 py-2 border-violet-400 rounded-md  ring-2 ring-offset-1  ring-violet-400" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mt-5 mb-5">
                       			<label for="email" className="block text-base">Password</label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="w-full px-3 py-2 border-violet-400 rounded-md  ring-2 ring-offset-1  ring-violet-400" />
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='w-full px-8 py-3 font-semibold rounded-md bg-violet-400' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Task Manager <Link className='text-secondary' to="/signup">Create new Account</Link></p>
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

            export default Login;