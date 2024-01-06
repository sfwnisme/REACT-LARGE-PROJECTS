import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { User } from '../Context/UserContext'
// import Login from './Login'

const RequireAuth = () => {
  const locatoin = useLocation()
  const user = useContext(User)
  console.log(user)
  return user.auth?.userDetails ? <Outlet /> : <Navigate state={{ from: locatoin }} replace to='/login' />
}

export default RequireAuth