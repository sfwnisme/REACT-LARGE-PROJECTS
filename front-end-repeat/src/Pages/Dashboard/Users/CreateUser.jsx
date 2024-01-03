import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"

const CreateUser = () => {
  //:::::
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  //:::::

  //:::::
  const [inputError, setInputError] = useState(false)
  const [emailError, setEmailError] = useState({})
  //:::::

  //:::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  //:::::

  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)
    try {
      await axios
        .post(import.meta.env.VITE_BASE_URL + 'user/create',
          {
            name,
            email,
            password,
            password_confirmation: repassword
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        .then((data) => {

          setInputError(false)
          setEmailError({})
          console.log(':::create user done:::', data)
        })

    } catch (error) {
      setEmailError({ error: error.response.status, message: error.response.data.message })
      console.log('+++create user error+++', error)
    }
  }

  return (
    <div className="form-container">
      <h1>Create User</h1>
      <form onSubmit={Submit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="name">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {inputError && emailError.error == '422' && <small>{emailError.message}</small>}
        <label htmlFor="name">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {inputError && password.length < 8 && <small>password must be more thant 8 characters</small>}
        <label htmlFor="name">Repeat Password:</label>
        <input type="password" name="repeat-password" id="repeat-password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
        {inputError && repassword !== password && <small>password not match</small>}
        <button type='submit' className="btn">Create</button>
      </form>
    </div>
  )
}

export default CreateUser