import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'cookie-universal'
import { BASE_URL, REGISTER } from '../../Api/API'
import axios from 'axios'

const cookie = Cookie()

//:::
const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  success: null,
}
//:::

//::: register function
export const registerAction = createAsyncThunk('register/registerAction', async (initialData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(`${BASE_URL}/${REGISTER}`, initialData)
    console.log(':::register user from rtk:::', res)
    cookie.set('e-commerce', res?.data?.token)
    return res?.data
  } catch (error) {
    console.log('from rtk error', error.response)
    return rejectWithValue(error)
  }
})
//:::

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
        state.isSuccess = false
        state.success = null
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.error = null
        state.isSuccess = true
        state.success = 'You have created user account successfully'
        console.log('success', payload)
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        let serverError = payload?.response?.status.toString().split('')[0]
        state.isLoading = false
        state.isError = true
        state.error = state.isError
          ? serverError === '5'
            ? 'server error'
            : payload?.response?.data?.message
          : null
        state.isSuccess = false
        state.success = null
        console.log('===================', payload)
      })
  }
})

export default registerSlice.reducer
export const registerUserSelector = (state) => state.register