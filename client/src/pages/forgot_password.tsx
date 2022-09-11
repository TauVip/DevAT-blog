import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  const [account, setAccount] = useState('')

  return (
    <div className='my-4' style={{ maxWidth: 500 }}>
      <h2>Forgot Password?</h2>

      <div className='form-group'>
        <label htmlFor='account'>Email / Phone Number</label>

        <div className='d-flex align-items-center'>
          <input
            type='text'
            className='form-control'
            id='account'
            name='account'
            onChange={e => setAccount(e.target.value)}
          />

          <button className='btn btn-primary mx-2 d-flex align-items-center'>
            <i className='fas fa-paper-plane me-2' /> Send
          </button>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
