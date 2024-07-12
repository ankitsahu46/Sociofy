/* eslint-disable react/prop-types */

function PostImg({ postImg }) {
  return (
    <div className="w-full aspect-square flex justify-center items-center object-contain">
      <img src={postImg} alt="" className="shadow-2xl shadow-white max-w-full max-h-full" />
      

      {/* should be this */}
      {/* <div className="w-full aspect-square flex justify-center items-center ">
       <img src={postImg} alt="" className=" shadow-2xl shadow-white object-contain w-full h-full" />  */}


       {/* for multiple images */}
      {/* {
        <div className="snap-x snap-mandatory w-full  aspect-square flex overflow-x-scroll scroll-hidden rounded-2xl">
          <div className='snap-center snap-always min-w-full  flex justify-center items-center'>
            <img src={postImg} alt="" className="min-w-full object-cover  shadow-2xl shadow-white" />
          </div>
          <div className='snap-center snap-always min-w-full'>
            <img src={postImg} alt="" className="min-w-full aspect-square  shadow-2xl shadow-white" />
          </div>
          </div>
      } */}
    </div>
  )
}

export default PostImg