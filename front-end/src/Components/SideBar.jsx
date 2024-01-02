import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidbar'>
      <div className='sidbar-links'>
        <NavLink className='link' to="users">Users</NavLink>
        <NavLink className='link' to="create">Create User</NavLink>
        <NavLink className='link' end to="products">Products</NavLink>
        <NavLink className='link' to="products/create">New products</NavLink>
      </div>
    </div>
  )
}

export default SideBar