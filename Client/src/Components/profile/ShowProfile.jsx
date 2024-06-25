import { useSearchParams } from 'react-router-dom';
import { Profile } from '..';
import { useState, useEffect } from 'react';
import { getUserData } from '../../utils';

function ShowProfile() {
  const [params] = useSearchParams();
  const user_id = params.get('user_id');
  const [userData, setUserData] = useState({});
  const [postAvailability, setPostAvailability] = useState("Loading...");
  
  const token = JSON.parse(localStorage.getItem('token'));
  const { _id: userId, username, name, bio, img, posts, followers, following } = userData;

  const profileProps = { userId, username, name, bio, img, posts, followers, following, postAvailability, myProfile: false };

  useEffect(() => {
    getUserData(user_id, token, setUserData, setPostAvailability);
  }, [user_id, token])

  return (
    <Profile data={profileProps} />
  )
}

export default ShowProfile;