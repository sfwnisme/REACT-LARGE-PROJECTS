import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AXIOS } from '../../Api/AXIOS.JSX'
import { LOGOUT } from '../../Api/API'

//::: logout state
const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  success: null
}
//:::

//::: logout actoin
export const logoutAction = createAsyncThunk('logout/logoutAction', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${LOGOUT}`)
    console.log(':::logout from rtk done:::', res)
    return null
  } catch (error) {
    return rejectWithValue(error)
  }
})


const logoutSlice = createSlice({
  name: 'logou',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
        state.isSuccess = false
        state.success = null
      })
      .addCase(logoutAction.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.error = null
        state.isSuccess = true
        state.success = payload // null
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
        state.isSuccess = false
        state.success = null
        console.log('payload', payload)
      })
  }
})

export default logoutSlice.reducer
export const logoutSelector = (state) => state.logout