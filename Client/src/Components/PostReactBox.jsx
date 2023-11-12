/* eslint-disable react/prop-types */
import { useState } from "react";
import { notification, notificationActive, share, comment } from "../assets";
import { PostReact } from "./";

function PostReactBox({ liked, setLiked, likers, allComments, shares, postId }) {
  const [likeCount, setLikeCount] = useState(likers.length);

  const handleLiked = async () => {
    setLiked(!liked);

    const response = await fetch(`http://localhost:8080/post/likes/${postId}?liked=${!liked}`, {
      method: "PUT",
      body: JSON.stringify({ liker: "mister_2.0" }),              //add current profile's username
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const response2 = await fetch(`http://localhost:8080/post/likecount/${postId}`);
      const result2 = await response2.json();

      if (response2.ok) {
        setLikeCount(result2.likeCount);
      }
      else {
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      }
    }
    else {
      await response.json();
    }
  }
  return (
    <>
      <div className="flex justify-between py-1 pb-2">
        <div className="flex justify-around cursor-pointer w-full">
          <PostReact svg={liked ? notificationActive : notification} name="Like" handleClick={handleLiked} />
          <label htmlFor={`comment${postId}`}>
            <PostReact svg={comment} name="Comment" />
          </label>
          <PostReact svg={share} name="Share" />
        </div>
      </div>

      {/* Like, comment and share info */}
      <div className="text-[10px] text-gray-500 ml-1">
        <span>{likeCount} likes</span>
        <span className="before:content-['•'] ml-2"><span className='ml-1'>{allComments.length} comments</span></span>
        <span className="before:content-['•'] ml-2"><span className='ml-1'>{shares} shares</span></span>
      </div>
    </>
  )
}

export default PostReactBox