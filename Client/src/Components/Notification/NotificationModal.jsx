
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { LayoutModal, NotificationDiv } from '..';
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
    getNotifications(userId, setNotifications, setNotificationAvailability);
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
                <div className="flex justify-center items-center font-medium text-xl text-[var(--blue)] min-h-[50vh]">{notificationAvailability}</div>
                :
                <div className="flex flex-col items-center font-medium text-md min-h-[50vh] max-h-[75vh] overflow-auto gap-y-3">
                  {
                    notifications.map((notification) => (
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