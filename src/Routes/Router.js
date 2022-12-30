import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask.js/AddTask";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyTask from "../Pages/MyTask/MyTask";
import UpdateForm from "../Pages/MyTask/UpdateForm";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([

    {
        path:'/',
        element: <Main></Main>,
       
        children: [

            {
                path: '/',
                element: <Home></Home>,
            }
            ,
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/mytask',
                element: <MyTask></MyTask>
            }
            ,{
                path: '/update/:id',
                loader: ({params}) => fetch(`https://task-manager-server-nine.vercel.app/update/${params.id}`),
                element: <UpdateForm></UpdateForm>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            }           
        ]
}])