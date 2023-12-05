export const Cookie = Object.freeze({
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 604800000
  }
})