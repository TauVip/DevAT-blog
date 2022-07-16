import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/global/Footer'
import Header from './components/global/Header'
import PageRender from './PageRender'

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
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
