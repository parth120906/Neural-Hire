import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL?.trim() || "";

const register = async (formData) => {
  const base = API_BASE || "";
  const endpoint =
    formData?.role === "recruiter"
      ? `${base}/api/auth/register/recruiter`
      : formData?.role === "candidate"
      ? `${base}/api/auth/register/candidate`
      : `${base}/api/auth/register`;

  const payload = { ...formData };
  // The server endpoint already knows the role; avoid sending extra fields
  delete payload.role;

  const response = await axios.post(endpoint, payload);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
}

const login = async (formData) => {
  const response = await axios.post("/api/auth/login", formData)
  console.log(response.data)

  localStorage.setItem("user", JSON.stringify(response.data))
  return response.data
}

const getMe = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get("/api/auth/me", options)
  return response.data
}

const updateMe = async ({ name, email, password, token }) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    "/api/auth/me",
    { name, email, password },
    options
  )

  return response.data
}


const authService = { register, login, getMe, updateMe }


export default authService