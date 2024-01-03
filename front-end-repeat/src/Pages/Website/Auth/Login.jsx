import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //::::::::::::::::::::::::
  const [emailError, setEmailError] = useState('')
  const [inputError, setInputError] = useState(false)
  //::::::::::::::::::::::::

  //::::::::::::::::::::::::
  const cookie = new Cookies(null, { path: '/' })
  console.log(cookie.cookies.Bearer)
  //::::::::::::::::::::::::



  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
        email,
        password
      })
      cookie.set('Bearer', res.data.data.token)
      setEmailError(false)
      setInputError('')
      console.log('::::::login done::::::', res)
    } catch (error) {
      setEmailError(error.response.status)
      console.log('++++login error++++', error)
    }
  }

  return (
    <div className="form-container">
      <h1>Log in</h1>
      <form onSubmit={Submit}>
        <label htmlFor="name">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {inputError && emailError == '401' && <small>email or password is not correct</small>}
        <label htmlFor="name">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {inputError && password.length < 8 && <small>password must be more thant 8 characters</small>}
        <button type='submit' className="btn">Log in</button>
      </form>
    </div>
  )
}

export default Login