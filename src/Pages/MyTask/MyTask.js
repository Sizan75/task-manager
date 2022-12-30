import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import MyTaskCard from './MyTaskCard';

const MyTask = () => {
      const [myTask, setMyTask]= useState([])
    const { user } = useContext(AuthContext)
    // const {email} = user.email
    // console.log(user.email)

    const { data: myTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['myTasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-nine.vercel.app/mytasks?email=${user?.email}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    }

    // useEffect(() => {
    //     fetch(`https://task-manager-server-nine.vercel.app/mytasks?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data =>
    //             {   console.log(data)
    //                  setMyTask(data)
    //             })
    // }, [user?.email])


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete this task');
        if (proceed) {
            fetch(`https://task-manager-server-nine.vercel.app/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Review deleted successfully')
                        const remaining = myTask.filter(rev => rev._id !== id);
                        setMyTask(remaining);

                    }
                })
        }
    }

    return (
        <div>
            <h1>My Tasks</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    myTasks.map(task => <MyTaskCard
                        key={task._id}
                        task={task}
                        handleDelete={handleDelete}
                    >

                    </MyTaskCard>)
                }
            </div>
        </div>
    );
};

export default MyTask;