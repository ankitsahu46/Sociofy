/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { AddComment, CommentSection } from "..";
import { getUserNameAndUserImg } from "../../utils";

getUserNameAndUserImg
function CommentBox({ allComments, setAllComments, postId, userId, postImg }) {
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
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId,
    userId,
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