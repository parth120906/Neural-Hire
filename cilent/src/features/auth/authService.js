import axios from "axios"

const register = async (formData) => {
    console.log(formData)
    const response = await axios.post("/api/auth/register", formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    console.log(response.data)
    return response.data
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