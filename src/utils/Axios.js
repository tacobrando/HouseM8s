import axios from 'axios'
import { HOST, PORT } from '@/utils/Constants'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
