/* eslint-disable react/prop-types */
import { Profile } from "../Components";
import { useState, useEffect } from 'react';

function MyProfile() {
  const [posts, setPosts] = useState([]);
  const [postAvailability, setPostAvailability] = useState("Loading...");

  const username = JSON.parse(localStorage.getItem('username'));
  const name = JSON.parse(localStorage.getItem('name'));
  const img = JSON.parse(localStorage.getItem('img'));
  const email = JSON.parse(localStorage.getItem('email'));
  const token = JSON.parse(localStorage.getItem('token'));

  let bio = String.raw`
♔Θffίcίαl Δccouηt
Respect for girls✨
🖤Blãck løvēr🖤
₩ish_Ⓜ€_1M🅰¥🎂
.
🔥λ₸₸ł₸𝗨Ð𝗘 𝐋é𝐯é𝐥🔥📈
`;

  const profileProps = { img, username, name, bio, posts, postAvailability, myProfile: true };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/getposts/${email}/${username}`, {
          method: "GET",
          headers: {
            authorization: token
          }
        });

        const result = await response.json();
        if (result.success) setPosts(result.result);
        else setPostAvailability(result.message);
      }
      catch (err) {
        setPostAvailability("Couldn't load posts!");
      }
    }

    getPosts();
  }, [email, username, token])

  return (
    <Profile data={profileProps} />
  )
}

export default MyProfile;