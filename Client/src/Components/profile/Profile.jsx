/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { EditProfileModal, ProfilePost } from "..";
import { noImage } from "../../assets";
import { followUnfollowUser, checkIsFollowingTrue } from "../../utils";

function Profile({ data }) {
  const {
    userId,
    username,
    name,
    bio,
    img,
    followers = [],
    following = [],
    posts = [],
    postAvailability,
    myProfile,
  } = data;
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const noOfPosts = posts?.length;
  const noOfFollowers = followers?.length;
  const noOfFollowing = following?.length;
  const whoFollowed = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const profileImg =
    "http://res.cloudinary.com/dlpzgtx35/image/upload/v1718237737/xjrhsxtrme65pcjfos8q.jpg"; //change this when creating edit profile
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
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <div className="w-[85%]">
        <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0">
          <div className="col-span-2 flex justify-center items-center aspect-square">
            <img
              src={img || profileImg || noImage}
              alt="profile"
              className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-cover border"
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
        <div className="mt-5">
          <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">
            Posts
          </p>
          <div
            className={`border min-h-[300px] ${posts.length > 0 && "min-h-[600px]"
              }`}
          >
            {posts.length === 0 ? (
              <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">
                {postAvailability}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {[...posts].reverse().map((post) => (
                  <ProfilePost
                    key={post._id}
                    post={post}
                    profilePic={profileImg}
                  /> //change profileImg to img
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {showEditProfileModal && (
          <EditProfileModal
            setShowEditProfileModal={setShowEditProfileModal}
            data={data}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;

// /* eslint-disable react/prop-types */
// import { useEffect, useState } from 'react';
// import { ProfilePost } from '..';
// import { noImage } from '../../assets';
// import { followUnfollowUser, checkIsFollowingTrue } from '../../utils';

// function Profile({ data }) {
//   const { userId, img, username, name, followers=[], following=[], bio, posts=[], postAvailability, myProfile } = data;
//   const [isFollowing, setIsFollowing] = useState(false);
//   const noOfPosts = posts?.length;
//   const noOfFollowers = followers?.length;
//   const noOfFollowing = following?.length;
//   const whoFollowed = JSON.parse(localStorage.getItem('username'));
//   const token = JSON.parse(localStorage.getItem('token'));
//   const profileImg = "http://res.cloudinary.com/dlpzgtx35/image/upload/v1718237737/xjrhsxtrme65pcjfos8q.jpg";    //change this when creating edit profile
//   const handleFollowUnfollowBtn = () => {
//     followUnfollowUser(token, username, whoFollowed, isFollowing, setIsFollowing);
//   }
//   useEffect(() => {
//     if (!myProfile) checkIsFollowingTrue(whoFollowed, username, setIsFollowing, token);
//   }, [myProfile, whoFollowed, username, token]
//   )

//   return (
//     <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
//       <div className="w-[85%]">
//         <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0">
//           <div className="col-span-2 flex justify-center items-center aspect-square">
//             <img src={img || profileImg || noImage} alt="profile" className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-cover border" />
//           </div>
//           <div className="col-span-3 flex flex-col justify-center items-start pl-4">
//             <div className="flex gap-7">
//               <span className="md:text-lg font-semibold text-[var(--blue)]">{username}</span>
//               {
//                 myProfile ?
//                   <button className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium text-xs sm:text-sm">Edit Profile</button>
//                   :
//                   <button onClick={handleFollowUnfollowBtn} className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium text-xs sm:text-sm">{isFollowing ? "Following" : "Follow"}</button>
//               }
//             </div>
//             <div className='flex [&>*]:flex-1 mt-8 font-medium '>
//               {
//                 [
//                   ["Posts", noOfPosts],
//                   ["Followers", noOfFollowers],
//                   ["Following", noOfFollowing],
//                 ]
//                   .map(([name, value]) => (
//                     <div key={name} className='flex flex-col justify-center items-center mr-7'>
//                       <span>{name}</span>
//                       <span className='font-bold text-lg text-blue-600'>{value}</span>
//                     </div>
//                   ))
//               }
//             </div>
//             <span className="font-medium text-base md:text-lg mt-5 -mb-4">{name}</span>
//             <pre className="text-sm md:text-base">{bio}</pre>
//           </div>
//         </div>
//         <div className="mt-5">
//           <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">Posts</p>
//           <div className={`border min-h-[300px] ${posts.length > 0 && "min-h-[600px]"}`}>
//             {
//               posts.length === 0 ?
//                 <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">{postAvailability}</div>
//                 :
//                 <div className="grid grid-cols-3 gap-1">
//                   {
//                     [...posts].reverse().map((post, i) => (
//                       <ProfilePost key={post._id} userId={userId} post={post} profilePic={profileImg} i={posts.length - i - 1}/>  //change profileImg to img
//                     ))
//                   }
//                 </div>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile;
