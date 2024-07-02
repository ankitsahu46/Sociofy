/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { LayoutModal, PostImg, PostOwnerInfo, PostReactBox, AddComment, CommentSection } from "..";
import { getTimeForPost } from "../../utils";

function ProfilePost({ post, profilePic }) {
  const { postImg, username, _id:postId, userId, shares, comments_all = [], likers = [], datePosted } = post;
  const { timeForOwnerInfo, timeForReactBox } = getTimeForPost(datePosted);

  const [showPostModal, setShowPostModal] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const cmt = useRef("");

  const commentState = ["pending", "notPending", "failed", "deleting"];
  const [allComments, setAllComments] = useState(comments_all);
  const [pendingComment, setPendingComment] = useState(commentState[1]);

  const addCommentProps = {
    cmt,
    setShowComment,
    setPendingComment,
    setAllComments,
    commentState,
    postId,
  }
  const commentSectionProps = {
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId,
  }
  const postOwnerInfoProps = {
    username,
    userImg: profilePic,
    timeForOwnerInfo,
  }
  const postReactBoxProps = {
    likers,
    allComments,
    shares,
    postId,
    userId,
    timeForReactBox,
  }

  return (
    <>
      <div className="flex justify-center items-center aspect-square border" onClick={() => setShowPostModal(true)}>
        <img src={postImg} alt="profile" className="max-w-full max-h-full object-cover" />
      </div>

      {/* Profile PostModal */}
      {
        showPostModal &&
        <LayoutModal hideModal={() => setShowPostModal(false)} maxWidth="w-[85%] max-w-[400px]  md:max-w-[45rem] lg:max-w-5xl xl:max-w-6xl">
          <div className="flex flex-col md:flex-row">
            <div className="bg-white rounded-2xl shadow-md md:w-[350px] lg:w-[80vh] xl:w-[90vh] aspect-square flex justify-center items-center">
              <PostImg postImg={post.postImg} />
            </div>
            <div className="flex flex-col items-center md:w-[calc(100%-350px)] lg:w-[calc(100%-80vh)] xl:w-[calc(100%-90vh)] md:max-h-[75vh] lg:max-h-[85vh] xl:max-h-[90vh] py-2 px-4 ">
              <div className="flex flex-col w-full h-full">
                <div className="h-16">
                  <PostOwnerInfo {...postOwnerInfoProps}/>
                </div>
                <hr />
                <div className="flex flex-col-reverse md:flex-col h-[calc(100%-4rem)] mob:max-h-[350px]">
                  <div className="px-2 overflow-y-scroll custom-scroll-bar mb-3 flex-grow">
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
        </LayoutModal>
      }
    </>
  )
}

export default ProfilePost;