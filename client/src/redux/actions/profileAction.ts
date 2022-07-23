import { IAuth } from '../types/authType'

export const updateUser =
  (avatar: File, name: string, auth: IAuth) => async (dispatch: any) => {
    console.log({ avatar, name, auth })
  }
