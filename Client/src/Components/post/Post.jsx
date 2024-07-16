/* eslint-disable react/prop-types */
import { CommentBox, PostReactBox, PostOwnerInfo, PostImg } from '..';
import { useEffect, useRef, useState } from 'react';
import { getTimeForPost, getUserNameAndUserImg } from "../../utils";

function Post({post, lastPost}) {
  const { _id:postId, userId, username, postImg, userImg, likers=[], comments_all=[], shares, caption, datePosted } = post;
  const { timeForOwnerInfo, timeForReactBox } = getTimeForPost(datePosted);
  const [allComments, setAllComments] = useState(comments_all);
  const [userInfo, setUserInfo] = useState({});
  const ref = useRef(null);

  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const token = JSON.parse(localStorage.getItem('token'));

  const postOwnerInfoProps = {
    userId,
    username: userInfo.username || username,
    userImg: userInfo.img || userImg,
    timeForOwnerInfo,
    postId,
  }
  const postReactBoxProps = {
    likers,
    allComments,
    shares,
    postId,
    postImg,
    userId,
    timeForReactBox
  }
  const commentBoxProps = {
    allComments,
    setAllComments,
    postId,
    userId,
    postImg,
    caption,
    userImg: userInfo.img || userImg,
    username: userInfo.username || username,
  }

  useEffect(() => {
    console.log(userId, 'userId from post.jsx');
    getUserNameAndUserImg(userId, token, setUserInfo);
  }, [userId, token])
  

  useEffect(() => {
    let count = 0;
    let reference = ref.current;

    const postSeenByUser = async () => {
      const response = await fetch(`http://localhost:8080/post/post_seen_by_user/${postId}/${myUserId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      await response.json();
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const checkEndOfScroll = lastPost && (window.innerHeight + window.scrollY +30 > document.body.offsetHeight);

        if (entry.isIntersecting || !entry.isIntersecting || checkEndOfScroll) {
          count++;
        }
        if (count > 1) postSeenByUser();
      })
    );

    if (reference) observer.observe(reference);

    return () => {
      if (reference) observer.unobserve(reference);
    }
  }, [ref, lastPost, myUserId, postId, token]);

  return (
    <div ref={ref} className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          <PostImg postImg={postImg} />
          <PostOwnerInfo {...postOwnerInfoProps}/>
        </div>
        <div className="px-3">
          <PostReactBox {...postReactBoxProps} />
          <CommentBox {...commentBoxProps} />
        </div>
      </div>
    </div>
  )
}

export default Post