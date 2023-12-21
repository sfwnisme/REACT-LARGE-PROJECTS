import axios from 'axios';
import { useState } from "react"
import Header from './Components/Header';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accept, setAccept] = useState(false)
  const [emailError, setEmailError] = useState('')

  const Submit = async (e) => {
    let flag = false;
    e.preventDefault()
    setAccept(true)
    if (password.length < 8)
      flag = false
    else
      flag = true
    if (flag) {
      try {
        let res = await axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
        })
        console.log('%cregister response', 'color: lightgreen', res)
        if (res.status == 200) {
          localStorage.setItem('email', email)
          setEmailError('')
          location.pathname = '/'
        }
      } catch (err) {
        console.log('%cregister error', 'color: red', err)
        setEmailError(err.response.status)
      }
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
          {accept && emailError == 401 && <p className='error'>This email is not registered</p>}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length < 8 && accept && <p className="error">Password must be more than 8 characters</p>}
          <div style={{ textAlign: "center" }}>
            <button className='button' type="submit">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login