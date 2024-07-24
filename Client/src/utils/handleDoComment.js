import { postComment, reloadCommentAfterPostingComment } from "./";

const handleDoComment = async (
  postId,
  postImg,
  userId,
  addComment,
  cmt,
  commentState,
  setAddComment,
  setSendBtn,
  setShowComment,
  setPendingComment,
  setAddCommentReaction,
  setAllComments,
  setCommentReloadReaction
) => {
  cmt.current = addComment;
  setAddComment("");
  setSendBtn(false);
  setShowComment(true);
  setPendingComment(commentState[0]);

  let result = postComment(
    postId,
    addComment,
    commentState,
    setShowComment,
    setAddCommentReaction,
    setPendingComment
  );

  if (result?.success) {
    reloadCommentAfterPostingComment(
      postId,
      userId,
      postImg,
      addComment,
      commentState,
      setAllComments,
      setCommentReloadReaction,
      setPendingComment,
      setShowComment
    );
  }
};

export { handleDoComment };
