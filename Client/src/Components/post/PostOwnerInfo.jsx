/* eslint-disable react/prop-types */
import { noImage, options } from "../../assets";
import { SvgInfoBox } from "..";

function PostOwnerInfo(props) {
  const { userImg, username, timeForOwnerInfo } = props;
  
  return (
    <div className="flex justify-between items-center px-4 mb-2 py-2">
      <div className="cursor-pointer flex justify-center items-center">
        <a href={`http://localhost:5173/profile/see?username=${username}`} rel="noreferrer" className="flex justify-center items-center mr-1">
          <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
            <img src={userImg ? userImg : noImage} alt="" className="w-8 h-8 rounded-full" />
          </div>
          <div className="ml-2 text-sm font-medium">
            {username}
          </div>
        </a>
      { timeForOwnerInfo && <span className="text-xs font-extralight">&#12539;{timeForOwnerInfo}</span>}
      </div>
      <SvgInfoBox name="Options" position={"top-5 -left-16"}>
        <img src={options} alt="" className="rotate-90 cursor-pointer" />
      </SvgInfoBox>
    </div>
  )
}

export default PostOwnerInfo