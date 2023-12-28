import { Link } from "react-router-dom"

// import '../App.css'
const Header = () => {

  return (
    <div>
      <nav className="d-flex" >
        <div className="d-flex" >
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/">About</Link>
        </div>
        <div className="d-flex">
          <Link to='/register' className='button' style={{ textAlign: 'center' }}>
            Register
          </Link>
          <Link to='/login' className='button' style={{ textAlign: 'center' }}>
            Login
          </Link>
          <Link className="button" to="/dashboard">Dashboard</Link>
        </div>
      </nav >
    </div >

  )
}

export default Header