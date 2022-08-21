import { useEffect, useRef, useState } from 'react'
import { IComment } from '../../utils/TypeScript'
import LiteQuill from '../editor/LiteQuill'

interface IProps {
  callback: (body: string) => void
  edit?: IComment
  setEdit?: (edit?: IComment) => void
}

const Input: React.FC<IProps> = ({ callback, edit, setEdit }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const [body, setBody] = useState('')

  useEffect(() => {
    if (edit) setBody(edit.content)
  }, [edit])

  const handleSubmit = () => {
    const div = divRef.current
    const text = div?.innerText as string
    if (!text.trim()) {
      if (setEdit) return setEdit(undefined)
      return
    }

    callback(body)

    setBody('')
  }

  return (
    <div>
      <LiteQuill body={body} setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{ __html: body }}
        style={{ display: 'none' }}
      />

      <button
        className='btn btn-dark ms-auto d-block px-4 mt-2'
        onClick={handleSubmit}
      >
        {edit ? 'Update' : 'Send'}
      </button>
    </div>
  )
}
export default Input
