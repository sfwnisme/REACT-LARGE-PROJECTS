import { useEffect, useState } from 'react'
import axios from 'axios'

const Form = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordR, setPasswordR] = useState('')
  const [accept, setAccept] = useState(false) // show errors after first click
  const [emailError, setEmailError] = useState('') // email existence detector

  useEffect(() => {
    setName(props?.name)
    setEmail(props?.email)
  }, [props?.name, props?.email])

  const Submit = async (e) => {
    // we used the flag variable instead of useState to detect the changes in 
    // the Submit function and get the (true | false) directly
    let flag = false; // check if the all required values done
    e.preventDefault()
    setAccept(true)
    if (name === '' || password.length < 8 || passwordR !== password)
      flag = false
    else
      flag = true

    if (flag) {
      try {
        let res = await axios.post(`http://127.0.0.1:8000/api/${props?.endPoint}`, {
          name,
          email,
          password,
          password_confirmation: passwordR
        })
        if (res.status) {
          location.pathname = `/${props?.navigateTo}`
          props?.hasLocalStorage && localStorage.setItem('email', email)
          setEmailError('')
        }
      } catch (err) {
        console.log('%cregister error', 'color: red', err)
        setEmailError(err?.response?.status)// if the user == 422 it means it's already taken
      }
    }
  }
  return (
    <div className='form-container'>
      <h1>{props.title}</h1>
      <form onSubmit={Submit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
        {name === '' && accept && <p className="error">Name is required</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
        {accept && emailError && <p className='error'>Email has already taken</p>}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
        {password.length < 8 && accept && <p className="error">Password must be more than 8 characters</p>}
        <label htmlFor="repeat">Repeat Password:</label>
        <input type="password" id="repeat" placeholder="Repeat Password" value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
        {passwordR !== password && accept && <p className="error">Password does not match</p>}
        <div style={{ textAlign: "center" }}>
          <button className='button' type="submit">{props?.button}</button>
        </div>
      </form>
    </div>
  )
}

export default Form