import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/API"
import { Badge, Table } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Cookie from "cookie-universal"
import { AXIOS } from "../../Api/AXIOS.JSX"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import getUserType from "../../utils/getUserType"

const Users = () => {
  //:::states
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [reloadUsers, setReloadUsers] = useState(true)
  //:::

  //:::
  const cookie = Cookie()
  const token = cookie.get('e-commerce')
  //:::

  //:::
  const id = window.location.pathname.replace('/dashboard/users/', '')
  console.log(id)
  //:::

  //:::
  useEffect(() => {
    AXIOS
      .get(`/${USER}`)
      .then((data) => {
        setCurrentUser(data.data)
        console.log(':::get authuser done:::', data)
      })
  }, [])
  //:::

  //:::
  useEffect(() => {
    try {
      AXIOS
        .get(`/${USERS}`)
        .then((data) => {
          setUsers(data.data)
          console.log(':::get users done:::', data)
        })
    } catch (error) {
      console.log('+++get users error++', error)
    }
  }, [token, reloadUsers])
  //:::

  //:::
  const handleDelete = async (id) => {
    setReloadUsers((prev) => !prev)
    try {
      const res = AXIOS.delete(`${USER}/${id}`)
      console.log(':::delete user done:::', res)
    } catch (error) {
      console.log('+++delete user error+++', error)
    }
  }
  //:::

  //:::
  const refreshBtn = () => setReloadUsers((prev) => !prev)
  //:::

  //::: filter users not equal the current user(signed user)
  const usersExceptCurrentUser = users.filter((user) => user.id != currentUser.id)
  //:::

  //:::
  const usersList = usersExceptCurrentUser.map((user) => (
    <tr key={user?.id}>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>
        <Badge bg='info'>
          {getUserType(user?.role)}
        </Badge>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleDelete(user?.id)} >
          <FontAwesomeIcon size="xs" icon={faTrash} />
        </Button>
        <span> </span>
        <NavLink to={`${user?.id}`}>
          <Button variant="primary" size="sm">
            <FontAwesomeIcon size="xs" icon={faPen} />
          </Button>
        </NavLink>
      </td>
    </tr >
  ))
  //:::

  return (
    <div>
      <div className="d-flex gap-2 justify-space-between">
        <Button size="sm" className="w-full" onClick={refreshBtn}>refresh users</Button>
        <NavLink to='/dashboard/user/add'>
          <Button variant="outline-primary" size="sm" className="w-full" onClick={refreshBtn}>
            Add user
          </Button>
        </NavLink>
      </div>
      <br />
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th style={{ display: 'flex', justifyContent: 'space-between' }}>
              Email
            </th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.length != 0
              ? users.length > 1
                ? usersList
                : <tr><td colSpan={12} style={{ textAlign: 'center' }}>No users</td></tr>
              : <tr><td colSpan={12} style={{ textAlign: 'center' }}>Loading....</td></tr>
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users