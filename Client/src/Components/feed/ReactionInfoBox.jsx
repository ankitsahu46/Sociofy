/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { useEffect } from "react"

function ReactionInfo({ text }) {
  return (
    <div className='bg-gray-700 px-4 py-2 opacity-90 rounded-md absolute top-[75%] left-[45%]  transition-all flex justify-center items-center animate-fadeInFadeOut z-50' >
      <span className="text-xs text-white">
        {text}
      </span>
    </div>
  )
}


function ReactionInfoBox({ showInfo, setShowInfo, text }) {
  useEffect(() => {
    if (showInfo) {
      setTimeout(() => setShowInfo(false), 3000);
    }
  }, [showInfo, setShowInfo]);
  
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