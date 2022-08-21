import { Dispatch } from 'redux'
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/FetchData'
import { IComment } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_REPLY_COMMENT,
  GET_COMMENTS,
  ICreateCommentType,
  IDeleteCommentType,
  IGetCommentsType,
  IReplyCommentType,
  IUpdateCommentType,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY_COMMENT
} from '../types/commentType'

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI('comment', data, token)

      // dispatch({
      //   type: CREATE_COMMENT,
      //   payload: { ...res.data, user: data.user }
      // })
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
    try {
      const res = await postAPI('reply_comment', data, token)
      dispatch({
        type: REPLY_COMMENT,
        payload: {
          ...res.data,
          user: data.user,
          reply_user: data.reply_user
        }
      })
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const updateComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
    try {
      dispatch({
        type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
        payload: data
      })

      await patchAPI(`comment/${data._id}`, { content: data.content }, token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }

export const deleteComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
    try {
      dispatch({
        type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
        payload: data
      })

      await deleteAPI(`comment/${data._id}`, token)
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
  }
