import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';

const AddTask = () => {
    const {user,isDarkMode}=useContext(AuthContext)
    const handleSubmit=(e)=>{
        e.preventDefault()

        const form=e.target;
        const title=form.title.value;
        const des=form.des.value;
        const img=form.img.files[0]
        console.log(title,des,img)

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
                
            })
        })
    }

    
    return (
        <div>

            <h1>Add your task</h1>
             <div className='md:flex justify-center p-8 w-full '>
                    <form onSubmit={handleSubmit} className={isDarkMode ?' shadow-xl shadow-slate-600 md:w-1/2 px-12 py-16 ': ' shadow-xl  md:w-1/2 px-12 py-16 '}>

                        <div className="mb-6 ">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className='mb-6'>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input name='img' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"  required/>

                        </div>
                        <div className='mb-6'>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                            <textarea name='des' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write the description here..." required></textarea>
                        </div>
                        <button type="submit" className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                    </form>
                </div>
        </div>
    );
};

export default AddTask;