import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AXIOS } from "../../../Api/AXIOS.JSX"
import { USER, USERS } from "../../../Api/API"
import usePathname from "../../../Hooks/use-pathname"

//:::state
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
  },
  update: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    success: null,
    error: null,
  },
  currentData: {
    data: null,
    isLoading: false,
    isSuccess: false,
    isEmpty: false,
    isError: false,
    success: null,
    error: null,
  },
  singleData: {
    data: null,
    isLoading: false,
    isSuccess: false,
    isEmpty: false,
    isError: false,
    success: null,
    error: null,
  }
}
//:::

//::: get users 
export const getUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${USERS}`)
    console.log(':::get users rtk done:::', res)
    //to avoid facing non-serializable value error you
    //need to return the data from the response not the 
    //entire response, Because redux not accept non-serializable value
    //Conclusion: you should return a plain js object or array of data not the entire response
    //!DON'T DO ==> return res.data
    //?DO ==> return res.data
    return fulfillWithValue(res.data)
    // return res.data
  } catch (error) {
    const customError = error?.response?.data
    console.log('error', customError)
    return rejectWithValue(customError)
  }
})
//::: 

//::: delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  console.log(id)
  try {
    const res = await AXIOS.delete(`${USER}/${id}`)
    console.log(':::delete user from rtk done:::', res)
    return { id: id, message: 'The user has been successfully deleted' }
  } catch (error) {
    console.log('+++++++', error)
    let customError = { message: error.response.data.message, status: error.response.status }
    // if you did not return the error value .unwrap() will not wrok
    return rejectWithValue(customError)
  }
})
//::: 

//::: update user
export const updateUser = createAsyncThunk('users/updateUser', async (initialData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const { id } = usePathname()
  try {
    const res = await AXIOS.post(`${USER}/edit/${id}`, initialData)
    console.log(':::update user from rtk done:::', res)
    const customRes = { id: initialData, message: 'The user has been successfully updated', }
    return customRes
  } catch (error) {
    const customError = { message: error?.response?.data?.message, status: error?.response?.data?.message }
    return rejectWithValue(customError)
  }
})
//::: 

//::: get current user
export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.get(`/${USER}`)
    console.log(':::get ucrrent user from rtk done:::', res)
    return res.data
  } catch (error) {
    const customError = error?.response?.data
    return rejectWithValue(customError)
  }
})
//:::

//::: get single user 
export const getSigleUser = createAsyncThunk('users/getSingleuser', async (initialData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  // const id = initialData
  const { id } = usePathname()
  console.log(id)
  try {
    const res = await AXIOS.get(`/${USER}/${id}`)
    console.log(':::get single user from rtk done:::', res)
    return res.data
  } catch (error) {
    const customError = error?.response?.data
    rejectWithValue(customError)
  }

})
//:::

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //::: get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isEmpty = false
        state.isError = false
        state.success = null
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.success = { message: 'The users has been successfully called' }
        state.error = null
        state.data = payload
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = true
        state.success = null
        state.error = payload
      })
      //::: delete user
      .addCase(deleteUser.pending, (state) => {
        state.delete.isLoading = true
        state.delete.isSuccess = false
        state.delete.isError = false
        state.delete.error = null
        state.delete.success = null
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = true
        state.delete.isError = false
        state.delete.success = payload
        state.delete.error = null
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.delete.isLoading = false
        state.delete.isSuccess = false
        state.delete.isError = true
        state.delete.success = null
        state.delete.error = payload
        console.log(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.update.isLoading = false
        state.update.isSuccess = false
        state.update.isError = true
        state.update.success = null
        state.update.error = null
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.update.isLoading = false
        state.update.isSuccess = true
        state.update.isError = false
        state.update.success = payload
        state.update.error = null
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.update.isLoading = false
        state.update.isSuccess = false
        state.update.isError = true
        state.update.success = null
        state.update.error = payload
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.currentData.data = null
        state.currentData.isLoading = true
        state.currentData.isSuccess = false
        state.currentData.isEmpty = false
        state.currentData.isError = false
        state.currentData.success = null
        state.currentData.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.currentData.data = payload
        state.currentData.isLoading = false
        state.currentData.isSuccess = true
        state.currentData.isEmpty = !payload ? true : false
        state.currentData.isError = false
        state.currentData.success = { message: 'The current user has been successfully called' }
        state.currentData.error = null
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.currentData.data = null
        state.currentData.isLoading = false
        state.currentData.isSuccess = false
        state.currentData.isEmpty = false
        state.currentData.isError = true
        state.currentData.success = null
        state.currentData.error = payload
        console.log(payload)
      })
      .addCase(getSigleUser.pending, (state) => {
        state.singleData.data = null
        state.singleData.isLoading = true
        state.singleData.isSuccess = false
        state.singleData.isEmpty = false
        state.singleData.isError = false
        state.singleData.success = null
        state.singleData.error = null
      })
      .addCase(getSigleUser.fulfilled, (state, { payload }) => {
        state.singleData.data = payload
        state.singleData.isLoading = false
        state.singleData.isSuccess = true
        state.singleData.isEmpty = !payload ? true : false
        state.singleData.isError = false
        state.singleData.success = payload
        state.singleData.error = null
      })
      .addCase(getSigleUser.rejected, (state, { payload }) => {
        state.singleData.data = null
        state.singleData.isLoading = false
        state.singleData.isSuccess = false
        state.singleData.isEmpty = false
        state.singleData.isError = true
        state.singleData.success = null
        state.singleData.error = payload
        console.log(payload)
      })
  }
})

export default usersSlice.reducer
export const usersSelector = (state) => state.users
export const deleteUserSelector = (state) => state.users.delete
export const updateUserSelector = (state) => state.users.update
export const currentUserSelector = (state) => state.users.currentData
export const signleUserSelector = (state) => state.users.singleData