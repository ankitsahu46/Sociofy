const getUserData = async (userId, token, setUserData, setPostAvailability) => {
  try {
    const response = await fetch(`http://localhost:8080/profile/get_user_profile_data/${userId}`, {
      method: "GET",
      headers: {
        authorization: token
      }
    });

    const result = await response.json();
    if (result.success) {
      setUserData(result.profileData);
      if (result.profileData.posts?.length === 0) setPostAvailability("No Posts Found!");
    }
    else setPostAvailability(result.message);
  }
  catch (err) {
    setPostAvailability("Couldn't load posts!");
  }
}

export { getUserData };