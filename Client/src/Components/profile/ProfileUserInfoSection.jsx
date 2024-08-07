/* eslint-disable react/prop-types */
import { noImage } from "../../assets";
import { useEffect, useState } from "react";
import { followUnfollowUser, checkIsFollowingTrue } from "../../utils";
import FollowersFollowingModal from "../followers-following/FollowersFollowingModal";

function ProfileUserInfoSection({ data, showEditProfileModal, setShowEditProfileModal, myProfile, setUserData }) {
  const {
    userId,
    username,
    name,
    bio,
    img,
    followers = [],
    following = [],
    posts = [],
  } = data;
  const [isFollowing, setIsFollowing] = useState(false);
  const [nameForModal, setNameForModal] = useState('')
  const [showFollowersFollowingModal, setShowFollowersFollowingModal] = useState(false);

  const noOfPosts = posts?.length;
  const noOfFollowers = followers?.length;
  const noOfFollowing = following?.length;
  const whoFollowed = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const profileImg = JSON.parse(localStorage.getItem('img'));

  const handleFollowUnfollowBtn = () => {
    followUnfollowUser(token, userId, whoFollowed, isFollowing, setIsFollowing);
  };


  const toggleEditProfileModal = () => setShowEditProfileModal(!showEditProfileModal);
  const toggleFollowersFollowingModal = (name) => {
    setShowFollowersFollowingModal(!showFollowersFollowingModal);
    setNameForModal(name);
  }

  useEffect(() => {
    if (!myProfile && userId)
      checkIsFollowingTrue(whoFollowed, userId, setIsFollowing, token);
  }, [myProfile, whoFollowed, userId, token]);


  return (
    <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0 sm_max:mx-4">
      {/* Profile Image */}
      <div className="col-span-2 flex justify-center items-center aspect-square">
        <img
          src={img || (userId === whoFollowed && profileImg) || noImage}
          alt="profile"
          className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-contain border"
        />
      </div>

      {/* Username, EditProfile/Follow button */}
      <div className="col-span-3 flex flex-col justify-center items-start pl-4">
        <div className="flex gap-7">
          <span className="text-lg font-semibold text-[var(--blue)]">
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

        {/* showing number of posts, followers and following */}
        <div className="flex [&>*]:flex-1 mt-8 font-medium ">
          {[
            ["Posts", noOfPosts, () => console.log("")],
            ["Followers", noOfFollowers, () => toggleFollowersFollowingModal('followers')],
            ["Following", noOfFollowing, () => toggleFollowersFollowingModal('following')],
          ].map(([name, value, onClickFunc]) => (
            <div
              key={name}
              onClick={onClickFunc}
              className={`flex flex-col justify-center items-center mr-7 text-sm sm:text-base ${name !== "Posts" && "cursor-pointer"}`}
            >
              <span>{name}</span>
              <span className="font-bold text-base sm:text-lg text-blue-600">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Name and Bio */}
        <span className="font-medium text-base md:text-lg mt-5 -mb-4">
          {name}
        </span>
        <div className="">
          <div className="text-sm md:text-base mt-4 md:w-80 max-h-60 overflow-y-hidden pr-2">
            {bio}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="fixed">
        {showFollowersFollowingModal && <FollowersFollowingModal setShowFollowersFollowingModal={setShowFollowersFollowingModal} name={nameForModal} setUserData={setUserData} />}
      </div>
    </div>
  )
}

export default ProfileUserInfoSection;