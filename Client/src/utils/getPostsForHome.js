const getPostsForHome = async (
  token,
  following,
  userId,
  setPostsData,
  setPostAvailability,
  setLoading
) => {
  try {
    if (!(following?.length > 0))
      setPostAvailability(
        "No Posts Found! Follow your friends to see their posts."
      );
    else {
      let response = await fetch(
        `http://localhost:8080/post/get_posts_for_home`,
        {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ following, userId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        if (!result.showRecent) setPostsData(result.postsData);
        else setPostsData(result.recent);
      } 
      else setPostAvailability("Couldn't find Posts! Try again.");
    }
  } catch (err) {
    setPostAvailability("Couldn't find Posts! Try again.");
  }
  setLoading(false);
};

export { getPostsForHome };
