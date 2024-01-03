import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

const Users = () => {
  const [users, setUsers] = useState([])
  console.log(users)
  console.log(import.meta.env.VITE_BASE_URL + 'user/show')


  //::::::::::::::::::::
  const [snapshot, setSnapshot] = useState(0)
  //::::::::::::::::::::
  
  //::::::::::::::::::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  console.log(token)
  //::::::::::::::::::::


  useEffect(() => {
    axios.get(import.meta.env.VITE_BASE_URL + 'user/show', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((data) => {
      setUsers(data.data)
      console.log('::::::get users done::::::', data)
    }).catch((error) => {
      console.log('++++++get users error++++++', error)
    })

  }, [token, snapshot])

  const deleteUser = async (id) => {

    try {
      await axios
        .delete(import.meta.env.VITE_BASE_URL + 'user/delete/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        .then((res) => console.log('::::::delete user done::::::', res))
        setSnapshot((prev) => ++prev)
    } catch (error) {
      console.log('++++++delete user error++++++', error)
    }

  }


  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e74c3c" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )

  const editIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0069d9" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  )

  const usersList = users.map((user) => (
    <tr key={user?.id}>
      <td title={user?.id}>{user?.id}</td>
      <td title={user?.name}>{user?.name.substring(0, 3)}...</td>
      <td title={user?.email}>{user?.email}</td>
      <td className='action-btns'>
        <button className='btn btn-sm'>{editIcon}</button>
        <button className='btn btn-danger btn-sm' onClick={() => deleteUser(user?.id)}>{deleteIcon}</button>
      </td>
    </tr>
  ))


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList}
        </tbody>
      </table>
    </div>
  )
}

export default Users