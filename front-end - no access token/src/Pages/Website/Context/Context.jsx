import { createContext, useState } from "react"

export const User = createContext({})

const Context = ({ children }) => {
  const [auth, setAuth] = useState()
  return (
    <Provider.User>{children}</Provider.User>
  )
}

export default Context