/* eslint-disable react/prop-types */
import { noimage } from "../assets"


function CommentBox({ commenterimg, commenterusername, comment, pending }) {
  return (
    <div className="flex pl-3 pr-3">
      <a href={`https://www.instagram.com/${commenterusername}/`} target="_blank" rel="noreferrer">
        <div className="w-8 h-8 mt-1">
          <img src={commenterimg ? commenterimg : noimage} alt="" className="rounded-full w-8 h-8" />
        </div>
      </a>

      <div className="w-full ml-2">
        <div className="px-3 pt-1 pb-2 bg-gray-100 rounded-lg rounded-tl-[0px] w-full">
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
        <div className={`ml-2 text-xs text-gray-600 animate-pulse ${pending === "failed" && "text-red-600"}`}>
          {pending === "pending" ? "posting..." : pending === "failed" ? "failed!" : ""}
        </div>
      </div>
    </div>
  )
}

export default CommentBox