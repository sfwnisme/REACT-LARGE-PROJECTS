import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './authSlice'
import UsersReducer from '../features/users/usersSlice'
import CategoriesReducer from '../features/categories/categoriesSlice'
import ProductsReducer from '../features/products/productsSlice'
import RegisterUserReducer from '../api/registerSlice'
import LoginUserReducer from '../api/loginSlice'
import LogoutReducer from '../api/logoutSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    register: RegisterUserReducer,
    login: LoginUserReducer,
    logout: LogoutReducer,
    users: UsersReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
  },
  devTools: true
})