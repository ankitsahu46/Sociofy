/* eslint-disable react/prop-types */
import { CommentBox, PostReact } from './';
import { profilePic, notification, notificationActive, comment, share, options } from '../assets';
import { useEffect, useState, useRef } from 'react';

function Post({ postImg, userImg, username, _id, comments, shares, commentsall, likers }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likers.length);
  const [sendBtn, setSendBtn] = useState(false);
  const [addComment, setAddComment] = useState("");

  const handleClick = async () => {
    setLiked(!liked);
    const response = await fetch(`http://localhost:8080/post/likes/${_id}?liked=${!liked}`, {
      method: "PUT",
      body: JSON.stringify({ liker: "mister_2.0" }),              //add current profile's username
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    }
    else {
      const result = await response.json();
      console.log(result.message);
    }
  }

  const handleSend = async () => {
    setAddComment("");
    setSendBtn(false);

    try {
      const response = await fetch(`http://localhost:8080/post/addcomment/${_id}`, {
        method: "POST",
        body: JSON.stringify({ comment: addComment, username: "mister_2.0" }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("ERRor not found");
    }
    catch (err) {
      console.log("err found");
    }
  }

  const handleAddCommentChange = (e) => {
    setAddComment(e.target.value);
    setSendBtn(e.target.value.length !== 0);
  }

  const checkLikedOrNot = async () => {
    const response = await fetch(`http://localhost:8080/post/checklikedornot/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ username: "mister_2.0" }),          //use current profile's username
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.ok) {
      const result = await response.json();
      setLiked(result.liked)
    }
    else {
      const result = await response.json();
    }
  }
  // checkLikedOrNot();

  useEffect(() => {
    checkLikedOrNot();
  }, [])

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Post(s) */}
          <div className="w-full aspect-square">
            {
              <div className="snap-x snap-mandatory w-full aspect-square flex overflow-x-scroll scroll-hidden rounded-xl">
                {/* posts.map((post, i) => ( */}
                <div className='snap-center snap-always min-w-full'>
                  <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
                </div>
                <div className='snap-center snap-always min-w-full'>
                  <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
                </div>
              </div>
            }
          </div>

          {/* Username and other options */}
          <div className="flex justify-between items-center px-4 mb-2 py-2">
            <div className="cursor-pointer">
              <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer" className="flex justify-center items-center">
                <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
                  <img src={userImg} alt="" className="w-8 h-8 rounded-full" />
                </div>
                <div className="ml-2 text-sm font-medium">
                  {username}
                </div>
              </a>
            </div>
            <img src={options} alt="" className="rotate-90 cursor-pointer" />
          </div>
        </div>

        <div className="px-3">
          {/* Like, Comment and Share */}
          <div className="flex justify-between py-1 pb-2">
            <div className="flex justify-around cursor-pointer w-full">
              <PostReact svg={liked ? notificationActive : notification} name="Like" handleClick={handleClick} />
              <label htmlFor={`comment${_id}`}>
                <PostReact svg={comment} name="Comment" />
              </label>
              <PostReact svg={share} name="Share" />
            </div>
          </div>

          {/* Like, comment and share info */}
          <div className="text-[10px] text-gray-500">
            <span>{likeCount} likes</span>
            <span className="before:content-['•'] ml-2">{comments} comments</span>
            <span className="before:content-['•'] ml-2">{shares} shares</span>
          </div>

          {/* Add a comment */}
          <div className="flex py-5 items-center w-full gap-2">
            <div className="w-11 h-11 flex justify-center items-center">
              <a href={`https://www.instagram.com/${profilePic}/`} target="_blank" rel="noreferrer">
                <img src={profilePic} alt="" className="rounded-full" />
              </a>
            </div>
            <div className='w-full flex gap-2'>
              <textarea id={`comment${_id}`} onChange={(e) => handleAddCommentChange(e)} className="rounded-full bg-gray-100 text-sm text-gray-700 outline-[var(--blue)] px-3 border-gray-300 border-[1px] w-full h-auto py-2" value={addComment} rows="1" placeholder="Add a comment..." ></textarea>
              {
                sendBtn &&
                <button onClick={handleSend} className='bg-[var(--blue)] rounded-full px-3 py-2 text-xs text-white'>
                  Send
                </button>
              }
            </div>

          </div>

          {/* Comment Box */}
          <div>
            <div className='flex flex-col gap-3'>
              {
                commentsall.map((commenter) => (
                  <CommentBox key={commenter.commenterimg + commenter.comment} {...commenter} />
                ))
              }
            </div>
            <div className="text-sm mt-2 text-gray-500 font-medium">
              Load more comments
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post