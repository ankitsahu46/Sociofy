/* eslint-disable react/prop-types */
import { CommentBox, PostReactBox, PostOwnerInfo, PostImg } from './';
import { useEffect, useState } from 'react';

function Post(props) {
  const { postImg, userImg, username, _id, shares, commentsall = [], likers = [] } = props;
  const [liked, setLiked] = useState(false);
  const [allComments, setAllComments] = useState(commentsall);

  const postReactBoxProps = {
    liked,
    setLiked,
    likers,
    allComments,
    shares,
    postId: _id
  }
  const commentBoxProps = {
    allComments,
    setAllComments,
    postId: _id,
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
      await response.json();
    }
  }

  useEffect(() => {
    checkLikedOrNot();
  }, [])

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