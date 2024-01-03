import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Website } from './Pages/Website'
import { CreateProduct, CreateUser, Dashboard, Products, UpdateProduct, UpdateUser, Users } from './Pages/Dashboard'
import Login from './Pages/Website/Auth/Login'
import Register from './Pages/Website/Auth/Register'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Website />
      },
      {
        path: '/',
        element: <Website />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Users />
          }
          ,
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'users/create',
            element: <CreateUser />
          },
          {
            path: 'users/:id',
            element: <UpdateUser />
          },
          {
            path: 'products',
            element: <Products />
          },
          {
            path: 'products/create',
            element: <CreateProduct />
          },
          {
            path: 'products/:id',
            element: <UpdateProduct />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} >
    <App />
  </RouterProvider>
  // </React.StrictMode >
)
