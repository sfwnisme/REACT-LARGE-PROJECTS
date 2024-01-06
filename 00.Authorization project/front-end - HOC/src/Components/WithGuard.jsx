import { useContext } from 'react'
import { User } from '../Pages/Website/Context/UserContext.jsx'
import { Navigate, useLocation } from 'react-router-dom'

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation()
    const user = useContext(User)
    const { userDetails } = user.auth
    return userDetails ? <Component {...props} /> : <Navigate state={{ from: location }} replace to='/login' />
  }
  return Wrapper
}

export default withGuard