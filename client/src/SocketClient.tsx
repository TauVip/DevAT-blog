import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_REPLY_COMMENT,
  REPLY_COMMENT,
  UPDATE_COMMENT,
  UPDATE_REPLY_COMMENT
} from './redux/types/commentType'
import { IComment, RootStore } from './utils/TypeScript'

const SocketClient = () => {
  const { socket } = useSelector((state: RootStore) => state)

  const dispatch = useDispatch()

  // Create Comment
  useEffect(() => {
    if (!socket) return

    socket.on('createComment', (data: IComment) =>
      dispatch({ type: CREATE_COMMENT, payload: data })
    )

    return () => socket.off('createComment')
  }, [dispatch, socket])

  // Reply Comment
  useEffect(() => {
    if (!socket) return

    socket.on('replyComment', (data: IComment) =>
      dispatch({ type: REPLY_COMMENT, payload: data })
    )

    return () => socket.off('replyComment')
  }, [dispatch, socket])

  // Update Comment
  useEffect(() => {
    if (!socket) return

    socket.on('updateComment', (data: IComment) =>
      dispatch({
        type: data.comment_root ? UPDATE_REPLY_COMMENT : UPDATE_COMMENT,
        payload: data
      })
    )

    return () => socket.off('updateComment')
  }, [dispatch, socket])

  // Delete comment
  useEffect(() => {
    if (!socket) return

    socket.on('deleteComment', (data: IComment) =>
      dispatch({
        type: data.comment_root ? DELETE_REPLY_COMMENT : DELETE_COMMENT,
        payload: data
      })
    )

    return () => socket.off('deleteComment')
  }, [dispatch, socket])

  return null
}
export default SocketClient
