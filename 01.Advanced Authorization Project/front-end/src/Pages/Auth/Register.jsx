import axios from 'axios';
import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL, REGISTER } from '../../Api/API';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
  //:::States
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [err, setErr] = useState('')
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
      await axios.post(`${BASE_URL}/${REGISTER}`, form, {}).then((res) => {
        console.log(':::register done:::', res)
      })
      setErr('')
      location.pathname = '/'
    } catch (error) {
      if (error.response.status)
        setErr('Email has already been taken')
      else
        setErr('Internal server error')

      console.log('+++register error+++', error)
    }
  }
  //:::

  return (
    <div>
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
            <Button type="submit">Submit</Button>
          </Form>
          {
            err &&
            <Alert variant='danger' className='credentials-error'>
              {err}
            </Alert>
          }
        </div>
        <div className="credential-image-conte">
          <img src={srcImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register