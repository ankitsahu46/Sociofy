const fetchMorePosts = async (token, following, userId, postsData, setPostsData, setHasMore, setFetchError) => {
  try {
    const response = await fetch(`http://localhost:8080/post/fetch_more_posts_for_home`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ following, userId }),
    })
    const result = await response.json();
    
    if (result.success) {
      setPostsData([...postsData, ...result.postsData]);
    }
    else {
      setHasMore(false);
    }
  }
  catch (err) {
    setFetchError("Couldn't fetch posts! Got Error.")
  }
}

export { fetchMorePosts }