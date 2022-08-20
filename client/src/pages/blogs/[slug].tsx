import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import CardVert from '../../components/cards/CardVert'
import Loading from '../../components/global/Loading'
import Pagination from '../../components/global/Pagination'
import { getBlogsByCategoryId } from '../../redux/actions/blogAction'
import { IBlog, RootStore } from '../../utils/TypeScript'

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useSelector((state: RootStore) => state)

  const dispatch: Dispatch<any> = useDispatch()
  const { slug } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()

  const [categoryId, setCategoryId] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const category = categories.find(item => item.name === slug)
    if (category) setCategoryId(category._id)
  }, [categories, slug])

  useEffect(() => {
    if (!categoryId) return

    if (blogsCategory.every(item => item.id !== categoryId))
      dispatch(getBlogsByCategoryId(categoryId, search))
    else {
      const data = blogsCategory.find(item => item.id === categoryId)
      if (!data) return

      setBlogs(data.blogs)
      setTotal(data.total)

      if (data.search) navigate(data.search)
    }
  }, [blogsCategory, categoryId, dispatch, navigate, search])

  const handlePagination = (num: number) => {
    const search = `?page=${num}`
    dispatch(getBlogsByCategoryId(categoryId, search))
  }

  if (!blogs) return <Loading />
  return (
    <div className='blogs_category'>
      <div className='show_blogs'>
        {blogs.map(blog => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>

      {total > 1 && <Pagination total={total} callback={handlePagination} />}
    </div>
  )
}
export default BlogsByCategory
