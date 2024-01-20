import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import { USER } from '../Api/API';
import { AXIOS } from '../Api/AXIOS.JSX';

const Sidebar = () => {

  //:::
  const [user, setUser] = useState({})
  //:::

  //:::
  useEffect(() => {
    AXIOS.get(`/${USER}`).then((data) => {
      setUser(data.data)
      console.log(':::get user from sidebar done:::', data)
    }).catch((error) => {
      console.log('+++get user from sidebar error+++', error)
    })
  }, [])
  //:::


  return (
    <aside>
      <ListGroup>
        {
          user.role === '1995' ?
            <>
              <ListGroup.Item>
                <NavLink to='users'>Users</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink to='/dashboard/user/add'>Add user</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink to='writer'>Writer</NavLink>
              </ListGroup.Item>
            </>
            : user.role === '1996' &&
            <ListGroup.Item>
              <NavLink to='writer'>Writer</NavLink>
            </ListGroup.Item>
        }
      </ListGroup>
    </aside>
  )
}

export default Sidebar