import axios from "axios"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { BASE_URL, LOGIN } from "../../Api/API"
import Alert from "react-bootstrap/Alert"
import Loading from "../../Loading/Loading/Loading"
import PageLoading from "../../Loading/PageLoading/PageLoading"
import Cookie from 'cookie-universal'
import { NavLink } from "react-router-dom"

const Login = () => {

  //:::states
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  //:::

  //:::
  const cookie = Cookie()
  //:::

  //:::
  const srcImage = 'https://i1.chainbulletin.com/img/2022/06/shutterstock_1950720448.jpg'
  //:::

  //:::
  const handleChange = (e) => {
    const state = e.target.name
    const { value } = e.target
    setForm((prev) => ({ ...prev, [state]: value }))
  }
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${BASE_URL}/${LOGIN}`, form)
      setErr('')
      setLoading(false)
      const token = res?.data?.token
      cookie.set('e-commerce', token)
      location.pathname = '/users'
      console.log(':::login done:::', res)
    } catch (error) {
      if (error?.response?.status)
        setErr('Invalid mail or password')
      else
        setErr('Internal server error')

      setLoading(false)
      console.log('+++login error+++', error)
    } finally {
      setLoading(false)
    }
  }
  //:::
  return (
    <div>
      {loading && <PageLoading />}
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
            <Button variant="primary" size="sm" type="submit" disabled={!!loading}>
              {
                loading
                  ? <Loading />
                  : 'Get in'
              }
            </Button>
            <NavLink to='/register'>
              <Button variant="link" size="sm">have not account</Button>
            </NavLink>
          </Form>
          {
            err &&
            <Alert variant='danger' className='credentials-error'>
              {err}
            </Alert>
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