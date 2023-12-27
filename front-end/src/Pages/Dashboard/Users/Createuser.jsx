import { useContext, useState } from 'react'
// import Form from '../../../Components/Form'
import { User } from '../../Website/Context/UserContext'
import axios from 'axios'

const Createuser = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordR, setPasswordR] = useState('')
  // const [accept, setAccept] = useState(false) // show errors after first click
  const [emailError, setEmailError] = useState('') // email existence detector


  // CONTEXT
  const userNow = useContext(User)
  console.log(userNow)

  const Submit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/user/create`, {
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
      let userDetails = res?.data?.data?.user
      let token = res?.data?.data?.token
      userNow.setAuth({ token, userDetails })
      console.log(userNow)
      //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    } catch (err) {
      console.log('%cregister error', 'color: red', err)
      setEmailError(err?.response?.status)// if the user == 422 it means it's already taken
    }
  }

  return (
    <div className='register'>
      {/* <Form title="Create New User" endPoint='user/create' navigateTo="dashboard/users" button="Create" /> */}
      <div className='form-container'>
        <h1>Create User</h1>
        <form onSubmit={Submit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id='name' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} />
          {/* {name === '' && accept && <p className="error">Name is required</p>} */}
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
          {/* {accept && emailError && <p className='error'>Email has already taken</p>} */}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* {password.length < 8 && accept && <p className="error">Password must be more than 8 characters</p>} */}
          <label htmlFor="repeat">Repeat Password:</label>
          <input type="password" id="repeat" placeholder="Repeat Password" value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
          {/* {passwordR !== password && accept && <p className="error">Password does not match</p>} */}
          <div style={{ textAlign: "center" }}>
            <button className='button' type="submit">Create</button>
          </div>
        </form >
      </div >
    </div>
  )
}

export default Createuser