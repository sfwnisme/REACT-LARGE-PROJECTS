import { Navigate, useLocation } from "react-router-dom"
import Cookies from "universal-cookie"

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation()
    const cookie = new Cookies(null, { path: '/' })
    const token = cookie.cookies.Bearer
    return token ? <Component {...props} /> : <Navigate to='/login' replace state={{ from: location }} />
  }

  return Wrapper
}

export default withGuard