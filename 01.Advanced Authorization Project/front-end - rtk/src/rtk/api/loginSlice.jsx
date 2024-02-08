import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, LOGIN } from '../../Api/API'
import Cookie from 'cookie-universal'

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  success: null,
}
const cookie = Cookie()
//::: login action
export const loginAction = createAsyncThunk('login/loginAction', async (initialData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await axios.post(`${BASE_URL}/${LOGIN}`, initialData)
    console.log(':::login from rtk:::', res)
    cookie.set('e-commerce', res?.data?.token)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
        state.isSuccess = false
        state.success = null
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.error = null
        state.isSuccess = true
        state.success = state.isSuccess ? 'you have loged successfully' : null
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        let serverError = payload?.response?.status.toString().split('')[0]
        console.log(serverError)
        state.isLoading = false
        state.isError = true
        state.error = state.isError
          ? serverError === '5'
            ? 'server error'
            : payload?.response?.data?.error || payload?.response?.data?.message
          : null
        state.isSuccess = false
        state.success = null
        console.log('===================', payload)
      })
  }
})


export default loginSlice.reducer
export const loginUserSelector = (state) => state.login