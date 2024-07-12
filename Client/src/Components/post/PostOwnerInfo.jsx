/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { noImage, options } from "../../assets";
import { SvgInfoBox } from "..";

function PostOwnerInfo(props) {
  const { userId, userImg, username, timeForOwnerInfo } = props;

  let seeProfile;
  const myUserId = JSON.parse(localStorage.getItem('user_id'));

  if (userId === myUserId) {
    seeProfile = '/profile';
  }
  else seeProfile = `/profile/see?user_id=${userId}`;

  return (
    <div className="flex justify-between items-center px-4 mb-2 py-2">
      <div className="cursor-pointer flex justify-center items-center">
        <Link to={seeProfile} className="flex justify-center items-center mr-1">
          <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
            <img src={userImg || noImage} alt="" className="w-8 h-8 rounded-full" />
          </div>
          <div className="ml-2 text-sm font-medium">
            {username}
          </div>
        </Link>
        {timeForOwnerInfo && <span className="text-xs font-extralight">&#12539;{timeForOwnerInfo}</span>}
      </div>

      <div className="cursor-pointer">
        <SvgInfoBox name={'options'} position={'top-3 left-6'}>
          <img src={options} alt="no-image" />
        </SvgInfoBox>
      </div>
    </div>
  )
}

export default PostOwnerInfo