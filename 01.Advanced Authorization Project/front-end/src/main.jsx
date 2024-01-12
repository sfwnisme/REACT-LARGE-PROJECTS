import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/Website/HomePage.jsx'
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Pages/Dashboard/Users.jsx'
import GoogleCallBack from './Pages/Auth/GoogleCallBack.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import RequireAuth from './Pages/Auth/RequireAuth.jsx'
import User from './Pages/Dashboard/User.jsx'


const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        element: <Login />,
        path: 'login',
      },
      {
        element: <Register />,
        path: 'register',
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
              {
                element: <Users />,
                path: 'users'
              },
              {
                element: <User />,
                path: 'users/:id'
              }
            ]
          },
        ]
      },
      {
        element: <GoogleCallBack />,
        path: '/auth/google/callback'
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
