export const Cookie = Object.freeze({
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 604800000,
  }
})