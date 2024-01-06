import { useContext, useEffect, useState } from 'react'
import { User } from '../Context/UserContext'
import axios from 'axios'
import Cookies from 'universal-cookie'
import LoadingScreen from '../../../Components/LoadingScreen'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
  const [loading, setLoading] = useState(true)

  const context = useContext(User)
  const token = context.auth.token

  const cookie = new Cookies(null, { path: '/' })
  const getToken = cookie.get('Bearer')
  console.log(getToken)

  useEffect(() => {
    const refresh = async () => {
      try {
        await axios
          .post('http://127.0.0.1:8000/api/refresh', null, {
            headers: {
              Authorization: 'Bearer ' + getToken,
            }
          }
          )
          .then((data) => {
            cookie.set('Bearer', data.data.token)
            context.setAuth({
              token: data.data.token,
              userDetails: data.data.user,
            }
            )
          })
      } catch (error) {
        console.log(error)
        // setLoading(false)
      } finally {
        setLoading(false)
        console.log('finally')
      }
    }
    !token ? refresh() : setLoading(false)
  }, [getToken, context, token])

  return loading ? <LoadingScreen /> : <Outlet />
}

export default PersistLogin