import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import adminService from "./adminService"

const initialState = {
  adminLoading: false,
  adminSucces: false,
  adminError: false,
  adminErrorMessage: "",
  allUsers: [],
  allJobs:[],
  allApplications:[]
}



const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.adminLoading = true
        state.adminSucces = false
        state.adminError = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSucces = true
        state.allUsers = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false
        state.adminSucces = false
        state.adminError = true
        state.adminErrorMessage = action.payload
      })
      
            .addCase(userUpdate.pending, (state) => {
        state.adminLoading = true
        state.adminSucces = false
        state.adminError = false
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSucces = true
        state.allUsers = state?.allUsers?.map(user=>user._id===action.payload._id?action.payload:user)
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.adminLoading = false
        state.adminSucces = false
        state.adminError = true
        state.adminErrorMessage = action.payload
      })
         .addCase(getAllJobs.pending, (state) => {
        state.adminLoading = true
        state.adminSucces = false
        state.adminError = false
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSucces = true
        state.allJobs = action.payload
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.adminLoading = false
        state.adminSucces = false
        state.adminError = true
        state.adminErrorMessage = action.payload
      })
            .addCase(getAllApplications.pending, (state) => {
        state.adminLoading = true
        state.adminSucces = false
        state.adminError = false
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.adminLoading = false
        state.adminSucces = true
        state.allApplications = action.payload
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.adminLoading = false
        state.adminSucces = false
        state.adminError = true
        state.adminErrorMessage = action.payload
      })

    }
})


export default adminSlice.reducer


export const getAllUsers = createAsyncThunk(
  "FETCH/ADMIN/USERS",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.fetchAllUsers(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong"
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userUpdate = createAsyncThunk(
  "UPDATE/ADMIN/USERS",
  async (userDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.updateUser(userDetails,token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong"
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllJobs = createAsyncThunk(
  "FETCH/ADMIN/JOBS",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.fetchAllJobs(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong"
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllApplications = createAsyncThunk(
  "FETCH/ADMIN/APPLICATION",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log(token)
      return await adminService.fetchAllApplications(token)
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong"
      return thunkAPI.rejectWithValue(message)
    }
  }
)