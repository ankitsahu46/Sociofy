/* eslint-disable react/prop-types */
import { CommentBox, PostReactBox, PostOwnerInfo, PostImg } from '..';
import { useState } from 'react';

function Post(props) {
  const { postImg, userImg, username, _id, shares, comments_all = [], likers = [], i, id } = props;
  const [likeCount, setLikeCount] = useState(likers.length);
  const [allComments, setAllComments] = useState(comments_all);

  const postReactBoxProps = {
    // liked,
    // setLiked,
    likeCount,
    setLikeCount,
    i,
    allComments,
    shares,
    postId: _id,
    id
  }
  const commentBoxProps = {
    allComments,
    setAllComments,
    postId: _id,
    i,
    id
  }

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          <PostImg postImg={postImg} />
          <PostOwnerInfo userImg={userImg} username={username} />
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