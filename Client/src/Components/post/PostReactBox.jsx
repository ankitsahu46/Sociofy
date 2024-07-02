
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { notification, notificationActive, share, comment } from "../../assets";
import { PostReact, ReactionInfoBox } from "..";
import { likedDislikedThePost, sendNotification } from "../../utils";

function PostReactBox(props) {
  const { postId, userId, allComments = [], shares, likers = [], timeForReactBox } = props;
  const [liked, setLiked] = useState(false);
  const [likedReaction, setLikedReaction] = useState(false);
  const [noOfShares, setNoOfShares] = useState(shares);
  const [likeCount, setLikeCount] = useState(likers?.length);

  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));
  const myUserName = JSON.parse(localStorage.getItem('username'));


  const handleLikeBtn = async () => {
    const initiateLike = !liked;
    setLiked(initiateLike);

    try {
      const result = await likedDislikedThePost(postId, initiateLike, myUserId);
      if (result.success) {
        setLikeCount(result.likeCount);

        if (initiateLike && (myUserId !== userId)) {
          const title = "Sociofy";
          const body = `${myUserName} liked your post.`;

          await sendNotification(title, body, userId);
        }
      }
      else {
        throw new Error("Couldn't like the post.")
      }
    }
    catch (error) {
      setLiked(liked);
      setLikedReaction(true);

      setTimeout(() => {
        setLikedReaction(false);
      }, 3000);
    }
  }

  useEffect(() => {
    const checkLikedOrNot = async () => {
      try {
        const response = await fetch(`http://localhost:8080/post/check_liked_or_not/${postId}`, {
          method: "PUT",
          body: JSON.stringify({ _id: myUserId }),
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        } else {
          const result = await response.json();
          setLiked(result.liked)
        }
      }
      catch (error) {
        console.error("Error checking liked status:", error);
      }
    };
    checkLikedOrNot();
  }, [postId, myUserId])

  const handleShare = async () => {
    const info = {
      title: "See post on Instagram",
      url: `post/see/${postId}`,
      text: "Here's a Good post I found on Instagram. It may inspire you to work hard on your goals."
    }

    try {
      await navigator.share(info);
      setNoOfShares(share => share + 1);

      //increase the value of shares by 1
      await fetch(`http://localhost:8080/post/shared/${postId}`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
    }
    catch (error) {
      console.log("Couldn't share!", error);
    }
  }

  return (
    <>
      <div className="flex justify-between py-1 pb-2">
        <div className="flex justify-around cursor-pointer w-full">
          <PostReact svg={liked ? notificationActive : notification} name="Like" handleClick={handleLikeBtn} />
          <label htmlFor={`comment${postId}`}>
            <PostReact svg={comment} name="Comment" />
          </label>
          <PostReact svg={share} name="Share" handleClick={handleShare} />
        </div>
      </div>

      {/* Like, comment and share info */}
      <div className="text-[10px] text-gray-500 ml-1">
        <span>{likeCount} {likeCount < 2 ? "like" : "likes"}</span>
        <span> • {allComments.length} {allComments.length < 2 ? "comment" : "comments"}</span>
        <span> • {noOfShares} {noOfShares < 2 ? "share" : "shares"}</span>
      </div>

      {(timeForReactBox && timeForReactBox !== " ") && <span className="text-[10px] font-extralight text-gray-800">&#12539;{timeForReactBox}</span>}

      <ReactionInfoBox showInfo={likedReaction} text="Couldn't liked/disliked." />
    </>
  )
}

export default PostReactBox