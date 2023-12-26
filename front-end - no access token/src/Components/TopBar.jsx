import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className='topbar'>
      <h1>Dashboard</h1>
      <Link className='button' to='/'>Vist Website</Link>
    </div>
  )
}

export default TopBar