import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const {logIn,googleLogin,isDarkMode}=useContext(AuthContext)
    const [error,setError]=useState()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const handleSubmit=(e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value


        logIn(email, password)
            .then(res => {
                const user = res.user;
                console.log(user)
                setError("")
            

                
                toast("Log In Successful!")
                navigate(from, { replace: true })
            }).catch(er => {
                console.error(er)
                setError(er.message)
               
            })
    }

    const handleGoogleUser=()=>{

        googleLogin()
            .then(res => {
                const user = res.user;
                console.log(user)
                setError("")
                navigate(from, { replace: true })
            })
            .catch(er => console.error(er))
    }
    return (
        <div className='lg:grid grid-cols-3 pt-24 '>
            <div className='hidden lg:block'>
                <img src="{lockPhone}" alt="" />
            </div>

            <div className='lg:my-auto lg:p-12 p-10 md:p-20'>
                <h2 className='text-center text-3xl md:text-4xl font-bold pb-12 '>Log In</h2>
                <form onSubmit={handleSubmit} className={isDarkMode ?' shadow-lg shadow-slate-600 rounded-2xl p-4 md:p-20':"shadow-lg rounded-2xl p-4 md:p-20"}>


                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your E-mail</label>
                        <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E-mail" required="" />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2  font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
                    </div>
                    <p className='text-xl text-yellow-400 py-3'>{error}</p>
                    <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    <div className='flex items-center flex-col'>
                    <button onClick={handleGoogleUser} type="submit" className="text-slate-800 border-2 border-yellow-400 hover:bg-yellow-400 block m-2 font-medium rounded-lg  px-5 lg:w-96 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in With Google</button>

                </div>

                    <p className='text-center my-5'><span>New To Tomorrow ?</span> <Link className='text-orange-400' to="/register">Sign Up</Link></p>
                </form>
            </div>

            <div className='hidden lg:block'>
                <img src="{personComputer}" alt="" />
            </div>
        </div>
    );
};

export default Login;