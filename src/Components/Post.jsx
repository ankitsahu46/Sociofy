/* eslint-disable react/prop-types */

function Post({ postData }) {
  const img = postData.img;
  const username = postData.username;
  const posts = postData.posts;

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl shadow-lg pb-3">
        <div className="bg-white rounded-2xl shadow-md">
          <div className="w-full aspect-square">
            {
              posts.map((post, i) => (
                <img key={i} src={post} alt="" className="w-full aspect-square rounded-2xl shadow-2xl shadow-white" />
              ))
            }
          </div>
          <div className="flex justify-between items-center px-4 mb-2 py-2">
            <div className="flex justify-center items-center cursor-pointer">
              <img src={img} alt="" className="w-8 h-8 rounded-full ring-2 border-white border-[1px]" />
              <div className="ml-2 text-sm font-medium">
                {username}
              </div>
            </div>
            <img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer" />
          </div>
        </div>

        <div className="px-3">
          <div className="flex justify-between py-1 pb-2">
            <div className="flex gap-2">
              {/* <img src="src/assets/notificationActive.svg" alt="" className="w-5 h-5"/> */}
              <img src="src/assets/notification.svg" alt="" className="w-6 h-6 cursor-pointer" />
              <img src="src/assets/comments.svg" alt="" className="w-6 h-6 cursor-pointer" />
              <img src="src/assets/share.svg" alt="" className="w-6 h-6 cursor-pointer" />
            </div>
            <div>
              {/* <img src="src/assets/notificationActive.svg" alt="" className="w-5 h-5"/> */}
              <img src="src/assets/save.svg" alt="" className="w-6 h-6 cursor-pointer" />
            </div>
            {/* <div className="flex justify-between cursor-pointer">
              <img src="src/assets/notificationActive.svg" alt="" className="w-5 h-5"/>
              <div className="px-8 py-1 bg-gray-100 rounded-full flex">
                <img src="src/assets/notification.svg" alt=""  />Like
              </div>
              <div className="px-8 py-1 bg-gray-100 rounded-full">
                <img src="src/assets/comments.svg" alt=""  />
              </div>
              <div className="px-8 py-1 bg-gray-100 rounded-full">
                <img src="src/assets/share.svg" alt=""  />
              </div>
            </div> */}
          </div>

          <div className="text-[10px] text-gray-500">
            <span>112 likes</span>
            <span className="before:content-['•'] ml-2">54 comments</span>
            <span className="before:content-['•'] ml-2">2 shares</span>
          </div>

          <div className="flex py-5 justify-center items-center">
            <div className="w-11 h-11">
              <a href="https://www.instagram.com/ankitsahu_78/" target="_blank" rel="noreferrer">
                <img src={img} alt="" className="rounded-full" />
              </a>
            </div>
            <textarea className="rounded-full bg-gray-100 text-sm text-gray-700 outline-[var(--blue)] px-3 ml-2 border-gray-300 border-[1px] md:w-1/2 w-full h-auto py-2" rows="1" placeholder="Add a comment..." ></textarea>
          </div>

          <div>
            <div className="flex">
              <div className="w-16 h-16 mt-1">
                <a href="https://www.instagram.com/ankitsahu_78/" target="_blank" rel="noreferrer">
                  <img src={img} alt="" className="rounded-full" />
                </a>
              </div>
              <div className="px-3 py-2 bg-gray-100 rounded-lg rounded-tl-[0px] ml-2">
                <div className="flex justify-between mb-2">
                  <a href="https://www.instagram.com/ankitsahu_78/" target="_blank" rel="noreferrer">
                    <span className="text-sm font-medium">mister_2.0 (commenter)</span>
                  </a>
                  <span><img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer" /></span>
                </div>
                <div className="font-normal text-gray-600">
                  This is dummy comment. We will replace it with the real comment when we will be working with the backend data. Thankyou!
                </div>
              </div>
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