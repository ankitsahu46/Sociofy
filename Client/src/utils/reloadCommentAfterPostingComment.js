import { sendNotification, sendToNotificationData } from "./";

const reloadCommentAfterPostingComment = async (
  postId,
  userId,
  postImg,
  addComment,
  commentState,
  setAllComments,
  setCommentReloadReaction,
  setPendingComment,
  setShowComment
) => {
  const myUserId = JSON.parse(localStorage.getItem("user_id"));
  const username = JSON.parse(localStorage.getItem("username"));
  const myProfileImg = JSON.parse(localStorage.getItem("img"));
  const token = JSON.parse(localStorage.getItem("token"));

  const response2 = await fetch(
    `http://localhost:8080/post/get_comments/${postId}`,
    {
      method: "GET",
      headers: {
        authorization: token,
      },
    }
  );
  const result2 = await response2.json();

  if (result2.success) {
    setAllComments(result2.comments);
  } else {
    setCommentReloadReaction("Couldn't reload comments!");
  }
  setPendingComment(commentState[1]);
  setShowComment(false);

  //sending notification to the user and updating the user's notifications
  if (myUserId !== userId) {
    const title = "Sociofy";
    const body = `${username} commented on your post.`;
    const body2 = `commented on your post`;
    const otherData = {
      postId,
      postImg: postImg[0] || "",
      comment: addComment,
    };
    const category = "Comments on Post";

    await sendNotification(title, body, userId);
    await sendToNotificationData(
      category,
      myUserId,
      username,
      myProfileImg,
      userId,
      body2,
      otherData
    );
  }
};

export { reloadCommentAfterPostingComment };
