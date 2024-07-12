const getNotifications = async (
  userId,
  // signal,
  setNotifications,
  setNotificationAvailability
) => {
  try {
    const apiUrl = `http://localhost:8080/notification/get_notifications/${userId}`;

    const response = await fetch(apiUrl);
    // const response = await fetch(apiUrl, { signal });
    const result = await response.json();

    if (!response.ok) {
      // console.log("throwing error");
      throw new Error(
        `Network response was not ok! Status: ${response.status}`
      );
    } else if (result.success) {
      setNotifications(result.data);
      // console.log(result, "notifications from getnoti.js");
    } else {
      setNotificationAvailability("No new notifications Available!");
    }
  } catch (err) {
    setNotificationAvailability(
      "Couldn't get notifications. Please try again later."
    );
  }
};

export { getNotifications };
