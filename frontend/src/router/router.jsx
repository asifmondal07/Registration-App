import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import {Login, Signup,Home, NotFound } from "../pages/index.js";



 const  router= createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:'*',
                element:<NotFound/>
            }
        ]
    }
])

export default router