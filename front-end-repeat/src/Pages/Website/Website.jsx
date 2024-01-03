import { Outlet } from 'react-router-dom'
import WebsiteHeader from './WebsiteHeader'

const Website = () => {
  return (
    <div className='container'>
      <WebsiteHeader />
      <Outlet />
    </div>
  )
}

export default Website