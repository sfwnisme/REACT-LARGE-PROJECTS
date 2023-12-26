import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios';
import { Link } from "react-router-dom";


const Users = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState('LOADING....')
  const [runUsers, setRunUsers] = useState(0) // use it to rerender the useEffect by adding it as a dependency if we delete a user

  // render users
  useEffect(() => {
    const userData = async () => {
      setLoading('LOADING....')
      await fetch('http://127.0.0.1:8000/api/user/show')
        .then((res) => res.json())
        .then((data) => setUsers(data))
      setLoading('')
    }
    userData()

  }, [runUsers])

  // delete user
  const deleteUser = async (id) => {
    try {
      let res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`)
      res.status == 200 ? setRunUsers((prev) => ++prev) : false
      console.log('delete user request status', res.status)
    } catch (error) {
      console.log('deleteuser error function name [deleteUser]', error)
    } finally {
      console.log(runUsers)
    }
  }

  const updateUser = (id) => {
    // axios.post(`http://127.0.0.1:8000/api/user/delete/${id}`)
  }

  // refresh users
  const refreshUsers = () => {
    setRunUsers((prev) => ++prev)
  }
  const showUsers = users.map((user, index) => (
    <tr key={user?.id}>
      <td>{`${index} - [${user?.id}]`}</td>
      <td>{user?.name.substring(0, 3) + '...'}</td>
      <td>{user?.email}</td>
      <td className="action-box">
        <Link to={`${user?.id}`}>
          <button className="button-sm button-edit" onClick={() => updateUser(user?.id)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </Link>
        <button className="button-sm button-danger" onClick={() => deleteUser(user?.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr >
  ))

  return (
    <div className='users'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>USER</th>
            <th className="d-flex">EMAIL
              <button onClick={refreshUsers} className="button-sm" style={{ color: 'black', background: 'var(--primary-color)', width: 'fit-content' }}><FontAwesomeIcon icon={faRotateRight} title="refresh users" /></button>
            </th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr style={{ color: 'var(--main-color)', fontSize: '20px' }}><td>{loading}</td></tr> : showUsers}
        </tbody>
      </table>
    </div>
  )
}

export default Users