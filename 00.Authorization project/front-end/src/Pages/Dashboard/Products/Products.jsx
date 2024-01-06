import { faPen, faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"
import { User } from "../../Website/Context/UserContext"

const Products = () => {
  const [products, setProducts] = useState([])
  const [updateUseEffect, setUpdateUseEffect] = useState(0)
  const refreshProducts = () => {
    setUpdateUseEffect((prev) => ++prev)
  }

  //::::::::::[Context]::::::::::
  const context = useContext(User)
  const userToken = context.auth.token
  //::::::::::[End Context]::::::::::

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/product/show', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + userToken
      }
    }).then((data) => {
      console.log('product data', data)
      setProducts(data.data)
    }).catch((error) => {
      console.log(error)
    })

  }, [updateUseEffect])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userToken
        }
      }).then((res) => {
        console.log(res)
        res.status == 200 ? setUpdateUseEffect(prev => ++prev) : false
      })
    } catch (error) {
      console.log(error)
    }
  }

  const showProducts = products.map((product, index) => {
    return (
      <tr key={product?.id}>
        <td>{`${index} - [${product?.id}]`}</td>
        <td title={product?.title}>{product?.title.substring(0, 3) + '...'}</td>
        <td title={product?.description}>{product?.description}</td>
        <td>
          <img src={product?.image} alt="" />
        </td>
        <td className="action-box">
          <Link to={`${product?.id}`}>
            <button className="button-sm button-edit">
              <FontAwesomeIcon icon={faPen} />
            </button>
          </Link>
          <button className="button-sm button-danger" onClick={() => deleteProduct(product?.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr >
    )
  })
  return (
    <div className='users'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>USER</th>
            <th className="d-flex">EMAIL
              <button onClick={refreshProducts} className="button-sm" style={{ color: 'black', background: 'var(--primary-color)', width: 'fit-content' }}><FontAwesomeIcon icon={faRotateRight} title="refresh users" /></button>
            </th>
            <th>image</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {showProducts}
        </tbody>
      </table>
    </div>
  )
}

export default Products