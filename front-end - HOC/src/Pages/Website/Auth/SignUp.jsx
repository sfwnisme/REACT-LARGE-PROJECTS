import axios from 'axios';
import Header from '../../../Components/Header'
import { useContext, useState } from 'react';
import { User } from '../Context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordR, setPasswordR] = useState('')
  const [accept, setAccept] = useState(false)
  const [emailError, setEmailError] = useState(false) // email existence detector

  const navigate = useNavigate()

  //::::::::::::::/CONTEXT\::::::::::::::
  const userNow = useContext(User)
  //:::::::::::::::::::::::::::::::::::::

  const Submit = async (e) => {
    e.preventDefault()
    setAccept(true)
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name,
        email,
        password,
        password_confirmation: passwordR
      })
      /*
      ::::::::::::::::::::::::::::::::::STORE TOKEN AND USERDATA IN CNOTEXT::::::::::::::::::::::::::::::::::
      [HIT]==> store the user data and token into the context api of the reactjs
      :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      */
      let token = res?.data?.data?.token
      let userDetails = res?.data?.data?.user
      console.log(userDetails, token)
      userNow.setAuth({ token, userDetails })
      console.log(userNow)
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
      navigate('/dashboard')
    } catch (err) {
      console.log('%cregister error', 'color: red', err)

      if (err?.response?.status === 422)
        setEmailError(err?.response?.status)
      else
        setEmailError('')// if the user == 422 it means it's already taken

      setAccept(true)
    }
  }
  return (
    <div className="container">
      <Header />
      <div className="register">
        <div className='form-container'>
          <h1>Sign Up</h1>
          <form onSubmit={Submit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
            {name === '' && accept && <p className="error">Name is required</p>}
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Email..." required value={email} onChange={(e) => { setEmail(e.target.value); setEmailError('') }} />
            {accept && emailError && <p className='error'>Email has already taken</p>}
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            {password.length < 8 && accept && <p className="error">Password must be more than 8 characters</p>}
            <label htmlFor="repeat">Repeat Password:</label>
            <input type="password" id="repeat" placeholder="Repeat Password" value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
            {passwordR !== password && accept && <p className="error">Password does not match</p>}
            <div style={{ textAlign: "center" }}>
              <button className='button' type="submit">Register</button>
            </div>
          </form >
        </div >
      </div>
    </div>
  )
}

export default SignUp