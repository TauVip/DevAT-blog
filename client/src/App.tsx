import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dispatch } from 'redux'
import { Alert } from './components/alert/Alert'
import Footer from './components/global/Footer'
import Header from './components/global/Header'
import PageRender from './PageRender'
import { refreshToken } from './redux/actions/authAction'
import { getHomeBlogs } from './redux/actions/blogAction'
import { getCategories } from './redux/actions/categoryAction'

function App() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
    dispatch(getCategories())
    dispatch(getHomeBlogs())
  }, [dispatch])

  return (
    <div className='container'>
      <BrowserRouter>
        <Alert />
        <Header />
        <Routes>
          <Route path='/' element={<PageRender />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:slug' element={<PageRender />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App
