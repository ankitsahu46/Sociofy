/* eslint-disable react/prop-types */

function Post({ postData }) {
  const img = postData.img;
  const username = postData.username;
  const posts = postData.posts;

  return (
    <div className="w-full mb-5">
      <div className="flex justify-between items-center px-4 mb-2">
        <div className="flex justify-center items-center cursor-pointer">
          <img src={img} alt="" className="w-8 h-8 rounded-full ring-2 border-white border-[1px]" />
          <div className="ml-2 text-sm font-medium">
            {username}
          </div>
        </div>
        <img src="src/assets/options.svg" alt="" className="rotate-90 cursor-pointer"/>
      </div>

      <div className="w-full aspect-square">
        {
          posts.map((post, i) => (
            <img key={i} src={post} alt="" className="w-full aspect-square rounded-lg" />
          ))
        }
      </div>

      <div className="flex justify-between px-3 mt-2">
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
      </div>
    </div>
  )
}

export default Post