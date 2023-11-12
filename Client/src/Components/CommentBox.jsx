/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { AddComment, CommentSection} from "./";


function CommentBox({ allComments, setAllComments, postId }) {
  // const [allComments, setAllComments] = useState(commentsall);
  // const [sendBtn, setSendBtn] = useState(false);
  // const [addComment, setAddComment] = useState("");
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
    postId
  }
  const commentSectionProps = {
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId
  }
  return (
    <>
      <AddComment {...addCommentProps} />
      <CommentSection {...commentSectionProps}/>
    </>
  )
}

export default CommentBox