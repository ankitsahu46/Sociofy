const getFollowersFollowingList = async (setUsersList, setStatus, whatToGet) => {
  setStatus("Loading...");
  const users = JSON.parse(localStorage.getItem(whatToGet));
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    if (!(users.length > 0)) {
      setStatus(`You have no ${whatToGet}!`);
    } else {
      const response = await fetch(
        `http://localhost:8080/profile/get_followers_following_list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ userIds: users }),
        }
      );
      const result = await response.json();

      if (result.success) {
        if (result.usersList.length > 0) {
          setUsersList(result.usersList);
          setStatus("success");
        } else setStatus(`No ${whatToGet} found!`);
      } else {
        throw new Error(`Couldn't find ${whatToGet}!`);
      }
    }
  } catch (err) {
    setStatus("Something went wrong.");
  }
};

export { getFollowersFollowingList };