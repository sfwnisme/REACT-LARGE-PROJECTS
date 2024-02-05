import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AXIOS } from "../../../Api/AXIOS.JSX"
import { USER, USERS } from "../../../Api/API"

//:::state
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
  },
  update: {
    isLoadingUpdate: false,
    errorUpdate: null,
    isErrorUpdate: false,
  },
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
    return res.data
  } catch (error) {
    console.log('error', error)
    return rejectWithValue(error)
  }
})
//::: 

//::: delete users 
export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  console.log(id)
  try {
    const res = await AXIOS.delete(`${USER}/${id}`)
    console.log(':::delete user from rtk done:::', res)
    return null
  } catch (error) {
    // if you did not return the error value .unwrap() will not wrok
    return rejectWithValue(error)
  }
})
//::: 

//::: 
export const updateUser = createAsyncThunk('users/updateUser', async (initialData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.post(`${USER}/edit/${initialData.id}`, initialData)
    console.log(':::update user from rtk done:::', res)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
//::: 

//::: 
export const getSingleUser = createAsyncThunk('users/getSingleUser', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await AXIOS.post(`/${USER}`)
    console.log(':::update user from rtk done:::', res)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
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
        state.isEmpty = false
        state.isError = false
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isEmpty = payload?.length === 0 ? true : false
        state.isError = false
        state.error = null
        state.data = payload
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.error = payload
      })
      //::: delete user
      .addCase(deleteUser.pending, (state) => {
        console.log(state)
        state.delete.isLoadingDelete = true
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteUser.fulfilled, (state) => {
        console.log('deleted user', 'background: yellow; font-size: 100px')
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = false
        state.delete.errorDelete = null
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.delete.isLoadingDelete = false
        state.delete.isErrorDelete = true
        state.delete.errorDelete = payload
        console.log(payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.update.isLoadingUpdate = true
        state.update.isErrorUpdate = false
        state.update.errorUpdate = null
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.update.isLoadingUpdate = false
        state.update.isErrorUpdate = false
        state.update.errorUpdate = null
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.update.isLoadingUpdate = false
        state.update.isErrorUpdate = true
        state.update.errorUpdate = payload
      })
  }
})

export default usersSlice.reducer
export const usersSelector = (state) => state.users
export const deleteUserSelector = (state) => state.users.delete
export const updateUserSelector = (state) => state.users.update