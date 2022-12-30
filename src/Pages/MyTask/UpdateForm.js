import { Result } from 'postcss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const UpdateForm = () => {
    const task= useLoaderData(); 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const handleUpdateTask = data =>{
        console.log(data.name)
        const updatedTask ={
            name: data.name
        }
        fetch(`https://task-manager-server-nine.vercel.app/update/${task._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.modifiedCount > 0){
                toast.success('Update done')
            }
            else{
                toast.error('update Fail')
            }
        })
    }
    return (
        <div>
              <form onSubmit={handleSubmit(handleUpdateTask)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>

                        <input defaultValue={task.name} type="text" {...register("name", {
                            required: "Name is Required",
                        })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />

                    </div>
                    

                    <input className='text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' value="Add Task" type="submit" />
                        
                </form>
        </div>
    );
};

export default UpdateForm;