/* eslint-disable react/prop-types */
import { CommentBox, PostReact } from './'

function Post({ postData }) {
  const img = postData.img;
  const username = postData.username;
  const posts = postData.posts;

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          {/* Post(s) */}
          <div className="w-full aspect-square">
            {
              posts.map((post, i) => (
                <img key={i} src={post} alt="" className="w-full aspect-square rounded-2xl shadow-2xl shadow-white" />
              ))
            }
          </div>
          {/* Username and other options */}
          <div className="flex justify-between items-center px-4 mb-2 py-2">
            <div className="cursor-pointer">
              <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer" className="flex justify-center items-center">
                {/* <img src={img} alt="" className="w-8 h-8 rounded-full ring-2 border-white border-[1px]" /> */}
                <div className="w-9 h-9 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full ">
                  <img src={img} alt="" className="w-8 h-8 rounded-full" />
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
              <PostReact svg="src/assets/comments.svg" name="Comment" />
              <PostReact svg="src/assets/share.svg" name="Share" />
            </div>
          </div>

          {/* Like, comment and share info */}
          <div className="text-[10px] text-gray-500">
            <span>112 likes</span>
            <span className="before:content-['•'] ml-2">54 comments</span>
            <span className="before:content-['•'] ml-2">2 shares</span>
          </div>

          {/* Add a comment */}
          <div className="flex py-5 items-center w-full">
            <div className="w-11 h-11">
              <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer">
                <img src={img} alt="" className="rounded-full" />
              </a>
            </div>
            <textarea className="rounded-full bg-gray-100 text-sm text-gray-700 outline-[var(--blue)] px-3 ml-2 border-gray-300 border-[1px] w-full h-auto py-2" rows="1" placeholder="Add a comment..." ></textarea>
          </div>

          {/* Comment Box */}
          <div>
            <CommentBox img={img} />
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