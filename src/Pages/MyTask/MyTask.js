import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import MyTaskCard from './MyTaskCard';

const MyTask = () => {
      const [myTask, setMyTask]= useState([])
    const {user}=useContext(AuthContext)
    // const {email} = user.email
    console.log(user.email)
    useEffect(() => {
        fetch(`http://localhost:5000/mytasks?email=${user?.email}`)
            .then(res => res.json())
            .then(data =>
                {   console.log(data)
                     setMyTask(data)
                })
    }, [user?.email])


    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure, you want to delete this task');
        if(proceed){
            fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0){
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
                myTask.map(task => <MyTaskCard
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