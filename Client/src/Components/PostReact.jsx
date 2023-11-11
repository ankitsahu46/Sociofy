/* eslint-disable react/prop-types */

import { InfoBox } from "./";

function PostReact({ svg, name, handleClick }) {
  return (
    <div onClick={handleClick} className="px-4 xs:px-6 h-10 bg-gray-100 rounded-full flex justify-center items-center">
      <InfoBox name={name} position={"top-8 left-7"}>
        <img src={svg} alt={name} className="scale-90 xs:scale-100" />
      </InfoBox>
      <span className="ml-1 text-xs xs:text-sm text-gray-600 font-medium">{name}</span>
    </div>
  )
}

export default PostReact