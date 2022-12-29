import React from 'react';
import { toast } from 'react-hot-toast';

const SignleTask = ({ task, setMyTasksModal,refetch }) => {
    const { title, _id, des, image, completed, user } = task
    console.log(task)

    const handleDelete=(id)=>{
        fetch(`https://todo-app-server-phi.vercel.app/delete/${_id}`,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(data=>{

            console.log(data)
            toast("Deleted Successfully")
            refetch()
        } )
    }
    const handleStatus=(id)=>{
        fetch(`https://todo-app-server-phi.vercel.app/status/${id}`,{
            method:"PUT",
             headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(task)

        })
        .then(res=>res.json())
        .then(data=>{

            console.log(data)
            toast("Operation Successful!")
            refetch()
        } )
    }
    return (
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
                <label htmlFor="task" className="font-medium text-blue-600 dark:text-blue-500 hover:underline " onClick={() => setMyTasksModal(task)}>Update</label>
            </td>

           

                <td onClick={() => handleStatus(_id)} className="py-4 px-6">
                
                    <p href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Complete</p>
                  
                    </td>
              
           
            <td className="py-4 px-6">
                <p href="#" htmlFor="task" onClick={() => handleDelete(_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</p>
            </td>
        </tr>
    );
};

export default SignleTask;