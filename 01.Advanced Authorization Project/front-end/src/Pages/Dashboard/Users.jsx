import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/API"
import { Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Cookie from "cookie-universal"
import { AXIOS } from "../../Api/AXIOS.JSX"
import { NavLink } from "react-router-dom"

const Users = () => {
  //:::states
  const [users, setUsers] = useState([])
  const [num, setNum] = useState(0)
  //:::

  //:::
  const cookie = Cookie()
  const token = cookie.get('e-commerce')
  //:::

  //:::
  useEffect(() => {
    try {
      AXIOS.get(`/${USERS}`)
        .then((data) => {
          setUsers(data.data)
          console.log(':::get users done:::', data)
        })
    } catch (error) {
      console.log('+++get users error++', error)
    }
  }, [token, num])
  //:::

  //:::
  const handleDelete = async (id) => {
    setNum((prev) => ++prev)
    try {
      const res = AXIOS.delete(`${USER}/${id}`)
      console.log(':::delete user done:::', res)
    } catch (error) {
      console.log('+++delete user error+++', error)
    }
  }
  //:::

  //:::
  const usersList = users.map((user) => (
    <tr key={user?.id}>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleDelete(user?.id)}>&#129530;</Button>
        <NavLink to={`${user?.id}`}>
          <Button variant="primary" size="sm">u</Button>
        </NavLink>
      </td>
    </tr >
  ))
  //:::


  return (
    <div>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usersList}
        </tbody>
      </Table>
    </div>
  )
}

export default Users