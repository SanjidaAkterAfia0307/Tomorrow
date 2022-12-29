import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assests/error.webp';
const ErrorElement = () => {
    return (
        <div className='w-3/4 mx-auto text-center'>
        <img src={error} className=' w-3/4 mx-auto ' alt="" />
        <Link to='/' className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">BACK TO HOMEPAGE</Link>
    </div>
    );
};

export default ErrorElement;