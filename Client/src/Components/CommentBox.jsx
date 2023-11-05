/* eslint-disable react/prop-types */

function CommentBox({ img }) {
  return (
    <div className="flex">
      <div className="w-12 h-12 mt-1">
        <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer">
          <img src={img} alt="" className="rounded-full" />
        </a>
      </div>
      <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-tl-[0px] ml-2">
        <div className="flex justify-between mb-2">
          <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer">
            <span className="text-sm font-medium">mister_2.0 (commenter)</span>
          </a>
          <span><img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer" /></span>
        </div>
        <div className="font-normal text-sm text-gray-600">
          This is dummy comment. We will replace it with the real comment when we will be working with the backend data. Thankyou!!!
        </div>
      </div>
    </div>
  )
}

export default CommentBox