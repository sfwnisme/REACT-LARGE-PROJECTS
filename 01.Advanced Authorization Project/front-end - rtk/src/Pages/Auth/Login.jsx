import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import PageLoading from "../../Loading/PageLoading/PageLoading"
import { NavLink } from "react-router-dom"
import GoogleBtn from "../../Components/GoogleBtn"
import { useDispatch, useSelector } from "react-redux"
import { loginAction, loginUserSelector } from "../../rtk/api/loginSlice"

const Login = () => {

  //:::states
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  //:::

  //:::
  const srcImage = 'https://res.cloudinary.com/daa68wahe/image/upload/v1704753751/e-commerce/rzwx5ubf9mhycavoqxsj.png'
  //:::

  //:::
  const handleChange = (e) => {
    const state = e.target.name
    const { value } = e.target
    setForm((prev) => ({ ...prev, [state]: value }))
  }
  //:::

  //:::
  const { isLoading, isError, error, isSuccess, success } = useSelector(loginUserSelector)
  console.log(isError)
  //:::

  //:::
  const dispatch = useDispatch()
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(loginAction(form)).unwrap()
      const role = res?.user?.role
      const go = role === '1995' ? 'dashboard/users' : role === '1996' ? 'dashboard/writer' : '/'
      switch (role) {
        case '1995':
          'dashboard/users';
          break;
        case '1996':
          'dashboard/writer';
          break;
        case '1999':
          'dashboard/products';
          break;
        default:
          '/';
          break;
      }
      location.pathname = go
      console.log(':::login done:::', res)
    } catch (error) {
      console.log('+++login error+++', error)
    }
  }
  //:::

  return (
    <div>
      {isLoading && <PageLoading />}
      <div className='form-container'>
        <div className='form-box'>
          <h1>Login</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" name='email' placeholder="" value={form.email} onChange={handleChange} required />
              <Form.Label htmlFor="email">Email</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='password' id="password" name='password' placeholder="" value={form.password} onChange={handleChange} required minLength='6' />
              <Form.Label htmlFor="password">Password</Form.Label>
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
              {
                isLoading
                  ? 'Get...'
                  : 'Get in'
              }
            </Button>
            <NavLink to='/register' style={{ pointerEvents: isLoading ? 'none' : '' }}>
              <Button variant="link" size="sm">have not account</Button>
            </NavLink>
          </Form>
          <GoogleBtn />
          {
            isError || isSuccess ?
              <Alert variant={isError ? 'danger' : 'success'} className={`credentials-${isError ? 'error' : 'success'}`}>
                {error || success}
              </Alert>
              : null
          }
        </div>
        <div className="credential-image-container">
          <img src={srcImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login