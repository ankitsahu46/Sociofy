/* eslint-disable react/prop-types */
import { Profile } from "../Components";

function MyProfile() {
  const user_id = JSON.parse(localStorage.getItem('user_id'));
 
  return (
    <Profile myProfile={true} user_id={user_id}/>
  )
}

export default MyProfile;