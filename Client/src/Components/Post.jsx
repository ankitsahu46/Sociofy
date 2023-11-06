/* eslint-disable react/prop-types */
import { CommentBox, PostReact } from './';
import { profilePic } from '../assets';

function Post({ postImg, userImg, username, _id, likes, comments, shares, commentsall}) {
  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Post(s) */}
          <div className="w-full aspect-square">
            {
              <div className="snap-x snap-mandatory w-full aspect-square flex overflow-x-scroll scroll-hidden rounded-xl">
                {/* posts.map((post, i) => ( */}
                <div className='snap-center snap-always min-w-full'>
                  <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
                </div>
                <div className='snap-center snap-always min-w-full'>
                  <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
                </div>
              </div>
            }
          </div>

          {/* Username and other options */}
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
            <img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer" />
          </div>
        </div>

        <div className="px-3">
          {/* Like, Comment and Share */}
          <div className="flex justify-between py-1 pb-2">
            <div className="flex justify-around cursor-pointer w-full">
              <PostReact svg="src/assets/notification.svg" name="Like" />
              <label htmlFor={`comment${_id}`}>
                <PostReact svg="src/assets/comments.svg" name="Comment" />
              </label>
              <PostReact svg="src/assets/share.svg" name="Share" />
            </div>
          </div>

          {/* Like, comment and share info */}
          <div className="text-[10px] text-gray-500">
            <span>{likes} likes</span>
            <span className="before:content-['•'] ml-2">{comments} comments</span>
            <span className="before:content-['•'] ml-2">{shares} shares</span>
          </div>

          {/* Add a comment */}
          <div className="flex py-5 items-center w-full">
            <div className="w-11 h-11">
              <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer">
                <img src={profilePic} alt="" className="rounded-full" />
              </a>
            </div>
            <textarea id={`comment${_id}`} className="rounded-full bg-gray-100 text-sm text-gray-700 outline-[var(--blue)] px-3 ml-2 border-gray-300 border-[1px] w-full h-auto py-2" rows="1" placeholder="Add a comment..." ></textarea>
          </div>

          {/* Comment Box */}
          <div>
            <div className='flex flex-col gap-3'>
              {
                commentsall.map((commenter) => (
                  <CommentBox key={commenter.commenterimg} {...commenter} />
                ))
              }
            </div>
            <div className="text-sm mt-2 text-gray-500 font-medium">
              Load more comments
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post