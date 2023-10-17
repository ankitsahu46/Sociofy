import Nav from "./Nav"

function Header() {
  return (
    <>
      <header className='fixed bottom-0 left-0 md:relative md:col-span-1 xl:col-span-2 md_x:max-w-[70px] px-4 md:px-0 xl:px-4 md:py-4  w-full md:h-full md:min-h-[100vh] h-[3.25rem] flex flex-col justify-between md:items-center xl:items-start order-2 md:order-1 border '>
        <div className="hidden md:flex justify-center  items-center xl:justify-start xl:pl-2">
          <img src="src/assets/sociofyLogo.png" alt="logo" className="w-8 h-8" />
          <h1 className="hidden xl:block font-bold text-2xl pb-1 pl-2 "><span className="bg-gradient-to-r from-[#60daf8] to-[#2c7b8f] text-transparent bg-clip-text">Sociofy</span></h1>
        </div>

        <nav className="h-12 md:h-full xl:h-10 flex md:flex-col  justify-between md:justify-center xl:items-start">
          {
            [
              ['src/assets/sociofyLogo.png', 'Search', '#'],
              ['src/assets/sociofyLogo.png', 'Post', '#'],
              ['src/assets/sociofyLogo.png', 'Home', '#'],
              ['src/assets/sociofyLogo.png', 'Notification', '#'],
              ['src/assets/sociofyLogo.png', 'Profile', '#'],
            ]
              .map(([img, navName, navigateTo]) => (
                <Nav key={navName} img={img} navName={navName} navigateTo={navigateTo} />
              ))
          }
        </nav>

        <div className="hidden md:flex justify-center items-center xl:justify-start hover:bg-gray-100 transition-all rounded-lg h-12 xl:pl-3">
          <img src="src/assets/sociofyLogo.png" alt="logo" className="w-5 h-5" />
          <span className="hidden xl:block font-medium text-lg text-[#494949] pl-2">More</span>
        </div>
      </header>
    </>
  )
}

export default Header