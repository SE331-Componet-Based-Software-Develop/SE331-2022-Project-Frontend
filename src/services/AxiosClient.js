import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://54.91.217.177:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default apiClient
