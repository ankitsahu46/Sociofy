const getUserNameAndUserImg = async (userId, token, setUserInfo) => {
  try {
    const response = await fetch(`http://localhost:8080/get_username_user-img/${userId}`, {
      method: "GET",
      headers: {
        authorization: token
      }
    });

    const result = await response.json();
    if (result.success) {
      setUserInfo(result.userInfo);
    }
    else {
      throw new Error("Couldn't get user info!")
    }
  }
  catch (err) {
    console.log("Couldn't get user info!", err);
  }
}

export { getUserNameAndUserImg };