/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { PostImg, PostOwnerInfo, PostReactBox, AddComment, CommentSection } from "..";
import { getTimeForPost } from "../../utils";
import { noImage } from "../../assets";

function ProfilePostAndCommentSection({ post, setPosts='', userData, setUserData='' }) {
  const { postImg, username, _id: postId, userId, userImg, shares, likers = [], caption, datePosted } = post;
  let { comments_all } = post;
  const commentState = ["pending", "notPending", "failed", "deleting"];
  const [pendingComment, setPendingComment] = useState(commentState[1]);
  const [allComments, setAllComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const cmt = useRef("");

  const { timeForOwnerInfo, timeForReactBox } = getTimeForPost(datePosted);
  const addCommentProps = {
    cmt,
    setShowComment,
    setPendingComment,
    setAllComments,
    commentState,
    postId,
    userId,
    postImg
  }
  const commentSectionProps = {
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId,
    userId,
    userImg: userData?.img || userImg || noImage, 
    username, 
    caption,
  }
  const postOwnerInfoProps = {
    userId,
    username,
    userImg: userData?.img || userImg || noImage,
    timeForOwnerInfo,
    postId,
    setPosts,
    setUserData,
  }
  const postReactBoxProps = {
    likers,
    allComments,
    shares,
    postId,
    userId,
    timeForReactBox,
  }

  useEffect(() => {
    setAllComments(comments_all);
  }, [comments_all]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-white rounded-2xl shadow-md md:w-[350px] lg:w-[80vh] xl:w-[90vh] aspect-square flex justify-center items-center">
        <PostImg postImg={postImg} />
      </div>
      <div className="flex flex-col items-center md:w-[calc(100%-350px)] lg:w-[calc(100%-80vh)] xl:w-[calc(100%-90vh)] md:max-h-[75vh] lg:max-h-[85vh] xl:max-h-[90vh] py-2 px-4 ">
        <div className="flex flex-col w-full h-full">
          <div className="h-16">
            <PostOwnerInfo {...postOwnerInfoProps} />
          </div>
          <hr />
          <div className="flex flex-col-reverse md:flex-col h-[calc(100%-4rem)] mob:max-h-[350px]">
            <div className={`px-2 mb-3 flex-grow ${allComments?.length !== 0 && 'overflow-y-scroll custom-scroll-bar'}`}>
              <CommentSection {...commentSectionProps} />
            </div>
            <div className="w-full">
              <PostReactBox {...postReactBoxProps} />
              <AddComment {...addCommentProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePostAndCommentSection