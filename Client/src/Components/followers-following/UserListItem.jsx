/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { noImage } from "../../assets";
import ReactionInfoBox from "../feed/ReactionInfoBox";
import { removeUserFromFollowersFollowing } from "../../utils";

function UserListItem({ user, handleCancel, setUsersList, usersList, setUserData, name: nameForModal, }) {
  const { _id: userId, img, username, name } = user;
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeUserFromFollowersFollowing(userId, usersList, setUsersList, setUserData, setShowInfo, nameForModal);
  }

  return (
    <>
      <Link key={userId} to={`/profile/see?user_id=${userId}`} onClick={handleCancel}>
        <div className='flex items-center w-full cursor-pointer'>
          <div>
            <img src={img ? img : noImage} alt="" className='w-12 aspect-square rounded-full border' />
          </div>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col px-4 py-2'>
              <span className='text-black font-medium text-sm'>{username}</span>
              <span className='text-gray-500 text-[0.9rem]'>{name}</span>
            </div>

            <div className='flex justify-center items-center px-2 cursor-pointer'>
              <div onClick={(e) => handleClick(e)} className="flex justify-center items-center px-2 bg-blue-50 text-[var(--blue)] rounded-md border border-blue-200 text-sm">
                <span>{nameForModal === 'following' ? "following" : "Remove"}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <ReactionInfoBox showInfo={showInfo} text="Couldn't remove follower." />
    </>
  )
}

export default UserListItem;