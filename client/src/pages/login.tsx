import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LoginPass from '../components/auth/LoginPass'
import LoginSms from '../components/auth/LoginSms'
import SocialLogin from '../components/auth/SocialLogin'
import { RootStore } from '../utils/TypeScript'

const Login = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const navigate = useNavigate()

  const [sms, setSms] = useState(false)

  useEffect(() => {
    if (auth.access_token) navigate('/')
  }, [auth.access_token, navigate])

  return (
    <div className='auth_page'>
      <div className='auth_box'>
        <h3 className='text-uppercase text-center mb-4'>Login</h3>

        <SocialLogin />

        {sms ? <LoginSms /> : <LoginPass />}

        <small className='row my-2 text-primary' style={{ cursor: 'pointer' }}>
          <span className='col-6'>
            <Link to='/forgot_password'>Forgot password?</Link>
          </span>

          <span className='col-6 text-end' onClick={() => setSms(!sms)}>
            {sms ? 'Sign in with password' : 'Sign in with SMS'}
          </span>
        </small>

        <p>
          You don't have an account?{' '}
          <Link to='/register' style={{ color: 'crimson' }}>
            Register Now
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Login
