import { createContext, useState } from "react"

export const User = createContext({})
// NOTE:::> you can also use HOC pattern to protect your routes 
// reconsider the react and redux toolkit project from KIMZO CODE's youtube channel 
// to apply the pattern for more security
const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  return (
    <User.Provider value={{ auth, setAuth }}>{children}</User.Provider>
  )
}

export default UserProvider