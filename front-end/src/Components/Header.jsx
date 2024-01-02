import axios from "axios"
import { memo } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"

// import '../App.css'
const Header = () => {
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')

  const handleLogOut = async () => {
    try {
      await axios
        .post('http://127.0.0.1:8000/api/logout', {},
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
      cookie.remove("Bearer")
      location.pathname = '/'
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <nav className="d-flex" >
        <div className="d-flex" >
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/">About</Link>
        </div>
        <div className="d-flex">
          {!token ?
            <>
              <Link to='/register' className='button' style={{ textAlign: 'center' }}>
                Register
              </Link>
              <Link to='/login' className='button' style={{ textAlign: 'center' }}>
                Login
              </Link>
            </>
            :
            <>
              <Link className="button" to="/dashboard">Dashboard</Link>
              <button className="button button-danger" onClick={handleLogOut}>logout</button>
            </>
          }
        </div>
      </nav >
    </div >

  )
}

export default memo(Header)