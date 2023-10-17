/* eslint-disable react/prop-types */

function Nav({ img, navName, navigateTo }) {
  return (
    <>
      <a href={navigateTo} className="flex xl:justify-start xl:w-full rounded-2xl md:mb-3 xl:pl-2  transition-all xl:hover:bg-gray-200 select-none outline-none">
        <div className="flex justify-center items-center rounded-lg">
          <div className="rounded-full px-3 h-full aspect-square flex justify-center items-center active:bg-gray-200 xl:hover:bg-white transition-all duration-300">
            <img src={img} alt="" className="min-w-[1.25rem] min-h-[1.25rem] w-5 h-5 lg:w-7 lg:h-7" />
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