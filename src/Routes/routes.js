import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import Home from "../Pages/Home/Home";
import MyTask from "../Pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/addTask",
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path:"/myTask",
                element:<PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path:"/completeTask",
                element:<PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
        ]
    }
])