import { useEffect, useState } from "react"
import { BASE_URL, USERS } from "../../Api/API"
import { Table } from "react-bootstrap"
import axios from "axios"
import Cookie from "cookie-universal"

const Users = () => {
  //:::states
  const [users, setUsers] = useState([])
  //:::
  console.log(users)

  //:::
  const cookie = Cookie()
  const token = cookie.get('e-commerce')
  // console.log(token)
  //:::

  //:::
  useEffect(() => {
    try {

      axios.get(`${BASE_URL}/${USERS}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((data) => {
          setUsers(data.data)
          console.log(':::get users done:::', data)
        })
    } catch (error) {
      console.log('+++get users error++', error)
    }
  }, [token])
  //:::

  //:::
  const usersList = users.map((user) => (
    <tr key={user?.id}>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
    </tr>
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