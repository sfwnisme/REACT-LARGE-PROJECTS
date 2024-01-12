// import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import Logout from '../Pages/Auth/Logout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Cookie from 'cookie-universal';
const Header = () => {

  //:::
  const cookie = Cookie()
  let token = cookie.get('e-commerce')
  //:::

  return (
    <header>
      <Navbar expand="lg" className="">
        <Container fluid>
          <Navbar.Brand href="#">SFWN</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Item>
                <NavLink className='nav-link' to="/">
                  Home
                </NavLink>
              </Nav.Item>
            </Nav>
            <ButtonGroup>
              <Button variant='outline-secondary' size='sm'>
                <NavLink className='nav-link' to="/dashboard">
                  Dashboard
                </NavLink>
              </Button >
              {
                token
                  ?
                  <Logout />
                  :
                  <>
                    <Button variant='primary' size='sm'>
                      <NavLink className='nav-link' to="/login">
                        Login
                      </NavLink>
                    </Button>
                    <Button variant='primary' size='sm'>
                      <NavLink className='nav-link' to="/register">
                        Register
                      </NavLink>
                    </Button>
                  </>
              }
            </ButtonGroup>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  );
}

export default Header;