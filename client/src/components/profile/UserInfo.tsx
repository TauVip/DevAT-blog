import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { updateUser } from '../../redux/actions/profileAction'
import {
  FormSubmit,
  InputChange,
  IUserProfile,
  RootStore
} from '../../utils/TypeScript'
import NotFound from '../global/NotFound'

const UserInfo = () => {
  const { auth } = useSelector((state: RootStore) => state)

  const dispatch: Dispatch<any> = useDispatch()

  const initState = {
    name: '',
    account: '',
    avatar: '',
    password: '',
    cf_password: ''
  }

  const [user, setUser] = useState<IUserProfile>(initState)
  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const { name, account, avatar, password, cf_password } = user

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files) {
      const file = files[0]
      setUser({ ...user, avatar: file })
    }
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()

    if (avatar || name) dispatch(updateUser(avatar, name, auth))
  }

  if (!auth.user) return <NotFound />

  return (
    <form className='profile_info' onSubmit={handleSubmit}>
      <div className='info_avatar'>
        <img
          src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          alt='avatar'
        />

        <span>
          <i className='fas fa-camera' />
          <p>Change</p>
          <input
            type='file'
            accept='image/*'
            name='file'
            id='file_up'
            onChange={handleChangeFile}
          />
        </span>
      </div>

      <div className='form-group my-3'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='form-control'
          id='name'
          name='name'
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>

      <div className='form-group my-3'>
        <label htmlFor='account'>Account</label>
        <input
          type='text'
          className='form-control'
          id='account'
          name='account'
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled={true}
        />
      </div>

      <div className='form-group my-3'>
        <label htmlFor='password'>Password</label>

        <div className='pass'>
          <input
            type={typePass ? 'text' : 'password'}
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Hide' : 'Show'}
          </small>
        </div>
      </div>

      <div className='form-group my-3'>
        <label htmlFor='cf_password'>Confirm Password</label>

        <div className='pass'>
          <input
            type={typeCfPass ? 'text' : 'password'}
            className='form-control'
            id='cf_password'
            name='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
          />

          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? 'Hide' : 'Show'}
          </small>
        </div>
      </div>

      <button className='btn btn-dark w-100' type='submit'>
        Update
      </button>
    </form>
  )
}
export default UserInfo
