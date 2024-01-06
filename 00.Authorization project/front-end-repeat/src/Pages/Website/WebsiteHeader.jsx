
import { NavLink } from 'react-router-dom'

const WebsiteHeader = () => {
  return (
    <div className=''>
      <div className='dashboard-header'>
        <header>
          <NavLink to="/" className="lnk">Home</NavLink>
          <NavLink to="/" className="lnk">About</NavLink>
          <NavLink to="/" className="lnk">Profile</NavLink>
        </header>
        <header>
          <NavLink to="/dashboard" className="btn">Dashboard</NavLink>
          <NavLink to="/register" className="btn">Register</NavLink>
          <NavLink to="/login" className="btn btn-free">Login</NavLink>
        </header>
      </div>
    </div>
  )
}

export default WebsiteHeader