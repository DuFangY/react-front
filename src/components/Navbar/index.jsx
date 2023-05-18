import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../img/logo.png'
import { AuthContext } from '../../context/authContext'
export default function NavBar() {
  const { currentUser, logout } = useContext(AuthContext)
  return (
    <div className='navBar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>

        </div>
        <div className="links">
          <Link to="/?cat=JavaScript">
            <h6>JavaScript</h6>
          </Link>
          <Link to="/?cat=React">
            <h6>React</h6>
          </Link>
          <Link to="/?cat=Vue">
            <h6>Vue</h6>
          </Link>
          <Link to="/?cat=TypeScript">
            <h6>TypeScript</h6>
          </Link>
          <Link to="/?cat=Node.js">
            <h6>Node.js</h6>
          </Link>
          <Link to="/?cat=Other-About-Web">
            <h6>Other-About-Web</h6>
          </Link>
          <span>{currentUser === null ? 'DuFangYuan' : currentUser.username}</span>
          {currentUser !== null ? <span onClick={logout}>LogoOut</span> : ''}
          {currentUser !== null ? (<span className='write'>
            <Link to="/write">Write</Link>
          </span>) : (<span className='write'><Link to="/">Web</Link></span>)}
        </div>
      </div>
    </div>
  )
}
