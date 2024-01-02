/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { noImage } from "../assets";
import { SvgInfoBox } from "./";

function Nav({ setNav, nav, navInfo }) {
  const [img, navName, action] = navInfo
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof action !== 'function') {
      navigate(action);
      setNav(navName.toLowerCase())
    }
    else action();
  }

  return (
    <>
      <div onClick={handleClick} className="flex xl:justify-start xl:w-full rounded-2xl md:mb-3 transition-all xl:hover:bg-gray-200 select-none outline-none order-2 ">
        <div className="flex justify-start items-center w-full">
          <div className="rounded-full px-2 md:px-3 h-full aspect-square flex justify-center items-center mob:hover:bg-gray-300 md_x:hover:bg-gray-200 transition-all duration-300">
            <SvgInfoBox name={navName} position={"top-9 left-5"}>
              <img src={img ? img : noImage} alt="" className={`min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 lg:w-6 lg:h-6 ${navName == 'Profile' && 'rounded-full border'}`} />
            </SvgInfoBox>
          </div>
          <div className="hidden xl:block font-medium text-xl text-[#535355]">
            {navName}
          </div>
        </div>

        {/* blue strip to show active nav */}
        { nav === navName.toLowerCase() &&
          <div className="hidden md:flex items-center">
            <div className="w-1 h-6 rounded-full bg-[var(--blue)] opacity-75"></div>
          </div>
        }
      </div>
    </>
  )
}

export default Nav