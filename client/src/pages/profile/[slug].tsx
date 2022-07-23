import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OtherInfo from '../../components/profile/OtherInfo'
import UserBlogs from '../../components/profile/UserBlogs'
import UserInfo from '../../components/profile/UserInfo'
import { RootStore } from '../../utils/TypeScript'

const Profile = () => {
  const { auth } = useSelector((state: RootStore) => state)

  const { slug } = useParams()

  return (
    <div className='row my-3'>
      <div className='col-md-5 mb-3'>
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
      </div>

      <div className='col-md-7'>
        <UserBlogs />
      </div>
    </div>
  )
}
export default Profile
