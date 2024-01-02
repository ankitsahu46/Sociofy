/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { noImage } from "../../assets";

function SearchedUser({ user, setShowSearchModal }) {
  const { img, username, name } = user;
  const navigate = useNavigate();

  const handleClick = () => {
    setShowSearchModal(false);
    navigate(`/profile/see?username=${username}`);
  }

  return (
    <div onClick={handleClick} className='flex items-center w-full'>
      <div>
        <img src={img ? img : noImage} alt="" className='w-12 aspect-square rounded-full' />
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col px-4 py-2'>
          <span className='text-black font-medium text-sm'>{username}</span>
          <span className='text-gray-500 text-[0.9rem]'>{name}</span>
        </div>
        {/* <div className='flex justify-center items-center px-2'>
                <img src={crossIcon} alt="" className='w-6 aspect-square rounded-full' />
              </div> */}
      </div>
    </div>
  )
}


export default SearchedUser;