import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { User } from '../Context/UserContext'
// import Login from './Login'

const RequireAuth = () => {
  const user = useContext(User)
  console.log(user)
  return user.auth?.userDetails ? <Outlet /> : <Navigate to='/login' />
  // return <Outlet />
}

export default RequireAuth