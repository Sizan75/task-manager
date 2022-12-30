import React from 'react';
import { Link } from 'react-router-dom';

const MyTaskCard = ({ task, handleDelete }) => {
    const { name, image, _id } = task
    return (
        <div className='mx-auto w-3/4'>
            <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <img src={image} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-wide">{name}</h2>
                        <div className='flex justify-between'>
                            <button onClick={() => handleDelete(_id)} className="flex items-center justify-center w-1/3 p-3 font-semibold tracking-wide rounded-md bg-violet-400 ">Delete</button>
                            <Link to={`/update/${_id}`}> <button className="flex items-center justify-center w-1/3 p-3 font-semibold tracking-wide rounded-md bg-violet-400 ">Update</button> </Link>
                        </div>
                    </div>
                    <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 ">Completed</button>
                </div>
            </div>
        </div>
    );
};

export default MyTaskCard;