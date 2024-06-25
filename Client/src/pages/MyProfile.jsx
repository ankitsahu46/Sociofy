/* eslint-disable react/prop-types */
import { Profile } from "../Components";
import { useState, useEffect } from 'react';
import { getUserData } from "../utils";

function MyProfile() {
  const [userData, setUserData] = useState([])
  const [postAvailability, setPostAvailability] = useState("Loading...");
  const userId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));
  const { _id, email, username, name, img, bio, followers, following, posts } = userData;
  const profileProps = { userId: _id, email, username, name, img, bio, followers, following, posts, postAvailability, myProfile: true };

  useEffect(() => {
    getUserData(userId, token, setUserData, setPostAvailability);
  }, [email, userId, token])

  return (
    <Profile data={profileProps} />
  )
}

export default MyProfile;