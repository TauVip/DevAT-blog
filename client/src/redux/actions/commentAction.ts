import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/FetchData'
import { IComment } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'
import {
  GET_COMMENTS,
  ICreateCommentType,
  IDeleteCommentType,
  IGetCommentsType,
  IReplyCommentType,
  IUpdateCommentType
} from '../types/commentType'

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      await postAPI('comment', data, access_token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const getComments =
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 4
      const res = await getAPI(`comments/blog/${id}?page=${num}&limit=${limit}`)
      dispatch({
        type: GET_COMMENTS,
        payload: {
          data: res.data.comments,
          total: res.data.total
        }
      })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      await postAPI('reply_comment', data, access_token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      await patchAPI(`comment/${data._id}`, { data }, access_token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
    const result = await checkTokenExp(token, dispatch)
    const access_token = result ? result : token

    try {
      await deleteAPI(`comment/${data._id}`, access_token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
