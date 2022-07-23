import { Dispatch } from 'redux'
import { getAPI, postAPI } from '../../utils/FetchData'
import { IUserLogin, IUserRegister } from '../../utils/TypeScript'
import { validPhone, validRegister } from '../../utils/Valid'
import { ALERT, IAlertType } from '../types/alertType'
import { AUTH, IAuthType } from '../types/authType'

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('login', userLogin)

      dispatch({
        type: AUTH,
        payload: res.data
      })

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
      localStorage.setItem('logged', 'devat-channel')
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const register =
  (userRegister: IUserRegister) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)
    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('register', userRegister)

      dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const refreshToken =
  () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if (logged !== 'devat-channel') return

    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await getAPI('refresh_token')
      dispatch({ type: AUTH, payload: res.data })

      dispatch({ type: ALERT, payload: {} })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const logout = () => async (dispatch: any) => {
  try {
    localStorage.removeItem('logged')
    await getAPI('logout')
    window.location.href = '/'
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const googleLogin = (id_token: string) => async (dispatch: any) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('google_login', { id_token })
    dispatch({ type: AUTH, payload: res.data })
    dispatch({ type: ALERT, payload: { success: res.data.msg } })

    localStorage.setItem('logged', 'devat-channel')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const facebookLogin =
  (accessToken: string, userID: string) => async (dispatch: any) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } })

      const res = await postAPI('facebook_login', { accessToken, userID })
      dispatch({ type: AUTH, payload: res.data })
      dispatch({ type: ALERT, payload: { success: res.data.msg } })

      localStorage.setItem('logged', 'devat-channel')
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const loginSMS = (phone: string) => async (dispatch: any) => {
  const check = validPhone(phone)
  if (!check)
    return dispatch({
      type: ALERT,
      payload: { errors: 'Phone number format is incorrect.' }
    })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('login_sms', { phone })
    if (!res.data.valid) verifySMS(phone, dispatch)
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const verifySMS = async (
  phone: string,
  dispatch: Dispatch<IAuthType | IAlertType>
) => {
  const code = prompt('Enter your code')
  if (!code) return

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('sms_verify', { phone, code })
    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })

    localStorage.setItem('logged', 'devat-channel')
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })

    setTimeout(() => verifySMS(phone, dispatch), 100)
  }
}