import axios from 'axios'


const API_URL = 'http://localhost:5000/api/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token))
    localStorage.setItem('userId', JSON.stringify(response.data._id))
    localStorage.setItem('role', JSON.stringify(response.data.role))

  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token))
    localStorage.setItem('userId', JSON.stringify(response.data._id))
    localStorage.setItem('role', JSON.stringify(response.data.role))

  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('userId')
  localStorage.removeItem('role')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
