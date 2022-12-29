import React from 'react';
import { toast } from 'react-hot-toast';

const Update = ({ task, setMyTasksModal,refetch }) => {

    const {title,_id,des,image}=task
    const handleClose = () => {
        setMyTasksModal(null)
    }
    const handleChange = (e) => {
        e.preventDefault()
            console.log("HI THERE")
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
                title,des,image
            }
            console.log(task)

      
            fetch(`https://todo-app-server-phi.vercel.app/update/${_id}`,{
                method:"PUT",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(task)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                toast("Task Updated!")
                refetch()
                setMyTasksModal(null)
            })
        })
    }
    console.log(task)
    return (
        <div className='fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full w-full p-4'>

            <input type="checkbox" tabIndex="-1" id="task" className="  hidden " />
            <div className="relative top-1/3 left-1/3 h-full max-w-2xl md:h-auto">

                <div className="relative right-1/4 lg:w-full w-4/5  md:w-2/3 bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className='flex justify-between px-6 pt-6'>
                        <div >
                            <h2 className='font-semibold text-xl'>Update Your Task</h2>
                        </div>
                        <button onClick={handleClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form onSubmit={handleChange} className='p-4 md:p-12 '>

                        <div className="mb-6 ">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" defaultValue={title} name='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className='mb-6'>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input name='img'  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required />

                        </div>
                        <div className='mb-6'>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                            <textarea name='des' defaultValue={des} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write the description here..."></textarea>
                        </div>
                        <button type="submit"  className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Update;