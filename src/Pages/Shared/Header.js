import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { AuthContext } from '../../Contexts/AuthProvider';
import '../../App.scss';
const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const { user, logOut,isDarkMode,toggleDarkMode } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(er => console.error(er))
    }
    console.log(user)
    return (

        <nav className=  { isDarkMode ? `px-2 sm:px-4 py-2.5  dark rounded`: `px-2 sm:px-4 py-2.5  light rounded`} >
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="flex items-center">

                    <span className="self-center text-xl font-semibold whitespace-nowrap ">TOMORROW</span>
                </div>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" onClick={() => { setNavbar(!navbar) }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className={navbar ? ` w-full md:block md:w-auto` : `hidden w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
                        <li>
                            <Link to='/' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to='/addTask' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Add Task</Link>
                        </li>
                        <li>
                            <Link to='/myTask' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>My Tasks</Link>
                        </li>
                        <li>
                            <Link to='/completeTask' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Completed Tasks</Link>
                        </li>


                        {
                            user?.uid ?

                                <>

                                    <li className="text-primary font-semibold text-xl hover:text-indigo-400">
                                        <Link >
                                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName ? user?.displayName : "User"}>
                                                <button ><img className='rounded-full w-10' src={user?.photoURL ? user?.photoURL : "ami"} alt="" /></button>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={handleLogOut} className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Sign Out</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to='/register' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Register</Link>
                                    </li><li>
                                        <Link to='/login' className={isDarkMode ? `block py-2 pl-3 pr-4 dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`:`block py-2 pl-3 pr-4 light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>Sign In</Link>
                                    </li>
                                </>
                        }
                        <DarkModeSwitch className='w-6 h-6' checked={isDarkMode}onChange={toggleDarkMode}size={120}/>
                    </ul>
                </div>
            </div>
        </nav>

    );
};


export default Header;