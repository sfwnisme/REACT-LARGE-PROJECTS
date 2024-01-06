import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../../Website/Context/UserContext'

const UpdateProduct = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [accept, setAccept] = useState(false)

  //:::::::::token:::::::::::
  const context = useContext(User)
  const userToken = context.auth.token
  //:::::::::::::::::::::::::
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }).then((data) => {
      console.log(data)
      setTitle(data.data[0].title)
      setDescription(data.data[0].description)
    })
  }, [id, userToken])

  console.log(id)
  const Submit = async (e) => {
    e.preventDefault()
    setAccept(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)
      let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`, formData, {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
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

export default UpdateProduct