const checkIsFollowingTrue = async (whoFollowed, userId, setIsFollowing, token) => {
  const response = await fetch(`http://localhost:8080/profile/check_is_following_true/${whoFollowed}/${userId}`,{
    method: "GET",
    headers: {
      authorization: token,
    },
  });
  const result = await response.json();

  if (result.success) setIsFollowing(true);
  else if (!result.success) setIsFollowing(false);
}

export { checkIsFollowingTrue };