export const HOST = process.env.NODE_ENV === 'production' ? process.env.HOST : process.env.DEV_HOST
export const LOCAL_HOST = process.env.DEV_HOST
export const ORIGIN = process.env.NODE_ENV === 'production' ? process.env.ORIGIN_HOST : process.env.DEV_ORIGIN_HOST 
export const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT
