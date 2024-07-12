/* eslint-disable react/prop-types */
import { useState } from "react";
import { noImage } from "../../assets";
import { ReactionInfoBox } from "..";
import { Link } from "react-router-dom";
import { sendNotification, sendToNotificationData } from "../../utils";

function AddComment({ cmt, setShowComment, setPendingComment, setAllComments, commentState, postId, userId, postImg }) {
  const [addComment, setAddComment] = useState("");
  const [sendBtn, setSendBtn] = useState(false);
  const [addCommentReaction, setAddCommentReaction] = useState(false);

  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const username = JSON.parse(localStorage.getItem('username'));
  const myProfileImg = JSON.parse(localStorage.getItem('img'));
  const token = JSON.parse(localStorage.getItem('token'));

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
      const response = await fetch(`http://localhost:8080/post/add_comment/${postId}`, {
        method: "POST",
        body: JSON.stringify({ comment: addComment, user_id: myUserId, username, img: myProfileImg }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
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
      const response2 = await fetch(`http://localhost:8080/post/get_comments/${postId}`);
      const result2 = await response2.json();

      if (result2.success) {
        setAllComments(result2.comments);
      }
      else {
        console.log("Couldn't reload comments");
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
            postImg: postImg[0] || '',
            comment: addComment,
          };
          const category = "Comments on Post";
          console.log(addComment, 'add comment from addComment.js');

          await sendNotification(title, body, userId);
          await sendToNotificationData(category, myUserId, username, myProfileImg, userId, body2, otherData);
      }
    }
  }

  return (
    <div className="flex my-5 items-center w-full gap-2">
      <div className="w-11 h-11 flex justify-center items-center">
        <Link to='/profile'>
          <img src={myProfileImg || noImage} alt="" className="rounded-full border" />
        </Link>
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