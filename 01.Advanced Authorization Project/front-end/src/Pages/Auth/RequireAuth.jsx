import axios from 'axios'
import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL, USERS } from '../../Api/API'
import PageLoading from '../../Loading/PageLoading/PageLoading'
const RequireAuth = () => {
  //:::
  const [users, setUsers] = useState('')
  //:::

  //:::
  const navigate = useNavigate()
  //:::

  //:::
  const cookie = Cookie()
  const token = cookie.get('e-commerce')
  //:::

  //:::
  useEffect(() => {
    axios.get(`${BASE_URL}/${USERS}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(({ data }) => {
      setUsers(data)
      console.log(':::get user from require auth done:::', data)
    }).catch((error) => {
      console.log('+++get users from require auth error+++', error)
      setUsers('')
      cookie.remove('e-commerce')
      navigate('/login')
      location.reload()
    })
  }, [])
  //:::


  return token
    ? users ? <Outlet /> : <PageLoading />
    : <Navigate replace={true} to='/login' />
}

export default RequireAuth