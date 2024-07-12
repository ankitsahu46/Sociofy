/* eslint-disable react/prop-types */
// import { useState } from "react";
import { EditProfileModal, ProfilePostSection, ProfileUserInfoSection } from "..";
import { useState, useEffect } from 'react';
// import { getUserData } from '../../utils';
// import { useSearchParams } from 'react-router-dom';
import { getUserPostData, getUserProfileInfoNoPost } from '../../utils';

function Profile({ myProfile, user_id }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  // const { posts = [], postAvailability } = data;

  //  const [params] = useSearchParams();
  // const user_id = params.get('user_id');
  const [userData, setUserData] = useState({});
  const [userPostData, setUserPostData] = useState([]);
  // const [postData, setPostData] = useState({});
  const [postAvailability, setPostAvailability] = useState("Loading...");
  // const [notificationPostAvailability, setNotificationPostAvailability] = useState("Loading...");

  
  const token = JSON.parse(localStorage.getItem('token'));
  // const { _id: userId, username, name, bio, img, posts, followers, following } = userData;

  const data = { ...userData, userId: userData._id, myProfile };

  useEffect(() => {
    getUserProfileInfoNoPost(user_id, token, setUserData);
  }, [user_id, token])

  // useEffect(() => {
  //   getPostData(post_id, token, setPostData, setNotificationPostAvailability);
  // }, [post_id, token]);

  useEffect(() => {
      getUserPostData(user_id, token, setUserPostData, setPostAvailability);
  }, [user_id, token]);

  return (
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <div className="w-[85%]">
        <ProfileUserInfoSection data={data} showEditProfileModal={showEditProfileModal} setShowEditProfileModal={setShowEditProfileModal} />
        <ProfilePostSection posts={userPostData} postAvailability={postAvailability} />
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
// import { useState } from "react";
// import { EditProfileModal, ProfilePostSection, ProfileUserInfoSection } from "..";


// function Profile({ data }) {
//   const [showEditProfileModal, setShowEditProfileModal] = useState(false);
//   const { posts = [], postAvailability } = data;

//   return (
//     <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
//       <div className="w-[85%]">
//         <ProfileUserInfoSection data={data} showEditProfileModal={showEditProfileModal} setShowEditProfileModal={setShowEditProfileModal} />
//         <ProfilePostSection posts={posts} postAvailability={postAvailability} />
//       </div>
//       <div>
//         {showEditProfileModal && (
//           <EditProfileModal
//             setShowEditProfileModal={setShowEditProfileModal}
//             data={data}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Profile;