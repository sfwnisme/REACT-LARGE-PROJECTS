import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Cookies from "universal-cookie"
import Loading from "../../../Components/Loading"

const PersistRefresh = () => {
  //:::::
  const [loading, setLoading] = useState(true)
  //:::::

  //:::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.cookies.Bearer
  console.log(token)
  //:::::

  //:::::
  useEffect(() => {
    let res = axios
      .post(import.meta.env.VITE_BASE_URL + 'refresh',
        {} || null,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((data) => {
        cookie.set('Bearer', data?.data?.token)
        setLoading(false)
        console.log(':::refresh token done:::', data)
      })
      .catch((error) => {
        console.log('+++refresh token error+++', error)
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      })

  }, [])
  //:::::

  return loading ? <Loading /> : <Outlet />
}

export default PersistRefresh