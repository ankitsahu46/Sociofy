import { useSearchParams } from 'react-router-dom';
import { Profile } from '../';
import { useState, useEffect } from 'react';

function ShowProfile() {
  const [params] = useSearchParams();
  const userName = params.get('username');
  const [userData, setUserData] = useState([]);
  const [postAvailability, setPostAvailability] = useState("Loading...");
  
  const token = JSON.parse(localStorage.getItem('token'));
  const { img, username, name, posts } = userData;
  let bio = String.raw`
♔Θffίcίαl Δccouηt
Respect for girls✨
🖤Blãck løvēr🖤
₩ish_Ⓜ€_1M🅰¥🎂
.
🔥λ₸₸ł₸𝗨Ð𝗘 𝐋é𝐯é𝐥🔥📈
`;

  const profileProps = { img, username, name, bio, posts, postAvailability, myProfile: false };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/get_user_profile_data/${userName}`, {
          method: "GET",
          headers: {
            authorization: token
          }
        });

        const result = await response.json();
        console.log(result, "result showProfile");
        if (result.success) setUserData(result.result);
        else setPostAvailability(result.message);
      }
      catch (err) {
        setPostAvailability("Couldn't load posts!");
      }
    }

    getPosts();
  }, [userName, token])

  return (
    <Profile data={profileProps} />
  )
}

export default ShowProfile;