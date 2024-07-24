const handlePostDelete = async (
  postId,
  setDeleteState,
  setPosts,
  setUserData,
  setShowInfo
) => {
  setDeleteState("Deleting...");
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await fetch(
      `http://localhost:8080/profile/delete_post/${postId}`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    );

    const result = await response.json();
    if (result.success) {
      setDeleteState("Deleted.");

      //changing posts array from localStorage
      const posts = JSON.parse(localStorage.getItem("posts"));
      const index = posts.indexOf(postId);
      index !== -1 && posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));

      //changing postsData array from localStorage
      const postsData = JSON.parse(localStorage.getItem("postsData"));
      let index2 = -1;
      postsData.forEach((post, i) => {
        if (post._id === postId) index2 = i;
      });
      index2 !== -1 && postsData.splice(index2, 1);
      localStorage.setItem("postsData", JSON.stringify(postsData));

      if (typeof setPosts !== "function" || postsData.length === 0) {
        window.location.reload();
      } else {
        setPosts(postsData);
        setUserData((userData) => ({ ...userData, posts: postsData }));
      }
    } else {
      setDeleteState("Delete");
    }
  } catch (err) {
    console.log('Error for handlePostDelete.js', err);
    setDeleteState("Delete");
    setShowInfo(true);
  }
};

export { handlePostDelete };
