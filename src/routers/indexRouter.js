import Layout from "../pages/Layout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from '../pages/Register'
import Single from "../pages/Single"
import { Button, Result } from 'antd';

import { Link } from "react-router-dom"



const children = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/post/:id',
        element: <Single />
    },
    {
        path: '/write',
        element: <Result
            style={{ marginTop: "50px" }}
            status="403"
            title="403"
            subTitle="很抱歉，您没有权限"
            extra={<Link to='/'><Button type="primary">返回主页</Button></Link>}
        />
    }
]
const route = [
    {
        path: '/',
        element: <Layout />,
        children,
    },
    {
        path: '/vdail',
        element: <Login />
    },
    {
        path: '/xupt',
        element: <Register />
    },
    //匹配不到所有路由，展示此组件
    {
        path: '*',
        element: <div style={{ height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column" }}><Result
            status="404"
            title="404"
            subTitle="很抱歉，当前页面不存在"
            extra={<Link to='/'><Button type="primary">返回主页</Button></Link>}
        /></div>
    }
]


export default route

