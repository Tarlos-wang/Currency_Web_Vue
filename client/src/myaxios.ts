import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000
})

service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default service
