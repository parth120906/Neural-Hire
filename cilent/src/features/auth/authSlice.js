import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';

// ✅ Safe localStorage access
let userExist = null;

if (typeof window !== "undefined") {
    userExist = JSON.parse(localStorage.getItem("user"));
}

// ======================
// Register User
// ======================
export const registerUser = createAsyncThunk(
    "AUTH/REGISTER",
    async (formData, thunkAPI) => {
        try {
            return await authService.register(formData)
        } catch (error) {
            const message =
                error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ======================
// Login User
// ======================
export const loginUser = createAsyncThunk(
    "AUTH/LOGIN",
    async (formData, thunkAPI) => {
        try {
            return await authService.login(formData)
        } catch (error) {
            const message =
                error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ======================
// Fetch My Profile
// ======================
export const fetchMyProfile = createAsyncThunk(
    "AUTH/ME",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.getMe(token)
        } catch (error) {
            const message =
                error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// ======================
// Update My Profile
// ======================
export const updateMyProfile = createAsyncThunk(
    "AUTH/ME_UPDATE",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateMe({ name, email, password, token })
        } catch (error) {
            const message =
                error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logoutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
    localStorage.removeItem("user")
})


// ======================
// Initial State
// ======================
const initialState = {
    user: userExist,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

// ======================
// Slice
// ======================
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchMyProfile.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.message = ""
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = { ...state.user, ...action.payload }
                localStorage.setItem("user", JSON.stringify(state.user))
            })
            .addCase(fetchMyProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateMyProfile.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ""
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = { ...state.user, ...action.payload }
                localStorage.setItem("user", JSON.stringify(state.user))
            })
            .addCase(updateMyProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
             .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = ""
                state.isSuccess = false
                state.user = null
            })
    }
});

export default authSlice.reducer
