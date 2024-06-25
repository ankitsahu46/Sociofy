/* eslint-disable react/prop-types */

// import { SvgInfoBox } from "..";

function PostReact({ svg, name, handleClick }) {
  return (
  <div onClick={handleClick} className="px-4 xs:px-6 h-10 bg-gray-100 rounded-full flex justify-center items-center cursor-pointer">
      {/* <SvgInfoBox name={name} position={"top-8 left-7"}> */}
        <img src={svg} alt={name}  />
      {/* </SvgInfoBox> */}
      <span className="ml-1 text-xs sm:text-sm md:text-xs lg:text-sm text-gray-600 font-medium select-none">{name}</span>
    </div>
  )
}

export default PostReact