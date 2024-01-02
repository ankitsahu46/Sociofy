/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

function ReactionInfo({ text }) {
  return (
    <div className='bg-gray-700 px-4 py-2 opacity-90 rounded-md absolute top-[75%] left-[45%]  transition-all flex justify-center items-center animate-fadeInFadeOut' >
      <span className="text-xs text-white">
        {text}
      </span>
    </div>
  )
}


function ReactionInfoBox({ showInfo, text }) {
  return (
    <>
      {
        showInfo &&
        <ReactionInfo text={text} />
      }
    </>
  )
}

export default ReactionInfoBox