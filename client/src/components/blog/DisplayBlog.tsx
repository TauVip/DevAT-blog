import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Dispatch } from 'redux'
import { createComment, getComments } from '../../redux/actions/commentAction'
import { IBlog, IComment, IUser, RootStore } from '../../utils/TypeScript'
import Comments from '../comments/Comments'
import Input from '../comments/Input'
import Loading from '../global/Loading'
import Pagination from '../global/Pagination'

interface IProps {
  blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments } = useSelector((state: RootStore) => state)

  const dispatch: Dispatch<any> = useDispatch()
  const location = useLocation()

  const [showComments, setShowComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(false)

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      createdAt: new Date().toISOString()
    }

    setShowComments([data, ...showComments])

    dispatch(createComment(data, auth.access_token))
  }

  useEffect(() => {
    setShowComments(comments.data)
  }, [comments.data])

  const fetchComments = useCallback(
    async (id: string, num = 1) => {
      setLoading(true)
      await dispatch(getComments(id, num))
      setLoading(false)
    },
    [dispatch]
  )
  useEffect(() => {
    if (!blog._id) return

    const num = +location.search.slice(6) || 1
    fetchComments(blog._id, num)
  }, [blog._id, fetchComments, location.search])

  const handlePagination = (num: number) => {
    if (!blog._id) return

    fetchComments(blog._id, num)
  }

  return (
    <div>
      <h2
        className='text-center my-3 text-capitalize fs-1'
        style={{ color: '#ff7a00' }}
      >
        {blog.title}
      </h2>

      <div className='text-end fst-italic' style={{ color: 'teal' }}>
        <small>
          {typeof blog.user !== 'string' && `By: ${blog.user.name}`}
        </small>

        <small className='ms-2'>
          {new Date(blog.createdAt).toLocaleString()}
        </small>
      </div>

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      <hr className='my-1' />
      <h3 style={{ color: '#ff7a00' }}>Comments</h3>

      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>Login</Link> to comment.
        </h5>
      )}

      {loading ? (
        <Loading />
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      )}

      {comments.total > 1 && (
        <Pagination total={comments.total} callback={handlePagination} />
      )}
    </div>
  )
}
export default DisplayBlog
