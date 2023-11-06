/* eslint-disable react/prop-types */

function CommentBox({ commenterimg, commenterusername, comment }) {
  return (
    <div className="flex">
      <a href={`https://www.instagram.com/${commenterusername}/`} target="_blank" rel="noreferrer">
        <div className="w-8 h-8 mt-1">
          <img src={commenterimg} alt="" className="rounded-full w-8 h-8" />
        </div>
      </a>
      <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-tl-[0px] ml-2 w-full">
        <div className="flex justify-between mb-2">
          <a href={`https://www.instagram.com/${commenterusername}/`} target="_blank" rel="noreferrer">
            <span className="text-sm font-medium">{commenterusername}</span>
          </a>
          <span><img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer" /></span>
        </div>
        <div className="font-normal text-sm text-gray-600">
          {comment}
        </div>
      </div>
    </div>
  )
}

export default CommentBox