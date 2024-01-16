export const PORT = import.meta.env.MODE === 'production' ? import.meta.env.VITE_SERVER_PORT : import.meta.env.VITE_DEV_SERVER_PORT
export const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_SERVER_URL : `${import.meta.env.VITE_DEV_SERVER_URL}:${PORT}`
