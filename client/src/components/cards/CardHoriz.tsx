import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { deleteBlog, getBlogsByUserId } from '../../redux/actions/blogAction'
import { ALERT } from '../../redux/types/alertType'
import { IBlog, RootStore } from '../../utils/TypeScript'

interface IProps {
  blog: IBlog
}

const CardHoriz: React.FC<IProps> = ({ blog }) => {
  const { auth } = useSelector((state: RootStore) => state)

  const dispatch: Dispatch<any> = useDispatch()
  const { slug } = useParams()
  const { search } = useLocation()

  const handleDelete = async () => {
    if (!auth.user || !auth.access_token) return

    if (slug !== auth.user._id)
      return dispatch({
        type: ALERT,
        payload: { errors: 'Invalid Authentication.' }
      })

    if (window.confirm('Do you want to delete this post?')) {
      await dispatch(deleteBlog(blog, auth.access_token))
      dispatch(getBlogsByUserId(slug, search))
    }
  }

  return (
    <div className='card mb-3' style={{ minWidth: 280 }}>
      <div className='row g-0 p-2'>
        <div
          className='col-md-4'
          style={{
            minHeight: 150,
            maxHeight: 170,
            overflow: 'hidden'
          }}
        >
          {blog.thumbnail && (
            <>
              {typeof blog.thumbnail === 'string' ? (
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.thumbnail}
                    className='w-100 h-100'
                    alt='thumbnail'
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              ) : (
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  className='w-100 h-100'
                  alt='thumbnail'
                  style={{ objectFit: 'cover' }}
                />
              )}
            </>
          )}
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>
              <Link
                to={`/blog/${blog._id}`}
                className='text-capitalize text-decoration-none'
              >
                {blog.title}
              </Link>
            </h5>
            <p className='card-text'>{blog.description}</p>
            {blog.title && (
              <div className='card-text d-flex justify-content-between align-items-center'>
                {slug === auth.user?._id && (
                  <div style={{ cursor: 'pointer' }}>
                    <Link to={`/update_blog/${blog._id}`}>
                      <i className='fas fa-edit' title='edit' />
                    </Link>

                    <i
                      className='fas fa-trash text-danger mx-3'
                      title='delete'
                      onClick={handleDelete}
                    />
                  </div>
                )}
                <small className='text-muted'>
                  {new Date(blog.createdAt).toLocaleString()}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardHoriz
