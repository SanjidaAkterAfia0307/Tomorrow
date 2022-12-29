import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const SingleCompletedTask = ({ task, refetch,setSelectedTask }) => {
    const { title, _id, des, image, completed, user } = task
    console.log(task)
    const [comment, setComment] = useState(false)
    console.log(comment)

    const handleSubmit=(e)=>{
        e.preventDefault()

        const comment=e.target.comment.value
        console.log(comment)
        fetch(`http://localhost:5001/comment/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({comment})

        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
                toast("Comment Added!")

                refetch()
                setComment(null)
            })

    }
    const handleDelete = (id) => {
        fetch(`http://localhost:5001/delete/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
                toast("Deleted Successfully!")
                refetch()
            })
    }
    const handleStatus = (id) => {
        fetch(`http://localhost:5001/status/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)

        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
              toast("Operation Successful!")
                refetch()
            })
    }
    return (
        <>

            <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {title}
                </th>
                <td className="py-4 px-6">
                    <img src={image} className="w-6" alt="" />
                </td>
                <td className="py-4 px-6">
                    {user}
                </td>
                <td className="py-4 px-6">
                    {des}
                </td>
                <td className="py-4 px-6">

                    <label htmlFor="comment" onClick={() => setComment(!comment)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline " >Comment</label>
                </td>



                <td onClick={() => handleStatus(_id)} className="py-4 px-6">

                    <p href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Not Complete</p>

                </td>


                <td className="py-4 px-6">
                    <p href="#"  onClick={() => handleDelete(_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</p>
                </td>
                <td className="py-4 px-6">{
                    user ?
                    <p href="#" onClick={()=>{setSelectedTask(task)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</p>
                    :
                    <p href="#" onClick={()=>{toast("User Not Found")}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</p>
                }
                </td>
            </tr>

            {
                comment &&
                <div className='fixed top-1/4 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0  md:h-full w-full p-4'>

                    <input type="checkbox" tabIndex="-1" id="comment" className="  hidden " />
                    <div className="relative top-1/3 left-1/3 h-full max-w-2xl md:h-auto">

                        <div className="relative right-1/3  bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className='flex justify-end px-6 pt-6'>
                               
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>


                            <form onSubmit={handleSubmit}>
                                <div class="w-full mb-4  rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label for="comment" class="sr-only">Your comment</label>
                                        <textarea id="comment" name='comment' rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                                    </div>
                                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                        <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                            Post comment
                                        </button>

                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default SingleCompletedTask;