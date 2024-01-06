import ReactDOM from 'react-dom/client'
import Home from './Pages/Website/Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Pages/Website/Auth/SignUp.jsx'
import Login from './Pages/Website/Auth/Login.jsx'
import App from './App.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Users from './Pages/Dashboard/Users/Users.jsx'
import UpdateUser from './Pages/Dashboard/Users/UpdateUser.jsx'
import Createuser from './Pages/Dashboard/Users/Createuser.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'register',
        element: <SignUp />,
        index: true,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            // index: true,
            path: 'users',
            element: <Users />
          },
          {
            path: 'create',
            element: <Createuser />
          },
          {
            path: 'users/:id',
            element: <UpdateUser />,
          },
        ]
      },

    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode >
)
