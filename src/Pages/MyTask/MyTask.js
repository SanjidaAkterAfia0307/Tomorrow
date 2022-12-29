import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import SignleTask from './SignleTask';
import Update from './Update';

const MyTask = () => {
    const {user}=useContext(AuthContext)
 
    const [myTasksModal,setMyTasksModal]=useState(null)

    const { data: myTasks = [],refetch,isLoading } = useQuery({
        queryKey: ['myTasks'],
        queryFn: () => fetch(`http://localhost:5001/task/${user.email}`)
            .then(res => res.json())
    })


  
    console.log(
        user.email
    )
    console.log(myTasks)
    console.log(myTasksModal)
    return (
       
<div className=" h-screen overflow-x-auto relative shadow-md sm:rounded-lg">
   
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                
                <th scope="col" className="py-3 px-6">
                    Title
                </th>
                <th scope="col" className="py-3 px-6">
                   Image
                </th>
                <th scope="col" className="py-3 px-6">
                    User
                </th>
                <th scope="col" className="py-3 px-6">
                   Details
                </th>
                
                <th scope="col" className="py-3 px-6">
                    Update
                </th>
                <th scope="col" className="py-3 px-6">
                    Complete
                </th>
                <th scope="col" className="py-3 px-6">
                    Delete
                </th>
            </tr>
        </thead>
        <tbody>
        {
       

        myTasks.map(myTask=> <SignleTask refetch={refetch} key={myTask._id} task={myTask} setMyTasksModal={setMyTasksModal}></SignleTask>)
        }
        {
            myTasksModal &&
            <Update refetch={refetch} task={myTasksModal} setMyTasksModal={setMyTasksModal}></Update>

        }
            
            
        </tbody>
    </table>


</div>

    );
};

export default MyTask;