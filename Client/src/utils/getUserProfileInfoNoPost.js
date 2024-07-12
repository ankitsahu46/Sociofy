const getUserProfileInfoNoPost = async (userId, token, setUserData) => {
  try {
    const response = await fetch(`http://localhost:8080/profile/get_user_profile_info_no_post/${userId}`, {
      method: "GET",
      headers: {
        authorization: token
      }
    });

    const result = await response.json();
    if (result.success) {
      setUserData(result.userData);
    }
    else {
      throw new Error('Something went wrong!')
    }
  }
  catch (err) {
    console.log('Something went wrong! Got error: ', err);
  }
}

export { getUserProfileInfoNoPost };