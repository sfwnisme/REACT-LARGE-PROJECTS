import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { PRO, PROS } from '../../../Api/API'

//:::
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isEmpty: false,
  isError: false,
  success: null,
  error: null,
  delete: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    success: null,
    error: null,
  }
}
//:::

//::: get products
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${PROS}`)
    return fulfillWithValue(res.data)
  } catch (error) {
    const customError = error?.response?.data
    return rejectWithValue(customError)
  }
})
//:::

//::: delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    await AXIOS.delete(`/${PRO}/${id}`)
    return { id: id, message: 'The product has been successfully deleted' }
  } catch (error) {
    let custormError = { message: error.response.data.message, status: error.response.status }
    return rejectWithValue(custormError)
  }
})
//:::



//:::
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //::: get products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isEmpty = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.success = { message: 'The products has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete product
      .addCase(deleteProduct.pending, (state) => {
        state.delete.isLoading = true
        state.delete.isSuccess = false
        state.delete.isError = false
        state.delete.error = null
        state.delete.success = null
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = true
        state.delete.isError = false
        state.delete.success = payload
        state.delete.error = null
        console.log(payload)
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = false
        state.delete.isError = true
        state.delete.success = null
        state.delete.error = payload
        console.log(payload)
      })
  }
})
//:::

export default productsSlice.reducer
export const productsSelector = (state) => state.products
export const deleteProductSelector = (state) => state.products.delete

