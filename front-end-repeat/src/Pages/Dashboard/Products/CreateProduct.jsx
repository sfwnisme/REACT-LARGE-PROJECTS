import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"

const CreateProduct = () => {
  //:::::
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  //:::::

  //:::::
  const [inputError, setInputError] = useState(false)
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [imageError, setImageError] = useState('')
  //:::::

  //::::: cookies
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  //:::::

  //::::: create product function
  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)
      const res = await axios
        .post(import.meta.env.VITE_BASE_URL + 'product/create',
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
      setTitleError('')
      setDescriptionError('')
      setImageError('')
      setInputError(false)
      console.log(':::create product done:::', res)
    } catch (error) {
      setTitleError(error?.response?.data?.errors?.title)
      setDescriptionError(error?.response?.data?.errors?.description)
      setImageError(error?.response?.data?.errors?.image)
      console.log('+++create product error+++', error)
    }
  }
  //:::::

  return (
    <div className="form-container">
      <h1>Create Product</h1>
      <form onSubmit={Submit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {inputError && titleError && <small>{titleError}</small>}
        <label htmlFor="title">Description:</label>
        <input type="text" name="title" value={description} onChange={(e) => setDescription(e.target.value)} />
        {inputError && descriptionError && !titleError && <small>{descriptionError}</small>}
        <label htmlFor="title">Image:</label>
        <input type="file" name="title" onChange={(e) => setImage(e.target.files.item(0))} className="custom-file-input" />
        {inputError && imageError && !descriptionError && !titleError && < small > {imageError}</small>}
        <button type="submit" className="btn">Create</button>
      </form>
    </div >
  )
}

export default CreateProduct