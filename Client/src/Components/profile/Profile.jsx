/* eslint-disable react/prop-types */
import { EditProfileModal, ProfilePostSection, ProfileUserInfoSection } from "..";
import { useState, useEffect } from 'react';
import { getUserPostData, getUserProfileInfoNoPost } from '../../utils';

function Profile({ myProfile, user_id }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [userPostData, setUserPostData] = useState([]);
  const [postAvailability, setPostAvailability] = useState("Loading...");

  const token = JSON.parse(localStorage.getItem('token'));
  const data = { ...userData, userId: userData._id, myProfile };

  useEffect(() => {
    getUserProfileInfoNoPost(user_id, token, setUserData);
  }, [user_id, token])

  useEffect(() => {
      getUserPostData(user_id, token, setUserPostData, setPostAvailability);
  }, [user_id, token]);

  return (
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <div className="sm:w-[85%]">
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