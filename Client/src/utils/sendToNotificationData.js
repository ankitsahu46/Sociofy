const sendToNotificationData = async (
  category,
  gotByUserId,
  gotByUserName,
  gotByUserProfileImg,
  userId,
  body,
  otherData = {}
) => {
  const notificationDetails = {
    category,
    gotByUserId,
    gotByUserName,
    gotByUserProfileImg,
    userId,
    body,
    otherData,
  };

 try {
    const response = await fetch(
      "http://localhost:8080/notification/send_to_notification_data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationDetails),
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Something went wrong! Error: ", err);
  }
};

export { sendToNotificationData };
