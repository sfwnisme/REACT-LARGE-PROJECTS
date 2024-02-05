import Cookie from 'cookie-universal'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, logoutSelector } from '../../rtk/api/logoutSlice'

const Logout = () => {
  //:::
  const cookie = Cookie()
  //:::

  //:::
  const { isLoading, isError, error, isSuccess, success } = useSelector(logoutSelector)
  console.log(isLoading)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutAction()).unwrap()
      cookie.remove('e-commerce')
      location.pathname = '/'
      console.log(':::logout done:::', res)
    } catch (error) {
      console.log('+++logout error+++', error)
    }
  }
  //:::

  return (
    <>
      <span onClick={handleLogout} >
        {
          isLoading
            ? 'Logout...'
            : 'Logout'
        }
      </span >
    </>
  )

}

export default Logout