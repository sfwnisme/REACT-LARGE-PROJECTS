import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <ListGroup>
        <ListGroup.Item>
          <NavLink to='users'>Users</NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to=''>Create Users</NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to=''>Products</NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to=''>Create Product</NavLink>
        </ListGroup.Item>
      </ListGroup>
    </aside>
  )
}

export default Sidebar