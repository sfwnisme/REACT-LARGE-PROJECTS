import { Link, NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidbar'>
      <div className='sidbar-links'>
        <NavLink className='link' to="users">Users</NavLink>
        <NavLink className='link' to="create">Create User</NavLink>
        <NavLink className='link' to="/">Edits</NavLink>
      </div>
    </div>
  )
}

export default SideBar