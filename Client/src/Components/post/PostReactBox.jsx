/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { notification, notificationActive, share, comment } from "../../assets";
import { PostReact, ReactionInfoBox } from "..";

function PostReactBox(props) {
  const { likeCount, allComments = [], shares, postId, setLikeCount, timeForReactBox } = props;
  const [liked, setLiked] = useState(false);
  const [likedReaction, setLikedReaction] = useState(false);
  const [noOfShares, setNoOfShares] = useState(shares);

  // const myUsername = JSON.parse(localStorage.getItem('username'));
  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));


  const handleLiked = async () => {
    setLiked(!liked);

    try {
      const response = await fetch(`http://localhost:8080/post/likes/${postId}?liked=${!liked}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liker: myUserId }),             
      });

      if (response.ok) {
        const response2 = await fetch(`http://localhost:8080/post/like_count/${postId}`);
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
      const response = await fetch(`http://localhost:8080/post/check_liked_or_not/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ _id: myUserId }),
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
  }, [liked, postId, myUserId])

  const handleShare = async () => {
    const info = {
      title: "See post on Instagram",
      url: "post/see/" + postId,
      text: "Here's a Good post I found on Instagram. It may inspire you to work hard on your goals."
    }

    try {
      await navigator.share(info);
      setNoOfShares(share => share + 1);

      const response = await fetch(`http://localhost:8080/post/shared/${postId}`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      }); 
      await response.json();

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
        <span>{likeCount}{" "}{likeCount<2 ? "like" : "likes"}</span>
        <span>{" • "}{allComments.length}{" "}{allComments.length<2 ? "comment" : "comments"}</span>
        <span>{" • "}{noOfShares}{" "}{noOfShares<2 ? "share" : "shares"}</span>
      </div>

      {(timeForReactBox && timeForReactBox !== " ") && <span className="text-[10px] font-extralight text-gray-800">&#12539;{timeForReactBox}</span>}

      <ReactionInfoBox showInfo={likedReaction} text="Couldn't liked/disliked." />
    </>
  )
}

export default PostReactBox