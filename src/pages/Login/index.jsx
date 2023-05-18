import React,{useState,useRef,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
export default function Login() {
  const [error,setError] = useState(null)
  const refForm = useRef()
  const navigate = useNavigate()
  //获取上下文对象的login函数
  const {login} = useContext(AuthContext)
  const submit = (e) => {
    e.preventDefault()
    const loginValue = 
    {
      username: refForm.current[0].value,
      password: refForm.current[1].value
    }
    axios.post('/auth/login',loginValue).then(val=>{
      //{id: 6, username: 'du', email: '657356175@qq.com', img: null}
      // console.log(val.data)
      setError(null)
      //上下文对象的login函数 将登录的信息保存在了localStorage中
      login(loginValue)
      navigate('/')
    }).catch(err=>{
      setError(err.message)
    })
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form ref={refForm}>
        <input type="text" placeholder='username'/>
        <input type="password" placeholder='password'/>
        <button onClick={submit}>Login</button>
        {error &&<p>用户名或密码错误！</p>}
        <span>还没有账号? <Link to="/xupt">Register</Link></span>
      </form>
    </div>
  )
}
