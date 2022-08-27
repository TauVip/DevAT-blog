import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import CardHoriz from '../components/cards/CardHoriz'
import CreateForm from '../components/cards/CreateForm'
import Quill from '../components/editor/ReactQuill'
import NotFound from '../components/global/NotFound'
import { createBlog, updateBlog } from '../redux/actions/blogAction'
import { ALERT } from '../redux/types/alertType'
import { getAPI } from '../utils/FetchData'
import { IBlog, IUser, RootStore } from '../utils/TypeScript'
import { shallowEqual, validCreateBlog } from '../utils/Valid'

interface IProps {
  id?: string
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
  const { auth } = useSelector((state: RootStore) => state)

  const dispatch: Dispatch<any> = useDispatch()
  const divRef = useRef<HTMLDivElement>(null)

  const initState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString()
  }

  const [blog, setBlog] = useState<IBlog>(initState)
  const [body, setBody] = useState('')
  const [text, setText] = useState('')
  const [oldData, setOldData] = useState<IBlog>(initState)

  const handleSubmit = async () => {
    if (!auth.access_token) return

    const check = validCreateBlog({ ...blog, content: text })
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    let newData = { ...blog, content: body }

    if (id) {
      if ((blog.user as IUser)._id !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: 'Invalid Authentication.' }
        })

      const result = shallowEqual(oldData, newData)
      if (result)
        return dispatch({
          type: ALERT,
          payload: { errors: 'The data does not change.' }
        })

      dispatch(updateBlog(newData, auth.access_token))
    } else dispatch(createBlog(newData, auth.access_token))
  }

  useEffect(() => {
    if (!id) return

    getAPI(`blog/${id}`)
      .then(res => {
        setBlog(res.data)
        setBody(res.data.content)
        setOldData(res.data)
      })
      .catch(err => console.log(err))

    const initData = {
      user: '',
      title: '',
      content: '',
      description: '',
      thumbnail: '',
      category: '',
      createdAt: new Date().toISOString()
    }

    return () => {
      setBlog(initData)
      setBody('')
      setOldData(initData)
    }
  }, [id])

  useEffect(() => {
    const div = divRef.current
    if (!div) return

    const text = div?.innerText as string
    setText(text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body])

  if (!auth.access_token) return <NotFound />
  return (
    <div className='my-4 create_blog'>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <h5>Create</h5>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>

        <div className='col-md-6'>
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>

      <Quill setBody={setBody} body={body} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: body }}
        style={{ display: 'none' }}
      />
      <small>{text.length}</small>

      <button
        className='btn btn-dark mt-3 d-block mx-auto'
        onClick={handleSubmit}
      >
        {id ? 'Update Post' : 'Create Post'}
      </button>
    </div>
  )
}
export default CreateBlog
