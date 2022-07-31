import { IUserRegister } from './TypeScript'

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password, cf_password } = userRegister
  const errors: string[] = []

  if (!name) errors.push('Please add your name.')
  else if (name.length > 20) errors.push('Your name is up to 20 chars long.')

  if (!account) errors.push('Please add your email or phone number.')
  else if (!validPhone(account) && !validateEmail(account))
    errors.push('Email or phone number format is incorrect.')

  const msg = checkPassword(password, cf_password)
  if (msg) errors.push(msg)

  return {
    errMsg: errors,
    errLength: errors.length
  }
}

export const checkPassword = (password: string, cf_password: string) =>
  password.length < 6
    ? 'Password must be at least 6 chars.'
    : password !== cf_password && 'Confirm password did not match.'

export const validPhone = (phone: string) => /^[+]/g.test(phone)

export const validateEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
