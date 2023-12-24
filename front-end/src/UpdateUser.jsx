import axios from 'axios';
import { useEffect, useState } from "react"
import Header from './Components/Header'

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordR, setPasswordR] = useState('')
  const [accept, setAccept] = useState(false)

  let id = location.pathname.split('/').slice(-1)[0]
  console.log(id)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      setName(data[0].name)
      setEmail(data[0].email)
    })
  }, [id])

  const Submit = async (e) => {
    let flag = false;
    e.preventDefault()
    setAccept(true)
    if (name === '' || password.length < 8 || passwordR !== password)
      flag = false
    else
      flag = true

    if (flag) {
      try {
        let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
          name,
          email,
          password,
          password_confirmation: passwordR
        })
        if (res.status) {
          location.pathname = '/dashboard/users'
          localStorage.setItem('email', email)
        }
      } catch (err) {
        console.log('%cregister error', 'color: red', err)
      }
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="register">
        <form onSubmit={Submit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id='name' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
          {name === '' && accept && <p className="error">Name is required</p>}
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length < 8 && accept && <p className="error">Password must be more than 8 characters</p>}
          <label htmlFor="repeat">Repeat Password:</label>
          <input type="password" id="repeat" placeholder="Repeat Password" value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
          {passwordR !== password && accept && <p className="error">Password does not match</p>}
          <div style={{ textAlign: "center" }}>
            <button className='button' type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser