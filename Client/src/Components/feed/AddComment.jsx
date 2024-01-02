/* eslint-disable react/prop-types */
import { useState } from "react";
import { noImage } from "../../assets";
import { ReactionInfoBox } from "../";

function AddComment({ cmt, setShowComment, setPendingComment, setAllComments, commentState, postId, i, id }) {
  const [addComment, setAddComment] = useState("");
  const [sendBtn, setSendBtn] = useState(false);
  const [addCommentReaction, setAddCommentReaction] = useState(false);

  const username = JSON.parse(localStorage.getItem('username'));
  const img = JSON.parse(localStorage.getItem('img'));

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

    let result;

    try {
      const response = await fetch(`http://localhost:8080/post/add_comment/${id}/${postId}/${i}`, {
        method: "POST",
        body: JSON.stringify({ comment: addComment, username: username, img: img }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      result = await response.json();
    }
    catch (err) {
      setAddCommentReaction(true);
      setTimeout(() => {
        setAddCommentReaction(false)
      }, 3000);

      setPendingComment(commentState[2]);

      setTimeout(() => {
        setPendingComment(commentState[1]);
        setShowComment(false);
      }, 3000)
    }

    if (result.success) {
      const response2 = await fetch(`http://localhost:8080/post/get_comments/${id}/${postId}/${i}`);
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
  }

  return (
    <div className="flex my-5 items-center w-full gap-2">
      <div className="w-11 h-11 flex justify-center items-center">
        <a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noreferrer">
          <img src={img ? img : noImage} alt="" className="rounded-full border" />
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

      <ReactionInfoBox showInfo={addCommentReaction} text="Couldn't add comment." />
    </div>
  )
}

export default AddComment