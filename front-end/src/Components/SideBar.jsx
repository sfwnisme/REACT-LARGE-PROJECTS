import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidbar'>
      <div className='sidbar-links'>
        <Link className='link' to="/dashboard/users">Users</Link>
        <Link className='link' to="">Settings</Link>
        <Link className='link' to="">Edits</Link>
      </div>
    </div>
  )
}

export default SideBar