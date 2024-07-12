/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { noImage, deleteIcon } from "../../assets";
import { SvgInfoBox } from "..";
import { Link } from "react-router-dom";
import { getUserNameAndUserImg } from "../../utils";

function Comment(props) {
  const { _id, commenter_img, commenter_username, commenter_user_id, comment, pending, handleDelete, userId } = props;
  const [deletePending, setDeletePending] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  let seeProfile = `/profile/see?user_id=${commenter_user_id}`;
  let showDeleteBtn = false;
  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));

  if (commenter_user_id === myUserId) seeProfile = '/profile';
  if (myUserId === userId || myUserId === commenter_user_id) showDeleteBtn = true;

  const handleClick = (commentId) => {
    handleDelete(commentId);
    setDeletePending(true);
  }

  useEffect(() => {
    if (commenter_user_id) {
      getUserNameAndUserImg(commenter_user_id, token, setUserInfo);
    }
  }, [commenter_user_id, token])


  return (
    <div className="flex pl-3 pr-3">
      {/* commenter's image  */}
      <Link to={seeProfile}>
        <div className="w-8 h-8 mt-1">
          <img src={userInfo?.img || commenter_img || noImage} alt="" className="rounded-full w-7 h-7" />
        </div>
      </Link>

      <div className="w-full ml-1">
        <div className="px-3 pt-1 pb-2 bg-gray-200 rounded-lg rounded-tl-[0px] w-full">
          <div className="flex justify-between items-center mb-1">
            <Link to={seeProfile}>
              <span className="text-sm font-medium">{userInfo?.username || commenter_username}</span>
            </Link>
            {
              showDeleteBtn &&
              <SvgInfoBox name="Delete" position="top-2 -left-16">
                <span onClick={() => handleClick(_id)}><img src={deleteIcon} alt="" className="cursor-pointer w-3 h-3" /></span>
              </SvgInfoBox>
            }
          </div>
          <div className="font-normal text-sm text-gray-600">
            {comment}
          </div>
        </div>
        <div className={`ml-2 text-xs text-gray-600 animate-pulse ${pending === "failed" && "text-red-600"}`}>
          {pending === "pending" ? "posting..." : pending === "failed" ? "failed!" : ""}
          {deletePending && "deleting..."}
        </div>
      </div>
    </div>
  )
}

export default Comment