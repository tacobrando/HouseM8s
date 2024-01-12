export const HOST = import.meta.env.MODE === 'production' ? import.meta.env.VITE_SERVER_URL : import.meta.env.VITE_DEV_SERVER_URL
export const PORT = import.meta.env.VITE_SERVER_PORT