const removeUserFromFollowersFollowing = async (
  userId,
  usersList,
  setUsersList,
  setUserData,
  setShowInfo,
  name
) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const myUserId = JSON.parse(localStorage.getItem("user_id"));

  try {
    const response = await fetch(`http://localhost:8080/profile/remove_user`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: myUserId,
        follower_following_id: userId,
        name: name,
      }),
    });
    const result = await response.json();

    if (result.success) {
      //updating model's user list and number of followers
      let arr = [...usersList];
      let index = -1;
      arr.forEach((user, i) => {
        if (user._id === userId) index = i;
      });
      index !== -1 && arr.splice(index, 1);

      setUsersList(arr);
      setUserData((userData) => {
        let obj = { ...userData };
        obj[name] = result.users;
        return obj;
      });
      localStorage.setItem(name, JSON.stringify(result.users));
    } else {
      throw new Error("Couldn't remove user.");
    }
  } catch (err) {
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 5000);
  }
};

export { removeUserFromFollowersFollowing };