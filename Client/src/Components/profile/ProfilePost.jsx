
/* eslint-disable react/prop-types */
import { useState } from "react";
import { LayoutModal, ProfilePostAndCommentSection } from "..";

function ProfilePost({ post }) {
  const { postImg } = post;
  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowPostModal(true)} className="flex justify-center items-center aspect-square border border-t-0" >
        <img src={postImg} alt="profile" className="max-w-full max-h-full object-cover" />
      </div>

      {
        showPostModal &&
        <LayoutModal hideModal={() => setShowPostModal(false)} maxWidth="w-[85%] max-w-[400px]  md:max-w-[45rem] lg:max-w-5xl xl:max-w-6xl">
          <ProfilePostAndCommentSection post={post} />
        </LayoutModal>
      }
    </>
  )
}

export default ProfilePost;