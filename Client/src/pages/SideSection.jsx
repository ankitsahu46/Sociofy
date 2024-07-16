/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { noImage, arrow } from '../assets';
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
          <div className='w-36 h-36 rounded-full border-4 border-[var(--blue-dark)] flex justify-center items-center cursor-pointer' >
            <img src={img ? img : noImage} alt="" className='w-32 h-32 rounded-full object-contain' />
          </div>
          <span className='mt-2 font-medium text-sm cursor-pointer'>{username}</span>
          <span className='font-medium text-lg text-[var(--blue)] cursor-pointer'>{name}</span>
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
                <span className='font-bold text-lg text-[var(--blue)]'>{value}</span>
              </div>
            ))
        }
      </div>
      <div className='flex justify-center items-center text-base mt-10'>
        <Link to='/profile' className='bg-[var(--blue-dark)] rounded-3xl text-white pl-2 pr-3 py-1 flex items-center'>
          <div className=" border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full mr-2 my-1">
            <img src={img ? img : noImage} alt="" className="rounded-full w-6 h-6 object-contain bg-white border  border-gray-100" />
          </div>
          <span className='font-semibold'>View Profile</span>
          <span><img src={arrow} className='w-4 h-4 invert rotate-45 scale-110 ml-1' /></span>
        </Link>
      </div>
    </aside>)
}

export default SideSection