import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import CardHoriz from '../components/cards/CardHoriz'
import CreateForm from '../components/cards/CreateForm'
import Quill from '../components/editor/ReactQuill'
import NotFound from '../components/global/NotFound'
import { createBlog } from '../redux/actions/blogAction'
import { ALERT } from '../redux/types/alertType'
import { IBlog, RootStore } from '../utils/TypeScript'
import { validCreateBlog } from '../utils/Valid'

const CreateBlog = () => {
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

  const handleSubmit = async () => {
    if (!auth.access_token) return

    const check = validCreateBlog({ ...blog, content: text })
    if (check.errLength !== 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    let newData = { ...blog, content: body }
    dispatch(createBlog(newData, auth.access_token))
  }

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

      <Quill setBody={setBody} />

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
        Create Post
      </button>
    </div>
  )
}
export default CreateBlog
