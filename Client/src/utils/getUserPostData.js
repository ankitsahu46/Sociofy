const getUserPostData = async (userId, token, setUserPostData, setPostAvailability) => {
  try {
    const response = await fetch(`http://localhost:8080/post/get_user_post_data/${userId}`, {
      method: "GET",
      headers: {
        authorization: token
      }
    });

    const result = await response.json();
    if (result.success) {
      setUserPostData(result.postData);
      if (result.postData?.length === 0) setPostAvailability("No Posts Found!");
    }
    else setPostAvailability(result.message);
  }
  catch (err) {
    setPostAvailability("Couldn't load posts!");
  }
}

export { getUserPostData };