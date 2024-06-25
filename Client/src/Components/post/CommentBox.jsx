/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { AddComment, CommentSection } from "..";


function CommentBox({ allComments, setAllComments, postId, i, id }) {
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
    i,
    id
  }
  const commentSectionProps = {
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId,
    i,
    id
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