/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { AddComment, CommentSection } from "..";

function CommentBox({ allComments, setAllComments, postId, userId, postImg, caption, userImg, username }) {
  const [showComment, setShowComment] = useState(false);

  const commentState = ["pending", "notPending", "failed", "deleting"];
  const [pendingComment, setPendingComment] = useState(commentState[1]);
  const cmt = useRef("");
  
  const addCommentProps = {
    cmt,
    setShowComment,
    setPendingComment,
    setAllComments,
    commentState,
    postId,
    userId,
    postImg,
  }
  const commentSectionProps = {
    cmt,
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    postId,
    userId,
    caption,
    userImg,
    username
  }

  return (
    <>
      <AddComment {...addCommentProps} />
      <div className="h-full max-h-48 px-2 overflow-y-scroll custom-scroll-bar mb-3">
        <CommentSection {...commentSectionProps} />
      </div>
    </>
  )
}

export default CommentBox