/* eslint-disable react/prop-types */
import { useState } from "react";

function SvgInfoBox({ name, position, children }) {
  const [appear, setAppear] = useState(false);
  var timeout;

  const handleMouseOver = () => {
    timeout = setTimeout(() => setAppear(true), 500);
    setTimeout(() => setAppear(false), 4000);
  }
  const handleMouseOut = () => {
    if (timeout) clearTimeout(timeout);
    setAppear(false)
  }

  return (
    <div>
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {children}
      </div>
      <div className="relative">
        <div className={`bg-gray-700 text-white inline-block px-2 py-1 rounded-md border border-white ring-1 ring-black text-xs ${position} absolute  ${appear ? "block" : "hidden"} transition-all`} >
          {name}
        </div>
      </div>
    </div>
  )
}

export default SvgInfoBox