import { useState,createContext, useEffect } from "react";
import axios from "axios";
//子组件 作为props.children传入
export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null) 
    )
    const login = async (inputs)=>{
        //登录成功返回data信息
        axios.post("/auth/login",inputs).then((res)=>{
            setCurrentUser(res.data)
        }).catch(error=>{
            console.log(error)
        })
        
    }
    const logout = async () =>{
        axios.post("/auth/logout").then(()=>{
            setCurrentUser(null)
        }).catch(error=>{
            console.log(error)
        })
        
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}