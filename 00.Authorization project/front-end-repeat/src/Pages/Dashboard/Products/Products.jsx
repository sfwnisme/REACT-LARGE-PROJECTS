import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import Cookies from "universal-cookie"

const Products = () => {

  //:::::
  const [products, setProducts] = useState([])
  const [refreshData, setRefreshData] = useState(0)
  //:::::

  //:::::
  const cookie = new Cookies(null, { path: '/' })
  const token = cookie.get('Bearer')
  //:::::

  //:::::
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + 'product/show',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then((data) => {
        setProducts(data.data)
        console.log(':::get products done:::', data)
      })
      .catch((error) => {
        console.log('+++get products error+++', error)
      })
  }, [refreshData, token])
  //:::::

  //:::::
  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e74c3c" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )

  const editIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0069d9" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  )
  //:::::

  //:::::
  const deleteProduct = async (id) => {
    try {
      await axios
        .delete(import.meta.env.VITE_BASE_URL + 'product/delete/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )
        .then((data) => {
          setRefreshData((prev) => ++prev) // any variable
          // setRefreshData(++refreshData) // any variable except const
          console.log(':::delete product done:::', data)
        })
    } catch (error) {
      console.log('+++delete product error+++', error)
    }
  }
  //:::::

  //:::::
  const productsList = products.map((product) => (
    <tr key={product?.id}>
      <td>{product?.id}</td>
      <td>{product?.title}</td>
      <td>{product?.description}</td>
      <td><img src={product?.image} alt={product?.title} /></td>
      <td>
        <div className="action-btns">
          <NavLink to={`${product?.id}`} className='btn btn-sm'>{editIcon}</NavLink>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProduct(product?.id)}>{deleteIcon}</button>
        </div>
      </td>
    </tr>
  ))
  //:::::

  return (
    <div className="products-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsList}
        </tbody>
      </table>
    </div>
  )
}

export default Products