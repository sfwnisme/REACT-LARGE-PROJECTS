import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/Website/HomePage.jsx'
import Login from './Pages/Auth/Login.jsx'
import Register from './Pages/Auth/Register.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Pages/Website/Users.jsx'


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
        element: <Users />,
        path: 'users'
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
