import React, { useEffect, useState,useContext } from 'react'
import { useRoutes } from 'react-router-dom'
import router from './routers/indexRouter'
import axios from "axios"
import Write from "./pages/Write"
import {message} from 'antd'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AuthContext } from './context/authContext'
export default function App() {
  //根据路由表生成对应的路由规则

  const [element, setElement] = useState(router)
  const {logout,currentUser} = useContext(AuthContext)
  useEffect(() => {
    nProgress.start()
    axios.get('/users').then(() => {
      //用户登录校验成功
      router[0].children[2] = {
        path: '/write',
        element: <Write />
      }
      setElement([...router])
      nProgress.done()
    }).catch(err => {
      // console.log(err)
      if(currentUser!==null)
      {
        message.error('用户Token过期或无效,请重新登陆！')
      }
      else{
        
      }
      logout()
      nProgress.done()
    })
  }, [currentUser,logout])
  return (
    <div className="container">
      {useRoutes(element)}
    </div>
  );
}

