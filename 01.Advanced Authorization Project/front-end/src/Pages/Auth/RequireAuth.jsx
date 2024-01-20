import axios from 'axios'
import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL, USER } from '../../Api/API'
import PageLoading from '../../Loading/PageLoading/PageLoading'
import Err403 from '../Dashboard/Err403'

const RequireAuth = (props) => {
  //:::
  const [user, setUser] = useState('')

  console.log(props)
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
    axios.get(`${BASE_URL}/${USER}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(({ data }) => {
      setUser(data)
      console.log(':::get user from require auth done:::', data)
    }).catch((error) => {
      console.log('+++get users from require auth error+++', error)
      setUser('')
      cookie.remove('e-commerce')
      navigate('/login')
      location.reload()
    })
  }, [])
  //:::


  // return token
  //   ? user === '' ? <Outlet /> : <PageLoading />
  //   : <Navigate replace={true} to='/login' />

  return token ? (
    user === '' ? (
      <PageLoading />
    ) : props?.allowedRole?.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 />
    )
  ) : (
    <Navigate to={'/login'} replace={true} />
  )
}

export default RequireAuth