const likedDislikedThePost = async (postId, liked, myUserId) => {
  const response = await fetch(`http://localhost:8080/post/likes/${postId}?liked=${liked}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liker: myUserId }),
  });

  const result = await response.json();
  return result;
};

export { likedDislikedThePost };