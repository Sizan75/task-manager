import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import CompletedTaskCard from './CompletedTaskCard';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)
    
    const { data: completedtask = [], isLoading, refetch } = useQuery({
        queryKey: ['completedtask', user?.email],
        queryFn: () => fetch(`https://task-manager-server-nine.vercel.app/completetask?email=${user?.email}`)
            .then(res => res.json())
    })
    if (isLoading && user ) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    }
    return (
        <div>
              <h1>Completed Task</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    completedtask.map(task => <CompletedTaskCard
                        key={task._id}
                        task={task}
                    >

                    </CompletedTaskCard>)
                }
            </div>
        </div>
    );
};

export default CompletedTask;