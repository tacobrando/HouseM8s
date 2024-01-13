export const Cookie = Object.freeze({
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 604800000,
  }
})