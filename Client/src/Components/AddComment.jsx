/* eslint-disable react/prop-types */
import { useState } from "react";
import { profilePic } from "../assets";

function AddComment({ cmt, setShowComment, setPendingComment, setAllComments, commentState, postId }) {
  const [addComment, setAddComment] = useState("");
  const [sendBtn, setSendBtn] = useState(false);

  const handleAddCommentChange = (e) => {
    setAddComment(e.target.value);
    setSendBtn(e.target.value.length !== 0);
  }

  const handleSend = async () => {
    cmt.current = addComment;
    setAddComment("");
    setSendBtn(false);
    setShowComment(true);
    setPendingComment(commentState[0]);

    const response = await fetch(`http://localhost:8080/post/addcomment/${postId}`, {
      method: "POST",
      body: JSON.stringify({ comment: addComment, username: "mister_2.0", img: profilePic }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    setPendingComment(commentState[1]);

    if (result.success) {
      const response2 = await fetch(`http://localhost:8080/post/getcomments/${postId}`);
      const result2 = await response2.json();

      if (result2.success) {
        setAllComments(result2.comments);
      }
      else {
        console.log("Couldn't reload comments");
      }
      setPendingComment(commentState[1]);
      setShowComment(false);
    }
    else {
      setPendingComment(commentState[2]);

      setTimeout(() => {
        setPendingComment(commentState[1]);
        setShowComment(false);
      }, 4000)
    }
  }
  
  return (
    <div className="flex py-5 items-center w-full gap-2">
      <div className="w-11 h-11 flex justify-center items-center">
        <a href={`https://www.instagram.com/${profilePic}/`} target="_blank" rel="noreferrer">
          <img src={profilePic} alt="" className="rounded-full" />
        </a>
      </div>
      <div className='w-full flex gap-2'>
        <textarea id={`comment${postId}`} onChange={(e) => handleAddCommentChange(e)} className="rounded-full bg-gray-100 text-sm text-gray-700 outline-[var(--blue)] px-3 border-gray-300 border-[1px] w-full h-auto py-2" value={addComment} rows="1" placeholder="Add a comment..." ></textarea>
        {
          sendBtn &&
          <button onClick={handleSend} className='bg-[var(--blue)] rounded-full px-3 py-2 text-xs text-white'>
            Send
          </button>
        }
      </div>
    </div>
  )
}

export default AddComment