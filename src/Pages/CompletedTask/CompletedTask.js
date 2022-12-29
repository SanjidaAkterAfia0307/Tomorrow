import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import SingleCompletedTask from './SingleCompletedTask';
import TaskDetails from './TaskDetails';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)
    const [selectedtask,setSelectedTask]=useState(null)
    console.log(selectedtask)
    const { data: CompletedTasks = [], refetch, isLoading } = useQuery({
        queryKey: ['CompletedTasks'],
        queryFn: () => fetch(`https://todo-app-server-phi.vercel.app/completeTask/${user?.email}`)
            .then(res => res.json())
    })



    console.log(
        user?.email
    )
    console.log(CompletedTasks)

    return (

        <div className=' lg:flex justify-around'>
            <div className=" overflow-x-auto relative sm:rounded-lg">

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
                            <th scope="col" className="py-3 px-6">
                               
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //     CompletedTasks.map((myTask,i)=> 
                            // )

                            CompletedTasks.map(myTask => <SingleCompletedTask setSelectedTask={setSelectedTask} refetch={refetch} key={myTask._id} task={myTask} ></SingleCompletedTask>)
                        }



                    </tbody>
                </table>


            </div>
            {
                selectedtask &&
            <TaskDetails task={selectedtask}></TaskDetails>
            }
        </div>
    );
};

export default CompletedTask;