import { useCallback, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Cookie from 'cookie-universal'
import axios from 'axios'
import { BASE_URL, LOGOUT } from '../../Api/API'

const Logout = () => {

  //:::
  const cookie = Cookie()
  const token = cookie.get('e-commerce')
  //:::

  //:::
  const handleLogout = () => {
    try {
      const res = axios.get(`${BASE_URL}/${LOGOUT}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      cookie.remove('e-commerce')
      location.pathname = '/login'
      console.log(':::logout done:::', res)
    } catch (error) {
      console.log('+++logout error+++'
        , error)
    }
  }
  //:::

  return <Button variant='danger' size='sm' onClick={handleLogout}>Logout</Button>

}

export default Logout