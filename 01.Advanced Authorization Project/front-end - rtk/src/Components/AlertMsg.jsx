import { useEffect } from 'react'
import { Alert } from "react-bootstrap";

const AlertMsg = ({ message, isError, isMsg, setIsMsg, delay }) => {
  console.log(message)
  useEffect(() => {
    const timer = setTimeout(() => setIsMsg(false), [delay])
    return () => clearTimeout(timer)
  }, [isMsg])
  return (
    <>
      {
        isMsg ?
          <Alert variant={isError ? "danger" : "success"} className={`credentials-${isError ? 'error' : 'success'}`}>
            {message}
          </Alert >
          : null
      }
    </>
  )
}

export default AlertMsg