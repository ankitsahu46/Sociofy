
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { LayoutModal, Loader, NotificationDiv } from '..';
import { getNotifications } from '../../utils';
import { useNavigate } from 'react-router-dom';

function NotificationModal({ setShowNotificationModal }) {
  const userId = JSON.parse(localStorage.getItem('user_id'));
  const [notifications, setNotifications] = useState([])
  const [notificationAvailability, setNotificationAvailability] = useState("Loading...");
  const navigate = useNavigate();

  const handleCancel = () => setShowNotificationModal(false);
  const notificationClick = (notification) => {
    handleCancel();
    navigate(`/notification/notification_post?post_id=${notification?.otherData?.postId}`);
  }
  const notificationBgClick = (e) => {
    e.stopPropagation();
    handleCancel();
  }

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;
    setTimeout(() => getNotifications(userId, setNotifications, setNotificationAvailability), 2000);
    // getNotifications(userId, signal, setNotifications, setNotificationAvailability);

    // return () => {
    //   abortController.abort();
    // }
  }, [userId])

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-xl">
      <div>
        <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2">
          <h1 className="text-lg font-medium text-white">Notifications</h1>
        </div>

        <div className='flex justify-center items-center'>
          <div className="w-full my-5">
            {
              notifications?.length === 0 ?
                <div className="flex justify-center items-center font-medium text-xl text-[var(--blue)] min-w-full min-h-[70vh]">
                  <div className='flex justify-center items-center min-w-[80vw] md:min-w-full'>
                    {notificationAvailability ==='Loading...' ? <Loader /> : notificationAvailability}
                  </div>
                </div>
                :
                <div className="flex flex-col items-center font-medium text-md min-h-[70vh] max-h-[75vh] overflow-y-auto gap-y-3 custom-scroll-bar mr-1">
                  {
                    [...notifications].reverse().map((notification) => (
                      <NotificationDiv
                        key={notification._id}
                        notification={notification}
                        handleCancel={handleCancel}
                        notificationClick={notificationClick}
                        notificationBgClick={notificationBgClick}
                      />
                    ))
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </LayoutModal>
  )
}

export default NotificationModal;