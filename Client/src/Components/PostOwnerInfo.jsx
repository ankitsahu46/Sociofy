/* eslint-disable react/prop-types */
import { options } from "../assets";
import { InfoBox } from "./";

function PostOwnerInfo({ userImg, username }) {
  return (
    <div className="flex justify-between items-center px-4 mb-2 py-2">
      <div className="cursor-pointer">
        <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer" className="flex justify-center items-center">
          <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
            <img src={userImg} alt="" className="w-8 h-8 rounded-full" />
          </div>
          <div className="ml-2 text-sm font-medium">
            {username}
          </div>
        </a>
      </div>
      <InfoBox name="Options" position={"top-5 -left-16"}>
        <img src={options} alt="" className="rotate-90 cursor-pointer" />
      </InfoBox>
    </div>
  )
}

export default PostOwnerInfo