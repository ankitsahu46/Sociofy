/* eslint-disable react/prop-types */
import { CommentBox, PostReactBox, PostOwnerInfo, PostImg, usePostSeenByUser } from '..';
import { useState, useEffect, useRef } from 'react';
import { getTimeForPost, getUserNameAndUserImg } from '../../utils';

function Post({ post }) {
  const { _id: postId, userId, username, postImg, userImg, likers = [], comments_all = [], shares, caption, datePosted } = post;
  const { timeForOwnerInfo, timeForReactBox } = getTimeForPost(datePosted);
  const [allComments, setAllComments] = useState(comments_all);
  const [userInfo, setUserInfo] = useState({});

  const ref = useRef(null);
  const token = JSON.parse(localStorage.getItem('token'));

  const postOwnerInfoProps = {
    userId,
    username: userInfo.username || username,
    userImg: userInfo.img || userImg,
    timeForOwnerInfo,
    postId,
  };
  const postReactBoxProps = {
    likers,
    allComments,
    shares,
    postId,
    postImg,
    userId,
    timeForReactBox,
  };
  const commentBoxProps = {
    allComments,
    setAllComments,
    postId,
    userId,
    postImg,
    caption,
    userImg: userInfo.img || userImg,
    username: userInfo.username || username,
  };

  useEffect(() => {
    getUserNameAndUserImg(userId, token, setUserInfo);
  }, [userId, token]);

  usePostSeenByUser(ref, postId);

  return (
    <div className="w-full mb-6 rounded-2xl border border-gray-50 border-t-gray-100">
      <div ref={ref} className="bg-white rounded-2xl  shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          <PostImg postImg={postImg} />
          <PostOwnerInfo {...postOwnerInfoProps} />
        </div>
        <div id='post-top' className="px-3">
          <PostReactBox {...postReactBoxProps} />
          <CommentBox {...commentBoxProps} />
        </div>
      </div>
    </div>
  );
}

export default Post;