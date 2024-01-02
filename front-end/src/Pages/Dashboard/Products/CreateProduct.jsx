import axios from "axios"
import { useContext, useState } from "react"
import { User } from "../../Website/Context/UserContext"

const CreateProduct = () => {

  const [accept, setAccept] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  console.log(description)

  //::::::::::toekn:::::::::::::
  const context = useContext(User)
  const userToken = context.auth.token

  const Submit = async (e) => {
    e.preventDefault()
    setAccept(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)
      console.log(formData)

      let res = await axios.post('http://127.0.0.1:8000/api/product/create', formData, {
        headers: {
          Authorization: 'Bearer ' + userToken,
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
      setAccept(true)
    }
  }



  return (
    <div className='form-container'>
      <h1>Create Product</h1>
      <form onSubmit={Submit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id='title' placeholder='title...' value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* {name === '' && accept && <p className="error">Name is required</p>} */}
        <label htmlFor="description">description:</label>
        <input type="description" id="description" placeholder="description..." required value={description} onChange={(e) => setDescription(e.target.value)} />
        {/* {accept && emailError && <p className='error'>Email has already taken</p>} */}
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" placeholder="image..." onChange={(e) => setImage(e.target.files.item(0))} />
        {/* {passwordR !== password && accept && <p className="error">Password does not match</p>} */}
        <div style={{ textAlign: "center" }}>
          <button className='button' type="submit">Create Product</button>
        </div>
      </form >
    </div >
  )
}

export default CreateProduct