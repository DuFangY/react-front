import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'
export default function Register() {
  const [error,setError] = useState(null)
  const refForm = useRef()
  const navigate = useNavigate()
  const register = (e) => {
    e.preventDefault()
    const registerValue = 
    {
      username: refForm.current[0].value,
      email: refForm.current[1].value,
      password: refForm.current[2].value
    }
    axios.post('/auth/register',registerValue).then(val=>{
      setError(null)
      message.success('注册成功！')
      navigate('/vdail')
    }).catch(err=>{
      setError(err.message)
    })
  }
  return (

    <div className='auth'>
      <h1>Register</h1>
      <form ref={refForm} >
        <input required type="text" name="username" placeholder='username' />
        <input required type="email" name="email" placeholder='email' />
        <input required type="password" name='password' placeholder='password' />
        <button onClick={register}>Register</button>
        {error && <p>用户名或邮箱已注册,请重新注册!</p>}
        <span>已经有账户了？? <Link to="/vdail">Login</Link></span>
      </form>
    </div>
  )
}
