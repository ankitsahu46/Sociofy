const followUnfollowUser = async (token, userId, whoFollowed, isFollowing, setIsFollowing) => {
  try {
    const response = await fetch(
      `http://localhost:8080/profile/follow_unfollow_user`,
      {
        method: "POST",
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followedToWhom: userId,
          whoFollowed,
          isFollowing,
        }),
      }
    );
    const result = await response.json();

    if (result.success) {
      setIsFollowing(!isFollowing);

      if (!isFollowing) {
      const following = JSON.parse(localStorage.getItem('following'));
      following.push(userId);
      localStorage.setItem('following', JSON.stringify(following));
      }
      else {
        const following = JSON.parse(localStorage.getItem('following'));
        const index = following.indexOf(userId);
        if (index !== -1) following.splice(index, 1);
        localStorage.setItem('following', JSON.stringify(following));
      }
    }
  } catch (err) {
    console.log("Couldn't follow!");
  }
};

export { followUnfollowUser };
