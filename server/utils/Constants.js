export const ORIGIN = process.env.NODE_ENV === 'production' ? process.env.ORIGIN_HOST : process.env.DEV_ORIGIN_HOST 
export const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT
export const URL = process.env.NODE_ENV === 'production' ? process.env.ORIGIN_HOST : `${process.env.DEV_HOST}:${PORT}`
