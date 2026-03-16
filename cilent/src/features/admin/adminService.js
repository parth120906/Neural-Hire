import axios from "axios"

const API_URL= "/api/admin"

const fetchAllUsers = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
 
  const response = await axios.get(`${API_URL}/users`, options)

  console.log(response.data)
  return response.data
}


const updateUser = async (userDetails, token) => {
  console.log(userDetails);

  let options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/users/${userDetails.user}`,
    userDetails,
    options
  );
}
const fetchAllJobs = async (token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("hy")

  const response = await axios.get(`${API_URL}/jobs`, options)
  console.log(response.data)
  return response.data
}


// const deleteJob = async (jobDetalis, token) => {
//   console.log(userDetails);

//   let options = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.put(
//     `${API_URL}/job/${jobDetalis._id}`,
//     jobDetalis,
//     options
//   );
// }

const fetchAllApplications = async(token) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(options)
 
  const response = await axios.get(`${API_URL}/application`, options)

  console.log(response.data)
  return response.data
}
const adminService ={fetchAllUsers,updateUser,fetchAllJobs,fetchAllApplications}

export default adminService
