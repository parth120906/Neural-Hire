import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import admin from "./admin/adminSlice";
import recruiter from "./recruiter/recruiterSlice";
import jobs from "./jobs/jobSlice";
import application from "./application/applicationSlice";

const store = configureStore({
  reducer: {
    auth,
    admin,
    recruiter,
    jobs,
    application,
  },
});

export default store;
