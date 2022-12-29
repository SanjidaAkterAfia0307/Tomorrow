import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import "../../App.scss"
import task from '../../assests/istockphoto-1142608291-612x612.jpg';
import { AuthContext } from '../../Contexts/AuthProvider';
import { RiTodoFill} from "react-icons/ri";

const Home = () => {
    const {user,isDarkMode}=useContext(AuthContext)
    const [userError,setUserError]=useState()
    const handleSubmit=(e)=>{
        e.preventDefault()

        if(!user){
          return  setUserError("User not found.Please log in to add task.")
        }
        const form=e.target;
        const title=form.title.value;
        const des=form.des.value;
        const img=form.img.files[0]
        console.log(title,des,img)
        setUserError(null)
        const formData = new FormData()
        formData.append('image', img)

        const url = `https://api.imgbb.com/1/upload?key=a331c3baf6953b506f3e9d485f489368`

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res=>res.json())
        .then(data=> {
            const image = data.data.display_url;
            const task={
                title,des,image,completed:false,
                user:user.displayName,UserEmail:user.email,comment:[]
            }
            console.log(task)

            fetch("https://todo-app-server-phi.vercel.app/task",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(task)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast("Task Added!")
                
            })
        })
    }
    return (
        <div className={isDarkMode ?`dark`:`light`}>
            <div className='md:text-4xl text-xl text-center my-6 font-bold'>Tomorrow is here to manage<br /> your works!</div>
            <div className='grid md:grid-cols-2 gap-8 items-center h-full'>

                <div className='flex justify-center'>
                    {
                        isDarkMode ?
                        <RiTodoFill className='w-80 h-80 '></RiTodoFill>
                        :
                    <img src={task} alt="" />
                    }
                </div>

                <div className=' '>
                    <h2 className='md:text-xl text-lg text-center my-6 font-semibold'>Add A Task</h2>
                    <div className='flex justify-center'>

                    <form onSubmit={handleSubmit} className={isDarkMode?' shadow-xl my-5  shadow-slate-600  mx-8 lg:w-1/2  px-6 lg:px-12 py-16 ' :"shadow-xl mx-8 lg:w-1/2  px-6 lg:px-12 py-16 '" }>

                        <div className="mb-6 ">
                            <label htmlFor="title" className={isDarkMode ? `block mb-2 text-sm font-medium dark `:`block mb-2 text-sm font-medium light `}>Title</label>
                            <input type="text" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className='mb-6'>

                            <label className={isDarkMode ? `block mb-2 text-sm font-medium dark `:`block mb-2 text-sm font-medium light `} htmlFor="file_input">Upload file</label>
                            <input name='img' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                        </div>
                        <div className='mb-6'>
                            <label htmlFor="message" className={isDarkMode ? `block mb-2 text-sm font-medium dark `:`block mb-2 text-sm font-medium light `}>Task Description</label>
                            <textarea name='des' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write the description here..."></textarea>
                        </div>
                        <div>
                            {
                                userError &&
                                <p className='text-red-500 my-5'>{userError}</p>
                            }
                        </div>
                        <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;