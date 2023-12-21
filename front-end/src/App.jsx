import './App.css'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App