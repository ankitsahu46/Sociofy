/* eslint-disable react/prop-types */
import { useState } from "react";
import { noImage, deleteIcon } from "../../assets";
import { InfoBox } from "..";

function Comment({ _id, commenter_img, commenter_username, comment, pending, handleDelete }) {
  const [deletePending, setDeletePending] = useState(false);

  const handleClick = (id) => {
    handleDelete(id);
    setDeletePending(true);
  }

  return (
    <div className="flex pl-3 pr-3">
      <a href={`https://www.instagram.com/${commenter_username}/`} target="_blank" rel="noreferrer">
        <div className="w-8 h-8 mt-1">
          <img src={commenter_img ? commenter_img : noImage} alt="" className="rounded-full w-7 h-7" />
        </div>
      </a>

      <div className="w-full ml-1">
        <div className="px-3 pt-1 pb-2 bg-gray-200 rounded-lg rounded-tl-[0px] w-full">
          <div className="flex justify-between items-center mb-1">
            <a href={`https://www.instagram.com/${commenter_username}/`} target="_blank" rel="noreferrer">
              <span className="text-sm font-medium">{commenter_username}</span>
            </a>
            <InfoBox name="Delete" position="top-2 -left-16">
              <span onClick={() => handleClick(_id)}><img src={deleteIcon} alt="" className="cursor-pointer w-3 h-3 opacity-50" /></span>
            </InfoBox>
          </div>
          <div className="font-normal text-sm text-gray-600">
            {comment}
          </div>
        </div>
        <div className={`ml-2 text-xs text-gray-600 animate-pulse ${pending === "failed" && "text-red-600"}`}>
          {pending === "pending" ? "posting..." : pending === "failed" ? "failed!" : ""}
          {deletePending && "deleting..."}
        </div>
      </div>
    </div>
  )
}

export default Comment