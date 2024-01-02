/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { notification, notificationActive, share, comment } from "../../assets";
import { PostReact, ReactionInfoBox } from "..";

function PostReactBox(props) {
  const { likeCount, allComments = [], shares, postId, i, setLikeCount, id } = props;
  const [liked, setLiked] = useState(false);
  const [likedReaction, setLikedReaction] = useState(false);

  const myUsername = JSON.parse(localStorage.getItem('username'));


  const handleLiked = async () => {
    setLiked(!liked);

    try {
      const response = await fetch(`http://localhost:8080/post/likes/${id}/${postId}/${i}?liked=${!liked}`, {
        method: "PUT",
        body: JSON.stringify({ liker: myUsername }),             
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const response2 = await fetch(`http://localhost:8080/post/like_count/${id}/${postId}/${i}`);
        const result2 = await response2.json();

        if (response2.ok) {
          setLikeCount(result2.likeCount);
        }
      }
    }
    catch (err) {
      setTimeout(() => {
        setLiked(liked);
        setLikedReaction(true);
      }, 1000);

      setTimeout(() => {
        setLikedReaction(false);
      }, 3000);
    }
  }

  useEffect(() => {
    const checkLikedOrNot = async () => {
      const response = await fetch(`http://localhost:8080/post/check_liked_or_not/${id}/${postId}/${i}`, {
        method: "PUT",
        body: JSON.stringify({ username: myUsername }),          //use current profile's username
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.ok) {
        const result = await response.json();
        setLiked(result.liked)
      }
      else {
        await response.json();
      }
    }
    checkLikedOrNot();
  }, [i, id, postId, myUsername])

  const handleShare = async () => {
    const info = {
      title: "See post on Instagram",
      url: "post/see/" + id + "/" + postId + "/" + i,
      text: "Here's a Good post I found on Instagram. It may inspire you to work hard on your goals."
    }

    try {
      await navigator.share(info);
    }
    catch (err) {
      console.log("Couldn't share!");
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
          <PostReact svg={share} name="Share" handleClick={handleShare} />
        </div>
      </div>

      {/* Like, comment and share info */}
      <div className="text-[10px] text-gray-500 ml-1">
        <span>{likeCount} likes</span>
        <span>{" • "}{allComments.length} comments</span>
        <span>{" • "}{shares} shares</span>
      </div>

      <ReactionInfoBox showInfo={likedReaction} text="Couldn't liked/disliked." />
    </>
  )
}

export default PostReactBox