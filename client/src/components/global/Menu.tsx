import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Dispatch } from 'redux'
import { logout } from '../../redux/actions/authAction'
import { RootStore } from '../../utils/TypeScript'

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state)
  console.log(auth.access_token)

  const { pathname } = useLocation()
  const dispatch: Dispatch<any> = useDispatch()

  const bfLoginLinks = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' }
  ]
  const afLoginLinks = [
    { label: 'Home', path: '/' },
    { label: 'CreateBlog', path: '/create_blog' }
  ]
  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

  const isActive = (pn: string) => (pn === pathname ? 'active' : '')

  const handleLogout = () => {
    if (!auth.access_token) return

    dispatch(logout(auth.access_token))
  }

  return (
    <ul className='navbar-nav ms-auto'>
      {navLinks.map((link, index) => (
        <li key={index} className={`nav-item ${isActive(link.path)}`}>
          <Link className='nav-link' to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}

      {auth.user?.role === 'admin' && (
        <li className={`nav-item ${isActive('/category')}`}>
          <Link to='category' className='nav-link'>
            Category
          </Link>
        </li>
      )}

      {auth.user && (
        <li className='nav-item dropdown'>
          <span
            className='nav-link dropdown-toggle'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <img src={auth.user.avatar} alt='avatar' className='avatar' />
          </span>
          <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
            <li>
              <Link className='dropdown-item' to={`/profile/${auth.user._id}`}>
                Profile
              </Link>
            </li>
            <li>
              <hr className='dropdown-divider' />
            </li>
            <li>
              <Link className='dropdown-item' to='/' onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  )
}
export default Menu
