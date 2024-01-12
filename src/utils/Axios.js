import axios from 'axios'
import { HOST, PORT } from '@/utils/Constants'

const api = axios.create({
  baseURL: `${HOST}:${PORT}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
