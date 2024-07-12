/* eslint-disable react/prop-types */
import { noImage } from "../../assets";
import { useEffect, useState } from "react";
import { followUnfollowUser, checkIsFollowingTrue } from "../../utils";


function ProfileUserInfoSection({ data, showEditProfileModal, setShowEditProfileModal }) {
  const {
    userId,
    username,
    name,
    bio,
    img,
    followers = [],
    following = [],
    posts = [],
    myProfile,
  } = data;
  const [isFollowing, setIsFollowing] = useState(false);

  const noOfPosts = posts?.length;
  const noOfFollowers = followers?.length;
  const noOfFollowing = following?.length;
  const whoFollowed = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const profileImg = JSON.parse(localStorage.getItem('img'));


  const handleFollowUnfollowBtn = () => {
    followUnfollowUser(token, userId, whoFollowed, isFollowing, setIsFollowing);
  };


  const toggleEditProfileModal = () =>
    setShowEditProfileModal(!showEditProfileModal);


  useEffect(() => {
    if (!myProfile && userId)
      checkIsFollowingTrue(whoFollowed, userId, setIsFollowing, token);
  }, [myProfile, whoFollowed, userId, token]);

  
  return (
    <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0">
      <div className="col-span-2 flex justify-center items-center aspect-square">
        <img
          src={img || profileImg || noImage}
          alt="profile"
          className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-contain border"
        />
      </div>
      <div className="col-span-3 flex flex-col justify-center items-start pl-4">
        <div className="flex gap-7">
          <span className="md:text-lg font-semibold text-[var(--blue)]">
            {username}
          </span>
          {myProfile ? (
            <button
              onClick={toggleEditProfileModal}
              className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium text-xs sm:text-sm"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollowUnfollowBtn}
              className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium text-xs sm:text-sm"
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="flex [&>*]:flex-1 mt-8 font-medium ">
          {[
            ["Posts", noOfPosts],
            ["Followers", noOfFollowers],
            ["Following", noOfFollowing],
          ].map(([name, value]) => (
            <div
              key={name}
              className="flex flex-col justify-center items-center mr-7"
            >
              <span>{name}</span>
              <span className="font-bold text-lg text-blue-600">
                {value}
              </span>
            </div>
          ))}
        </div>
        <span className="font-medium text-base md:text-lg mt-5 -mb-4">
          {name}
        </span>
        <div className="max-w-[100px]">
          <div className="text-sm md:text-base mt-4 w-72 max-h-60 overflow-y-hidden">
            {bio}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUserInfoSection