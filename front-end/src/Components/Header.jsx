import { Link } from "react-router-dom"

// import '../App.css'
const Header = () => {

  const handleLogOut = () => {
    localStorage.removeItem('email')
    location.pathname = '/'
  }

  return (
    <div>
      <nav className="d-flex" >
        <div className="d-flex" >
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/">About</Link>
          <Link className="link" to="/dashboard">Dashboard {'>'}</Link>
        </div>
        {
          !localStorage.getItem('email') ?
            <div className="d-flex">
              <Link to='/register' className='button' style={{ textAlign: 'center' }}>
                Register
              </Link>
              <Link to='/login' className='button' style={{ textAlign: 'center' }}>
                Login
              </Link>
            </div> :
            <Link className='button' style={{ textAlign: 'center' }}
              onClick={handleLogOut}
            >
              Logout
            </Link>
        }
      </nav >
    </div >

  )
}

export default Header