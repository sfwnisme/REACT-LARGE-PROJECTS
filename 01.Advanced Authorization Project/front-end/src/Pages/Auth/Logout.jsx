import Cookie from 'cookie-universal'
import { LOGOUT } from '../../Api/API'
import Button from 'react-bootstrap/Button'
import { AXIOS } from '../../Api/AXIOS.JSX'

const Logout = () => {

  //:::
  const cookie = Cookie()
  //:::

  //:::
  const handleLogout = () => {
    try {
      const res = AXIOS.get(`/${LOGOUT}`)
      cookie.remove('e-commerce')
      location.pathname = '/login'
      console.log(':::logout done:::', res)
    } catch (error) {
      console.log('+++logout error+++', error)
    }
  }
  //:::

  return <Button variant='danger' size='sm' onClick={handleLogout}>Logout</Button>

}

export default Logout