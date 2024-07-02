import { useState, useEffect } from "react";
import { registerForToken, onMessageListener } from "../../firebase.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const Toast = () => {
    return (
      <div>
        <p><b>{notification.title}</b></p>
        <p>{notification.body}</p>
      </div>
    )
  }
  const notify = () => toast(<Toast />);

  registerForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((error) => {
      console.log('got error: ' + error);
    });

  useEffect(() => {
    if (notification?.title) notify();
  }, [notification])


  return (<ToastContainer />)
}

export default Notification;