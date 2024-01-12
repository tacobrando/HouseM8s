import axios from 'axios'
import { API_URL } from '@/utils/Constants'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
