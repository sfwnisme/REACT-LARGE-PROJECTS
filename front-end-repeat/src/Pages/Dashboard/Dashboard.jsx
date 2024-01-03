
import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import Aside from '../../Components/Aside'
const Dashboard = () => {
  console.log('dahsboard')
  return (
    <div className='container'>
      <DashboardHeader />
      <div className='dashboard-body'>
        <Aside />
        <div className='content-view'>
        <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard