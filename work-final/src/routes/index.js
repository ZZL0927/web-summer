import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from '../pages/Home'
import FormList from '../pages/Home/FormList'
import Create from '../pages/Home/Create'
import { Navigate } from "react-router-dom"
import FormAction from "../pages/Home/FormAction"
import Data from "../pages/Home/FormAction/Data"
import Form from "../pages/Home/FormAction/Form"
import Share from "../pages/Home/FormAction/Share"
import Success from "../pages/Home/Success"
import InputForm from "../pages/Home/InputForm"
import Preview from "../pages/Home/Preview"
import User from "../pages/User"
const routes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/home',
        element:<Home/>,
        children:[
            {
                path:'formList',
                element:<FormList/>
            },
            {
                path:'createForm',
                element:<Create/>
            },
            {
                path:'formAction',
                element:<FormAction/>,
                children:[
                    {
                        path:'data',
                        element:<Data/>
                    },
                    {
                        path:'form',
                        element:<Form/>
                    },
                    {
                        path:'share',
                        element:<Share/>
                    }
                ]
            },
            {
                path:'success/:id',
                element:<Success/>
            },
            {
                path:'inputForm/:id',
                element:<InputForm/>
            },
            {
                path:'preview',
                element:<Preview/>
            },
            {
                path:'',
                element:<Navigate to='formList'></Navigate>
            }
        ]
    },
    {
        path:'/user',
        element:<User/>
    },
    {
        path:'/',
        element:<Navigate to='/login'></Navigate>
    }
]
export default routes