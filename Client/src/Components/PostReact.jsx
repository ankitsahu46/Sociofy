/* eslint-disable react/prop-types */

function PostReact({ svg, name, handleClick}) {
  return (
    <div onClick={handleClick} className="px-4 xs:px-6 h-10 bg-gray-100 rounded-full flex justify-center items-center">
      <img src={svg} alt={name} className="scale-90 xs:scale-100" />
      <span className="ml-1 text-xs xs:text-sm text-gray-600 font-medium">{name}</span>
    </div>
  )
}

export default PostReact