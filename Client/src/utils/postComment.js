const postComment = async (
  postId,
  addComment,
  commentState,
  setShowComment,
  setAddCommentReaction,
  setPendingComment
) => {
  let result;
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const username = JSON.parse(localStorage.getItem("username"));
  const img = JSON.parse(localStorage.getItem("img"));
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const api = `http://localhost:8080/post/add_comment/${postId}`;
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify({
        comment: addComment,
        user_id,
        username,
        img,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    result = await response.json();
  } catch (err) {
    setAddCommentReaction(true);
    setTimeout(() => {
      setAddCommentReaction(false);
    }, 3000);

    setPendingComment(commentState[2]);

    setTimeout(() => {
      setPendingComment(commentState[1]);
      setShowComment(false);
    }, 3000);
  }

  return result;
};

export { postComment };
