/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { noImage } from "../../assets";
import { getTimeForNotifications, getUserNameAndUserImg } from "../../utils";
import { useEffect, useState } from "react";

function NotificationDiv({ notification, handleCancel, notificationClick, notificationBgClick }) {
  const { gotByUserId, gotByUserName, gotByUserProfileImg, body, category, date, otherData=[] } = notification;
  const token = JSON.parse(localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState({});
  const { username, img } = userInfo;
  
  useEffect(() => {
      getUserNameAndUserImg(gotByUserId, token, setUserInfo);
  }, [gotByUserId, token]);

  return (
    <div className='w-full'>
      <div className='flex justify-center items-center px-8 hover:bg-gray-50' >
        <div className='flex justify-start items-center  w-full'>
          <div className='mr-3 w-14 justify-start'>
            <Link to={`/profile/see?user_id=${gotByUserId}`} onClick={handleCancel} >
              <img src={img || gotByUserProfileImg || noImage} alt="user-img" className='rounded-full w-10 h-10' />
            </Link>
          </div>

          <div className='w-full cursor-pointer' onClick={() => notificationClick(notification)}>
            <div className='flex' >
              <span className='flex w-full pr-6'>
                <span className='py-2 pr-4' >
                  <Link to={`/profile/see?user_id=${gotByUserId}`} onClick={(e) => notificationBgClick(e)}>
                    <span className='font-bold text-[var(--blue-dark)] mr-1 py-2' >
                      {username || gotByUserName}
                    </span>
                  </Link>
                  <span className='text-[var(--blue-dark)] font-medium'>
                    {body}
                  </span>
                  {category === "Comments on Post" &&
                    <span className='text-[var(--blue-dark)] font-medium'>
                      : {otherData?.comment}
                    </span>
                  }
                  <span className='text-gray-600 text-xs font-light ml-1'> • {getTimeForNotifications(date)}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
        {!(category === "Starts Following") &&
          <div>
            <Link to={`/notification/notification_post?post_id=${otherData?.postId}`} onClick={handleCancel}>
              <img src={otherData?.postImg || noImage} alt="post" className='w-12 h-12 rounded-md object-contain  border-gray-200' />
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default NotificationDiv