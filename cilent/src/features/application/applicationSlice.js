import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

const initialState = {
  applications: [],
  applicationsLoading: false,
  applicationsError: "",

  applyLoading: false,
  applyError: "",
  applySuccess: "",
};

// ================= GET MY APPLICATIONS =================
export const fetchMyApplications = createAsyncThunk(
  "APPLICATION/FETCH_MY",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await applicationService.fetchMyApplications(token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load applications.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= APPLY TO JOB =================
export const applyToJob = createAsyncThunk(
  "APPLICATION/APPLY",
  async ({ jobId, resumeText, resumeFile }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await applicationService.applyToJob({
        jobId,
        resumeText,
        resumeFile,
        token,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= WITHDRAW APPLICATION =================
export const withdrawApplication = createAsyncThunk(
  "APPLICATION/WITHDRAW",
  async (applicationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await applicationService.withdrawApplication({ applicationId, token });
      return applicationId;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to withdraw application.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    resetApplicationStatus(state) {
      state.applyError = "";
      state.applySuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH MY APPLICATIONS
      .addCase(fetchMyApplications.pending, (state) => {
        state.applicationsLoading = true;
        state.applicationsError = "";
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;
        state.applications = action.payload.data || [];
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.applicationsLoading = false;
        state.applicationsError = action.payload;
      })

      // APPLY
      .addCase(applyToJob.pending, (state) => {
        state.applyLoading = true;
        state.applyError = "";
        state.applySuccess = "";
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.applyLoading = false;
        state.applySuccess = "Application submitted successfully.";
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.applyLoading = false;
        state.applyError = action.payload;
      })

      // WITHDRAW
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload
        );
      });
  },
});

export const { resetApplicationStatus } = applicationSlice.actions;

export default applicationSlice.reducer;

