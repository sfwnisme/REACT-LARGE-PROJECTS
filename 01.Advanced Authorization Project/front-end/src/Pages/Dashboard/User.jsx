import { useEffect, useState } from 'react'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { USER } from '../../Api/API'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const User = () => {
  //:::
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  //:::

  //:::
  const id = window.location.pathname.replace('/dashboard/users/', '')
  console.log(id)
  //:::

  //:::
  useEffect(() => {
    AXIOS
      .get(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name)
        setEmail(data.data.email)
        setLoading(false)
        console.log(':::get user done:::', data)
      })
      .catch((error) => {
        console.log('+++get user error+++', error)
      })
  }, [id])
  //:::

  //:::
  const Submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await await AXIOS.post(`${USER}/edit/${id}`, {
        name: name,
        email: email
      })
      setLoading(false)
      window.location.pathname = '/dashboard/users'
      console.log(':::edit user done:::', res)
    } catch (error) {
      setLoading(false)
      console.log('+++edit user error+++', error)
    } finally {
      setLoading(false)
    }
  }
  //:::

  return (
    <div>
      <div className='form-container form-noimage'>
        <div className='form-box'>
          <h1>Update User [{id}]</h1>
          <Form onSubmit={Submit}>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='text' id="name" name='name' placeholder="" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Label htmlFor="email">Name</Form.Label>
            </Form.Group>
            <Form.Group className="mb-4 input-container">
              <Form.Control type='email' id="email" name='email' placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Label htmlFor="password">Email</Form.Label>
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" disabled={loading}>
              {loading
                ? 'Updating...'
                : 'Update'
              }
            </Button>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default User