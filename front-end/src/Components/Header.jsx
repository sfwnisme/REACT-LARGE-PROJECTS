
// import '../App.css'
const Header = () => {
  return (
    <div className="container">
      <nav className="d-flex" >
        <div className="d-flex" >
          <h6>Home</h6>
          <h6>About</h6>
        </div>
        <div className="d-flex">
          <div className='register-nav' style={{ textAlign: 'center' }}>
            Register
          </div>
          <div className='register-nav' style={{ textAlign: 'center' }}>
            Login
          </div>
        </div>
      </nav>
    </div>

  )
}

export default Header