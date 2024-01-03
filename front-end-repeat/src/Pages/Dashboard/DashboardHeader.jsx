
import { NavLink } from 'react-router-dom'

const DashboardHeader = () => {
  return (
    <div className='dashboard-header'>
      <h1>Dashboard</h1>
      <header>
        <NavLink to="/" className="btn">Website</NavLink>
        <NavLink to="/" className="btn btn-danger">Logout</NavLink>
      </header>
    </div>
  )
}

export default DashboardHeader