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
import UserProvider from './Pages/Website/Context/UserContext.jsx'
import RequireAuth from './Pages/Website/Auth/RequireAuth.jsx'
import PersistLogin from './Pages/Website/Auth/PersistLogin.jsx'
import Products from './Pages/Dashboard/Products/Products.jsx'
import CreateProduct from './Pages/Dashboard/Products/CreateProduct.jsx'
import UpdateProduct from './Pages/Dashboard/Products/UpdateProduct.jsx'


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
        // index: true,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth />,
            children: [
              {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                  {
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
                  {
                    path: 'products',
                    element: <Products />
                  },
                  {
                    path: 'product/create',
                    element: <CreateProduct />
                  },
                  {
                    path: 'products/:id',
                    element: <UpdateProduct />
                  }
                ]
              },
            ]
          },
        ]
      },

    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode >
)
