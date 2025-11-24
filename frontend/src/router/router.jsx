import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import {Login, Signup,Home } from "../pages/index.js";



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
            }
        ]
    }
])

export default router