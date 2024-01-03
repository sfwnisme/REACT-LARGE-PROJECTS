import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "universal-cookie"


const UpdateUser = () => {

  //:::::
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [inputError, setInputError] = useState(false)
  //:::::

  //:::::
  const { id } = useParams()
  const navigate = useNavigate()
  //:::::

  //:::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  console.log(cookie.cookies.Bearer)
  //:::::

  //:::::
  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + 'user/update/' + id,
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
      setInputError(false)
      setEmailError('')
      navigate('/dashboard/users')
      console.log(':::update user done:::', res)
    } catch (error) {
      console.log('++update user error+++', error)
      setEmailError(error.response.status)
    }
  }
  //:::::

  //:::::
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + 'user/showbyid/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((data) => {
        setName(data.data[0].name)
        setEmail(data.data[0].email)
        setPassword('') // to prevent google auto fill
        setRepassword('') // to prevent google auto fill
        console.log(':::get user by id done:::', data)
      })
      .catch((error) => {
        console.log('+++get user by id error+++', error)
      })
  }, [id])
  //:::::

  return (
    <div className="form-container">
      <h1>Update User</h1>
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

export default UpdateUser