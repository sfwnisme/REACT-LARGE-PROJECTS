import axios from 'axios';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL, REGISTER } from '../../Api/API';
import Alert from 'react-bootstrap/Alert';
import Loading from '../../Loading/Loading/Loading';
import PageLoading from '../../Loading/PageLoading/PageLoading';
import Cookie from 'cookie-universal'
import { NavLink } from 'react-router-dom';

const Register = () => {
  //:::States
  const [form, setForm] = useState({
    name: '',
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
  let srcImage = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp'
  //:::

  //:::handle form change
  const handleChange = useCallback((e) => {
    const value = e.target.value
    const state = e.target.name
    setForm((prev) => ({ ...prev, [state]: value }))
  }, [form])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${BASE_URL}/${REGISTER}`, form)
      setErr('')
      setLoading(false)
      cookie.set('e-commerce', res?.data?.token)
      location.pathname = '/'
      console.log(':::register done:::', res)
    } catch (error) {
      if (error?.response?.status)
        setErr('Email has already been taken')
      else
        setErr('Internal server error')
      setLoading(false)
      console.log('+++register error+++', error)
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
          <h1>Register</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="name" placeholder="" name='name' value={form.name} onChange={handleChange} required minLength='4' />
              <Form.Label htmlFor="name">Name</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" placeholder="" name='email' value={form.email} onChange={handleChange} required />
              <Form.Label htmlFor="email">Email</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='password' id="password" placeholder="" name='password' value={form.password} onChange={handleChange} required minLength='6' />
              <Form.Label htmlFor="password">Password</Form.Label>
            </Form.Group>
            <Button variant='primary' size='sm' type="submit" disabled={!!loading} >
              {
                loading
                  ? <Loading />
                  : 'Join us'
              }
            </Button>
            <NavLink to='/login'>
              <Button variant="link" size="sm">already have an account</Button>
            </NavLink>
          </Form>
          {
            err &&
            <Alert variant='danger' className='credentials-error'>
              {err}
            </Alert>
          }
          <button className='google-btn'>
            <p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="" />
              Sign up with google</p>
          </button>
        </div>
        <div className="credential-image-container">
          <img src={srcImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register