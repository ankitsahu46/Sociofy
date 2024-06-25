/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { noImage } from '../assets';
import { useDispatch } from 'react-redux';
import { setNav } from '../features/nav/navSlice';

function SideSection() {
  const username = JSON.parse(localStorage.getItem('username'));
  const name = JSON.parse(localStorage.getItem('name'));
  const img = JSON.parse(localStorage.getItem('img'));
  const posts = JSON.parse(localStorage.getItem('posts'));
  const followers = JSON.parse(localStorage.getItem('followers'));
  const following = JSON.parse(localStorage.getItem('following'));
  const totalPost = posts?.length;
  const noOfFollowers = followers?.length;
  const noOfFollowing = following?.length;
  const dispatch = useDispatch();

  return (
    <aside className='hidden mdl:block mdl:col-span-3 h-[calc(100vh-2.5rem)] mdl:h-[100vh] px-5 py-5 border-l-[1px]'>
      <Link to='/profile' onClick={() => dispatch(setNav('profile'))}>
        <div className='flex flex-col justify-center items-center pt-5'>
          <div className='w-36 h-36 rounded-full border-4 border-blue-500 flex justify-center items-center cursor-pointer' >
              <img src={img ? img : noImage} alt="" className='w-32 h-32 rounded-full object-cover' />
          </div>
          <span className='mt-2 font-medium text-sm cursor-pointer'>{username}</span>
          <span className='font-medium text-lg text-blue-600 cursor-pointer'>{name}</span>
        </div>
      </Link>
      <div className='flex [&>*]:flex-1 mt-8 font-medium'>
        {
          [
            ["Posts", totalPost],
            ["Followers", noOfFollowers],
            ["Following", noOfFollowing],
          ]
            .map(([name, value]) => (
              <div key={name} className='flex flex-col justify-center items-center'>
                <span>{name}</span>
                <span className='font-bold text-lg text-blue-600'>{value}</span>
              </div>
            ))
        }
      </div>
      <div className='flex justify-center items-center mt-10'>
        <Link to='/profile' onClick={() => dispatch(setNav('profile'))} className='bg-blue-700 rounded-lg text-white px-4 py-1 flex items-center'>
          <span>View Profile</span>
          <span><img src="src/assets/arrow.svg" className='w-4 h-4 invert rotate-45 scale-110 ml-1' /></span>
        </Link>
      </div>
    </aside>)
}

export default SideSection