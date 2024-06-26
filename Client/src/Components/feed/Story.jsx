/* eslint-disable react/prop-types */

function Story({ storyData }) {
  const { img, username } = storyData;

  return (
    <div>
      <div className="flex flex-col pl-2 items-center">
        <div className="w-16 h-16 border-2 border-[var(--blue)] flex justify-center items-center rounded-full ">
          <img src={img} alt="" className="w-14 h-14 rounded-full" />
        </div>
        <span className="text-[12px] max-w-[54px] overflow-x-hidden">{username}</span>
      </div>
    </div>
  )
}

export default Story