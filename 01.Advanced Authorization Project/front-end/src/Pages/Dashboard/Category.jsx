import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { CAT } from '../../Api/API'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Category = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [disable, setDisable] = useState(true)
  const focusRef = useRef(null)
  //:::

  //:::
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  //:::

  //:::
  useEffect(() => {
    setDisable(true)
    try {
      let res = AXIOS.get(`${CAT}/${id}`)
      setTitle(res?.data?.title)
      setDisable(false)
      console.log(':::get category done:::', res)
    } catch (error) {
      setDisable(false)
      navigate(`${pathname}/👈😉ERROR404/`, { replace: true })
      console.log('+++get category error+++', error)
    } finally {
      setDisable(false)
    }
    focusRef.current.focus()
  }, [id])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    setDisable(true)
    let formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)
    try {
      const res = await AXIOS.post(`${CAT}/edit/${id}`, formData)
      setDisable(false)
      console.log(':::edit category done:::', res)
    } catch (error) {
      setDisable(false)
      console.log('+++edit category error+++', error)
    } finally {
      setDisable(false)
    }
  }
  //:::
  return (
    <div>
      <div className='form-container form-noimage'>
        <div className='form-box'>
          <h1>Update Category [{id}]</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={focusRef} type="text" placeholder="Enter text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={disable}>
              {disable ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Category