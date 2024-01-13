export const Cookie = Object.freeze({
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    domain: 'housem8s-2082efe081e6.herokuapp.com',
    maxAge: 604800000,
  }
})