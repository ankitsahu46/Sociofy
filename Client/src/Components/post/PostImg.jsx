/* eslint-disable react/prop-types */

function PostImg({ postImg }) {
  return (
    <div className="w-full aspect-square">
      {
        <div className="snap-x snap-mandatory w-full  aspect-square flex overflow-x-scroll scroll-hidden rounded-2xl">
          <div className='snap-center snap-always min-w-full  flex justify-center items-center'>
            <img src={postImg} alt="" className="min-w-full object-cover  shadow-2xl shadow-white" />
          </div>
          <div className='snap-center snap-always min-w-full'>
            <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
          </div>
        </div>
      }
    </div>
  )
}

export default PostImg