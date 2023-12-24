import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import Users from './Users.jsx'
import UpdateUser from './UpdateUser.jsx'


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
            path: 'users',
            element: <Users />
          }
        ]
      },
      {
        path: '/dashboard/users/:id',
        element: <UpdateUser />,
      }

    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode >
)
