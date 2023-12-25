import { useEffect, useState } from "react"
import Form from '../../../Components/Form';

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  let id = location.pathname.split('/').slice(-1)[0]
  console.log(id)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`).then((res) => {
      return res.json()
    }).then((data) => {
      setName(data[0].name)
      setEmail(data[0].email)
    })
  }, [id])

  return (
    <div className="container">
      <div className="register">
        <Form title="Update user" endPoint={`user/update/${id}`} navigateTo='dashboard/users' name={name} email={email} button='Update' />
      </div>
    </div>
  )
}

export default UpdateUser