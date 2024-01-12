import axios from 'axios'
import { HOST, PORT } from '@/utils/Constants'

const api = axios.create({
  baseURL: 'https://housem8s-api-f6545d898b85.herokuapp.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api
