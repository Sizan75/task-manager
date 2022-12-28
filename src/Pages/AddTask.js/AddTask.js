import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_img_key
    console.log(imageHostKey)


    const handleAddTask = data => {
        console.log(data.name, data.photo[0])
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log("image", image);

        const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                const tasks = {
                    image: imgdata.data.url,
                    name: data.name,
                    email: 'email'
                }
                fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(tasks)
                })
                .then(res=>res.json())
                .then(result=>{
                    if(result.acknowledged){
                        toast.success('task added')
                    }
                })
            })
    }


    return (
        <div className='w-3/4 mx-auto'>
            <h1 className='text-3xl font-semibold'>Add Task</h1>
            <div>
                {/* <form onSubmit={handleAddTask} >

                    <div className="form-control mb-6">
                        <label for="company" className="block mb-2 text-sm font-medium text-gray-900 ">Task</label>

                        <input type="text" id="task" name='task' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="task name" required />
                    </div>
                    <div className="form-control mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900" >Task Image</label>

                        <input name='photo' className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none   " id="large_size" type="file" />
                    </div>
                    <div className='flex justify-center mb-5'>
                        <button className=" text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add Task</button>
                        <Toaster />
                    </div>
                </form> */}


                <form onSubmit={handleSubmit(handleAddTask)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered input-success w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Image</span></label>
                        <input type="file" {...register("photo", {
                            required: "Photo is Required"
                        })} className="input input-bordered input-success w-full max-w-xs" />

                    </div>

                    <input className='bg-blue-600 w-full mt-4' value="Add Task" type="submit" />
                        <Toaster/>
                </form>
            </div>
        </div>
    );
};

export default AddTask;