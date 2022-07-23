import { gapi } from 'gapi-script'
import { useEffect } from 'react'
import FacebookLogin, {
  FacebookLoginAuthResponse
} from 'react-facebook-login-lite'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login-lite'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { facebookLogin, googleLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        clientId:
          '1038989169699-q6p8rjomr83vp5bq9cn163h6b1ep4gau.apps.googleusercontent.com'
      })
    })
  }, [])

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token
    dispatch(googleLogin(id_token))
  }

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse
    dispatch(facebookLogin(accessToken, userID))
  }

  return (
    <>
      <div className='my-2'>
        <GoogleLogin
          client_id='1038989169699-q6p8rjomr83vp5bq9cn163h6b1ep4gau.apps.googleusercontent.com'
          cookiepolicy='single_host_origin'
          onSuccess={onSuccess}
        />
      </div>
      <div className='my-2'>
        <FacebookLogin appId='601428411583531' onSuccess={onFBSuccess} />
      </div>
    </>
  )
}
export default SocialLogin
