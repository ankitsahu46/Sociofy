/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { noImage, options } from "../../assets";
import { useState } from "react";
import { handlePostDelete } from "../../utils";

function PostOwnerInfo(props) {
  const { userId, userImg, username, timeForOwnerInfo, postId } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [deleteBtnText, setDeleteBtnText] = useState('Delete');
  const [isItMyProfile, setIsItMyProfile] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));

  let seeProfile;
  const myUserId = JSON.parse(localStorage.getItem('user_id'));

  if (userId === myUserId) {
    !isItMyProfile && setIsItMyProfile(true);
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
        <div onClick={() => setShowOptions(s => !s)} className="hover:opacity-50 p-2 rounded-2xl">
          <img src={options} alt="no-image" />
        </div>
        {isItMyProfile &&
          <div className={`relative ${showOptions ? 'opacity-100' : 'opacity-0'} duration-150`}>
            <div className="absolute text-white top-0 -right-2">
              <div className="flex flex-col justify-center items-center w-28">
                <div onClick={() => handlePostDelete(postId, token, setDeleteBtnText)} className=" py-1 px-3 w-full flex justify-center items-center border-b border-b-gray-400 text-sm font-semibold rounded-t-lg bg-gray-800 hover:bg-gray-700"><span>{deleteBtnText}</span></div>
                <div onClick={() => setShowOptions(false)} className="py-1 px-3 w-full flex justify-center items-center border-b border-b-gray-400 text-sm font-semibold rounded-b-lg bg-gray-800 hover:bg-gray-700"><span>Cancel</span></div>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  )
}

export default PostOwnerInfo














// /* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import { noImage, options } from "../../assets";
// import { SvgInfoBox } from "..";

// function PostOwnerInfo(props) {
//   const { userId, userImg, username, timeForOwnerInfo } = props;

//   let seeProfile;
//   const myUserId = JSON.parse(localStorage.getItem('user_id'));

//   if (userId === myUserId) {
//     seeProfile = '/profile';
//   }
//   else seeProfile = `/profile/see?user_id=${userId}`;

//   return (
//     <div className="flex justify-between items-center px-4 mb-2 py-2">
//       <div className="cursor-pointer flex justify-center items-center">
//         <Link to={seeProfile} className="flex justify-center items-center mr-1">
//           <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
//             <img src={userImg || noImage} alt="" className="w-8 h-8 rounded-full" />
//           </div>
//           <div className="ml-2 text-sm font-medium">
//             {username}
//           </div>
//         </Link>
//         {timeForOwnerInfo && <span className="text-xs font-extralight">&#12539;{timeForOwnerInfo}</span>}
//       </div>

//       <div className="cursor-pointer">
//         <SvgInfoBox name={'options'} position={'top-3 -left-16'}>
//           <img src={options} alt="no-image" />
//         </SvgInfoBox>
//       </div>
//     </div>
//   )
// }

// export default PostOwnerInfo