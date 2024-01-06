import axios from "axios"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { BASE_URL, LOGIN } from "../../Api/API"
import { Alert } from "bootstrap"

const Login = () => {

  //:::states
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [err, setErr] = useState('')
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

      await axios.post(`${BASE_URL}/${LOGIN}`, form).then((res) => {
        console.log(':::login done:::', res)
      })
      setErr('')
      location.pathname = '/'
    } catch (error) {
      if (error.response.status)
        setErr('Email has already been taken')
      else
        setErr('Internal server error')

      console.log('+++login error+++', error)
    }
  }
  //:::
  return (
    <div>
      <div className='form-container'>
        <div className='form-box'>
          <h1>Login</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" name='email' placeholder="" value={form.email} onChange={handleChange} required />
              <Form.Label htmlFor="email">Email</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='password' id="email" name='password' placeholder="" value={form.password} onChange={handleChange} required minLength='6' />
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

export default Login