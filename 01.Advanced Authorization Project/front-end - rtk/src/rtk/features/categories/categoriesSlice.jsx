import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { CAT, CATS } from '../../../Api/API'
import { deleteProduct } from '../products/productsSlice'

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

//::: get categories
export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${CATS}`)
    console.log(':::get categories from rtk:::', res)
    return fulfillWithValue(res.data)
    // return res.data
  } catch (error) {
    const customError = error?.response?.data
    console.log(customError)
    return rejectWithValue(customError)
  }
})
//:::

//:::
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.delete(`/${CAT}/${id}`)
    console.log(':::get category from rtk done:::', res)
    return { id: id, message: 'The User has been successfully deleted' }
  } catch (error) {
    console.log('+++++++', error)
    let customError = { message: error.response.data.message, status: error.response.status }
    // if you did not return the error value .unwrap() will not wrok
    return rejectWithValue(customError)
  }
})
//:::



const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isEmpty = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.success = { message: 'The categories has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete user
      .addCase(deleteCategory.pending, (state) => {
        state.delete.isLoading = true
        state.delete.isSuccess = false
        state.delete.isError = false
        state.delete.error = null
        state.delete.success = null
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = true
        state.delete.isError = false
        state.delete.success = payload
        state.delete.error = null
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = false
        state.delete.isError = true
        state.delete.success = null
        state.delete.error = payload
        console.log(payload)
      })
  }
})

export default categoriesSlice.reducer
export const categoriesSelector = (state) => state.categories
export const deleteCategorySelector = (state) => state.categories.delete