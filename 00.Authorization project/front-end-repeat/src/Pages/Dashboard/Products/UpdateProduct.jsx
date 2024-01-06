import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

const UpdateProduct = () => {
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

  //:::::
  const id = location.pathname.split('/').pop()
  const navigate = useNavigate()
  //:::::

  //:::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.cookies.Bearer
  console.log(token)
  //:::::

  //:::::
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + 'product/showbyid/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((data) => {
        setTitle(data.data[0].title)
        setDescription(data.data[0].description)
        console.log(':::get product done:::', data)
      }).catch((error) => {
        console.log('+++get product error+++', error)
      })
  }, [id, token])
  //:::::

  //:::::
  const Submit = async (e) => {
    e.preventDefault()
    setInputError(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)
      axios
        .post(import.meta.env.VITE_BASE_URL + 'product/update/' + id,
          formData,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        .then((data) => {
          setInputError(false)
          setTitleError('')
          setDescriptionError('')
          setImageError('')
          navigate('/dashboard/products')
          console.log(':::update product done:::', data)
        })
    } catch (error) {
      setTitleError(error?.response?.data?.errors?.title)
      setDescriptionError(error?.response?.data?.errors?.description)
      setImageError(error?.response?.data?.errors?.image)
      console.log('+++update product error+++', error)

    }
  }
  //:::::

  return (
    <div className="form-container">
      <h1>Update Product</h1>
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
        <button type="submit" className="btn">Update</button>
      </form>
    </div >)
}

export default UpdateProduct