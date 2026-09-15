const COOKIE_NAME = 'ackee_ignore'

export const isSet = (cookie = '') => cookie.includes(`${COOKIE_NAME}=1`)

export const on = {
  name: COOKIE_NAME,
  value: '1',
  options: {
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'none',
    secure: true,
  },
}

export const off = {
  name: COOKIE_NAME,
  value: '0',
  options: {
    maxAge: -1,
    sameSite: 'none',
    secure: true,
  },
}
