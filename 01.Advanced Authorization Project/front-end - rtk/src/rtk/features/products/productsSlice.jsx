import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { PRO, PROS } from '../../../Api/API'

//::: get products
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${PROS}`)
    console.log(':::get products from rtk done:::', res)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
//:::

//::: delete product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    const res = await AXIOS.delete(`/${PRO}/${id}`)
    console.log(':::delete product from rtk:::', res)
    return null
  } catch (error) {
    return rejectWithValue(error)
  }
})
//:::

//:::
const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isError: false,
  isEmpty: false,
  delete: {
    isLoadingDelete: false,
    errorDelete: null,
    isErrorDelete: false,
  }
}
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
        state.isEmpty = false
        state.isError = false
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.error = null
        state.data = payload
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
      //::: delete product
      .addCase(deleteProduct.pending, (state) => {
        console.log(state)
        state.delete.isLoadingDelete = true
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        console.log('deleted user', 'background: yellow; font-size: 100px')
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = true
        state.delete.errorDelete = payload
        console.log(payload)
      })
  }
})
//:::

export default productsSlice.reducer
export const productsSelector = (state) => state.products
export const deleteProductSelector = (state) => state.products.delete

