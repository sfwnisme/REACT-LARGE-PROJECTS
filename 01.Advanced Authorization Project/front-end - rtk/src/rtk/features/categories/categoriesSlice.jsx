import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../../Api/AXIOS.JSX'
import { CAT, CATS } from '../../../Api/API'

//::: get categories
export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${CATS}`)
    console.log(':::get categories from rtk:::', res)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
//:::

//:::
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.delete(`/${CAT}/${id}`)
    console.log(':::get category from rtk done:::', res)
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

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
        state.isEmpty = false
        state.isError = false
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.error = null
        state.data = payload
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
      //::: delete product
      .addCase(deleteCategory.pending, (state) => {
        console.log(state)
        state.delete.isLoadingDelete = true
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        console.log('deleted user', 'background: yellow; font-size: 100px')
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = true
        state.delete.errorDelete = payload
        console.log(payload)
      })
  }
})

export default categoriesSlice.reducer
export const categoriesSelector = (state) => state.categories
export const deleteCategorySelector = (state) => state.categories.delete