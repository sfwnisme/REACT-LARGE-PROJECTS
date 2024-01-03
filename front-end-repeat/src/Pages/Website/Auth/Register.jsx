import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"

const Register = () => {
  // const API = 'http://127.0.0.1:8000/api/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  //:::::::::::::::::::::
  const [emailError, setEmailError] = useState('')
  const [inputError, setInputError] = useState(false)
  //:::::::::::::::::::::

  //:::::::::::::::::::::
  const cookie = new Cookies(null, { path: '/' })
  console.log(cookie.get('Bearer'))
  //:::::::::::::::::::::



  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}register`, {
        name,
        email,
        password,
        password_confirmation: repassword
      })
      cookie.set('Bearer', res.data.data.token)
      setEmailError('')
      setInputError(false)
      console.log('::::::register done::::::', res)

    } catch (error) {
      console.log('::::::register error::::::', error)
      setEmailError(error.response.status)
    }
  }
  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={Submit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="name">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {inputError && emailError == '422' && <small>this email is regsitered</small>}
        <label htmlFor="name">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {inputError && password.length < 8 && <small>password must be more thant 8 characters</small>}
        <label htmlFor="name">Repeat Password:</label>
        <input type="password" name="repeat-password" id="repeat-password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
        {inputError && repassword !== password && <small>password not match</small>}
        <button type='submit' className="btn">Register</button>
      </form>
    </div>
  )
}

export default Register