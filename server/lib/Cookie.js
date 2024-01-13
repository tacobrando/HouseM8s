export const Cookie = Object.freeze({
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
    maxAge: 604800000,
  }
})