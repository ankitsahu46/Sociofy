

/* eslint-disable react/prop-types */
import { useState } from "react";
import { LayoutModal, ProfilePostAndCommentSection, ReactionInfoBox, SvgInfoBox } from "..";
import { deleteIcon } from "../../assets";
import { handlePostDelete } from "../../utils";

function ProfilePost({ post, setPosts, userData, setUserData, myProfile }) {
  const { postImg } = post;
  const [showPostModal, setShowPostModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [deleteState, setDeleteState] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    handlePostDelete(post._id, setDeleteState, setPosts, setUserData, setShowInfo);
  }
  const profilePostAndCommentSectionProps = {
    post, setPosts, userData, setUserData
  }

  return (
    <>
      <div onClick={() => setShowPostModal(true)} className="bg-white flex justify-center items-center w-full aspect-square cursor-pointer border">
        {/* Hover effect for postImg */}
        <div className=" group w-full h-full flex justify-center items-center border relative">
          {(myProfile) &&
            <div className="absolute top-0 right-0 bg-transparent w-full h-full hover:bg-black hover:bg-opacity-40 transition-colors duration-300 ">
              <div className="flex justify-end">
                <div className="w-10 aspect-square flex justify-center items-center">
                  <SvgInfoBox name='Delete' position={"right-3 top-2"}>
                    <div onClick={handleDelete} className="hidden group-hover:block rounded-full m-1 p-2 bg-gray-200 cursor-pointer">
                      <img src={deleteIcon} alt="" className="w-3 sm:w-5 aspect-square" />
                    </div>
                  </SvgInfoBox>
                </div>
              </div>
            </div>
          }

          {/* postImg */}
          <img src={postImg} alt="profile" className=" max-w-full max-h-full object-cover" />
        </div>
      </div>

      {
        showPostModal &&
        <LayoutModal hideModal={() => setShowPostModal(false)} maxWidth="w-[85%] max-w-[400px]  md:max-w-[45rem] lg:max-w-5xl xl:max-w-6xl" LayoutModalFor='Post'>
          <ProfilePostAndCommentSection {...profilePostAndCommentSectionProps} />
        </LayoutModal>
      }

      <ReactionInfoBox showInfo={showInfo} setShowInfo={setShowInfo} text="Couldn't delete post." />
    </>
  )
}

export default ProfilePost;