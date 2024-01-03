
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'

const DashboardHeader = () => {

  //::::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  //::::::


  //::::::
  const handleLogout = async () => {
    try {
      const res = await axios.
        post(import.meta.env.VITE_BASE_URL + 'logout', {} || null,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
      cookie.remove('Bearer')
      location.pathname = '/'
      console.log(':::log out done:::', res)
    } catch (error) {
      console.log('+++log out error+++', error)

    }
  }
  //::::::

  return (
    <div className='dashboard-header'>
      <h1>Dashboard</h1>
      <header>
        <NavLink to="/" className="btn">Website</NavLink>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </header>
    </div>
  )
}

export default DashboardHeader