import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <NavLink className='nav-link' to="/">
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className='nav-link' to="/login">
            Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className='nav-link' to="/register">
            Register
          </NavLink>
        </Nav.Item>
      </Nav>
    </header>
  );
}

export default Header;