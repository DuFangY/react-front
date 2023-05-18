import React from 'react'
import Logo from '../../img/footer.png'
export default function Footer() {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with <b>Du Fangyuan</b><span className='heart'> ♥ </span><b>React.js</b>
      </span>
    </footer>
  )
}
