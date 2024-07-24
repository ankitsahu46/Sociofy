const getPostsForHome = async (
  token,
  following,
  userId,
  setPostsData,
  setPostAvailability,
  setLoading,
  setIsShowingRecent,
  setProgress
) => {
  try {
    setProgress(20);
    if (!(following?.length > 0)) {
      setPostAvailability(
        "No Posts Found! Follow your friends to see their posts."
      );
      setProgress(100);
    } else {
      setProgress(30);
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
      setProgress(60);
      const result = await response.json();
      setProgress(70);
      if (result.success) {
        if (!result.showRecent) setPostsData(result.postsData);
        else setPostsData(result.recent);
        setIsShowingRecent(result.showRecent);
        setProgress(90);
        setProgress(100);
      } else {
        setPostAvailability("Couldn't find Posts! Try again.");
        setProgress(100);
      }
    }
  } catch (err) {
    setPostAvailability("Couldn't find Posts! Try again.");
    setProgress(100);
  }
  setLoading(false);
};

export { getPostsForHome };
