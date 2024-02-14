import { createContext, useState } from 'react'

export const User = createContext({})
const Context = ({ children }) => {
  const [auth, setAuth] = useState({})
  return (
    <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>
  )
}

export default Context