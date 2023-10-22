/* eslint-disable react/prop-types */

function Nav({handleClick, ...navInfo}) {
  const img = navInfo[0]
  const navName = navInfo[1]
  const navigateTo = navInfo[2]
  return (
    <>
      <a href={navigateTo} className="flex xl:justify-start xl:w-full rounded-2xl md:mb-3 transition-all xl:hover:bg-gray-200 select-none outline-none order-2">
        <div onClick={() => handleClick(navName.toLowerCase())} className="flex justify-center items-center rounded-lg">
          <div className="rounded-full px-2 md:px-3 h-full aspect-square flex justify-center items-center mob:hover:bg-gray-300 md_x:hover:bg-gray-200 transition-all duration-300">
            <img src={img} alt="" className={`min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 lg:w-6 lg:h-6 ${navName=='Profile' && 'rounded-full'}`} />
            {/* {img} */}
          </div>
          <div className="hidden xl:block font-medium text-xl text-[#535355]">
            {navName}
          </div>
        </div>
      </a>
    </>
  )
}

export default Nav