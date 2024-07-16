/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { noImage, crossIcon } from "../../assets";
import SvgInfoBox from "../feed/SvgInfoBox";

function SearchedUser({ user, setShowSearchModal, forHistory = false, setSearchHistory }) {
  const { _id: searchedUserId, img, username, name } = user;
  const myUserId = JSON.parse(localStorage.getItem('user_id'));

  const navigate = useNavigate();
  let seeProfile = `/profile/see?user_id=${searchedUserId}`;
  if (searchedUserId === myUserId) seeProfile = '/profile';

  const createHistory = () => {
    const searchHistory = JSON.parse(localStorage.getItem('search_history'));

    let updatedSearchHistory;
    if (searchHistory) {
      const index = searchHistory.findIndex(obj => obj._id === user._id);
      if (index === -1) updatedSearchHistory = [...searchHistory, user];
      else {
        searchHistory.splice(index, 1)
        updatedSearchHistory = [...searchHistory, user];
      }
    }
    else updatedSearchHistory = [user];

    localStorage.setItem('search_history', JSON.stringify(updatedSearchHistory));
  }

  const handleClick = (e) => {
    e.preventDefault();
    setShowSearchModal(false);
    if (seeProfile !== '/profile') {
      createHistory();
    }
    navigate(seeProfile);
  }

  const deleteUserFromHistory = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const searchHistory = JSON.parse(localStorage.getItem('search_history'));
    const index = searchHistory.findIndex(obj => obj._id === searchedUserId);
    if (index !== -1) searchHistory.splice(index, 1);
    localStorage.setItem('search_history', JSON.stringify(searchHistory));

    setSearchHistory(searchHistory);
  }

  return (
    <Link to={seeProfile} onClick={(e) => handleClick(e)}>
      <div className='flex items-center w-full cursor-pointer'>
        <div>
          <img src={img ? img : noImage} alt="" className='w-12 aspect-square rounded-full' />
        </div>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col px-4 py-2'>
            <span className='text-black font-medium text-sm'>{username}</span>
            <span className='text-gray-500 text-[0.9rem]'>{name}</span>
          </div>
          {
            forHistory &&
            <div onClick={deleteUserFromHistory} className='flex justify-center items-center px-2 cursor-pointer'>
              <SvgInfoBox name='Delete' position={'right-6'}>
                <img src={crossIcon} alt="" className='w-6 aspect-square rounded-full' />
              </SvgInfoBox>
            </div>
          }
        </div>
      </div>
    </Link>
  )
}

export default SearchedUser;