import TopBar from '../../Components/TopBar'
import { Outlet } from 'react-router-dom'
import './dashboard.css'
import SideBar from '../../Components/SideBar'

const Dashboard = () => {
  return (
    <div className='container dashboard'>
      <TopBar />
      <div className='dashboard-content'>
        <SideBar />
        <Outlet />
        {/* <Users /> */}
      </div>
    </div>
  )
}

export default Dashboard