/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { EditProfileModal, ProfilePostSection, ProfileUserInfoSection } from '..';
import { getUserPostData, getUserProfileInfoNoPost } from '../../utils';
import LoadingBar from 'react-top-loading-bar';

function Profile({ myProfile, user_id }) {
  const [userData, setUserData] = useState({});
  const [userPostData, setUserPostData] = useState([]);
  const [postAvailability, setPostAvailability] = useState('Loading...');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    const token = JSON.parse(localStorage.getItem('token'));

    const fetchData = async () => {
      try {
        await Promise.all([
          getUserProfileInfoNoPost(user_id, token, setUserData),
          getUserPostData(user_id, token, setUserPostData, setPostAvailability),
        ]);
        loadingBarRef.current.complete();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]);

  
  const data = { ...userData, userId: userData._id };

  const profileUserInfoSectionProps = {
    data,
    showEditProfileModal,
    setShowEditProfileModal,
    myProfile,
    setUserData
  };
  
  const profilePostSectionProps = {
    posts: userPostData,
    setPosts: setUserPostData,
    userData,
    setUserData,
    postAvailability,
    myProfile,
  };
  
  //storing posts to localStorage so you delete posts easily
  useEffect(() => {
    if (userPostData.length > 0) localStorage.setItem('postsData', JSON.stringify(userPostData))
  }, [userPostData]);

  return (
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden">
      <LoadingBar color="#29caff" ref={loadingBarRef} />
      <div className="sm:w-[85%]">
        <ProfileUserInfoSection {...profileUserInfoSectionProps} />
        <ProfilePostSection {...profilePostSectionProps} />
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