const getPostData = async (
  post_id,
  token,
  setPostData,
  setNotificationPostAvailability
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/post/get_post_data/${post_id}`,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );
    const result = await response.json();
    if (result.success) {
      setPostData(result.data);
    } else setNotificationPostAvailability(result.message);
  } catch (err) {
    setNotificationPostAvailability("Couldn't load posts!");
  }
};

export { getPostData };