import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { CAT } from '../../Api/API'

const AddCategory = () => {
  //:::
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', image)
      const res = await AXIOS.post(`${CAT}/add`, formData)
      console.log(':::add category done:::', res)
    } catch (error) {
      console.log('+++add category error+++', error)
    }
  }
  //:::

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>image</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddCategory