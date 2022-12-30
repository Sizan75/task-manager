import React from 'react';

const CompletedTaskCard = ({task}) => {
    const {name,image} = task
    return (
        <div className='mx-auto w-3/4'>
            <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <img src={image} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-wide">{name}</h2>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedTaskCard;