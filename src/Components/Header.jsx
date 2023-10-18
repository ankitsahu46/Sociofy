import { Nav } from "./"
import { home, homeActive, search, searchActive, post, postActive, notification, notificationActive, profilePic, logo, more, moreActive } from '../assets'
import { useState } from "react";

function Header() {
  const [nav, setNav] = useState('home');

  const Search =  nav === 'search' ? searchActive : search;
  const Home =  nav === 'home' ? homeActive : home;
  const Post =  nav === 'post' ? postActive : post;
  const Notification =  nav === 'notification' ? notificationActive : notification;
  const More =  nav === 'more' ? moreActive : more;

  console.log(Search, Home, Notification, Post);
  const handleClick = (navName) => {
    setNav(navName)
  }
  return (
    <>
      <header className='fixed bottom-0 left-0 md:relative md:col-span-1 xl:col-span-2 md_x:max-w-[70px] px-4 md:px-0 xl:px-4 md:py-4  w-full h-10 md:h-full md:min-h-[100vh] flex flex-col justify-center md:justify-between md:items-center xl:items-start order-2 md:order-1 border'>

        {/* Sociofy Logo and Name */}
        <div className="hidden md:flex justify-center  items-center xl:justify-start xl:pl-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="hidden xl:block font-bold text-2xl pb-1 pl-2 "><span className="bg-gradient-to-r from-[#60daf8] to-[#2c7b8f] text-transparent bg-clip-text">Sociofy</span></h1>
        </div>

        <nav className=" flex md:flex-col  justify-between items-center md:justify-center xl:items-start md:[&>*:nth-child(3)]:order-1  w-full">
          {
            [
              [Search, 'Search', '#'],
              [Post, 'Post', '#'],
              [Home, 'Home', '#'],
              [Notification, 'Notification', '#'],
              [profilePic, 'Profile', '#'],
            ]
              .map((navInfo) => (
                <Nav key={navInfo[1]} handleClick={handleClick} {...navInfo}/>
              ))
          }
        </nav>

        {/* More options */}
        <div onClick={() => {handleClick('more')}} className="hidden md:flex justify-center items-center xl:justify-start hover:bg-gray-200 transition-all rounded-lg h-12 xl:pl-3 w-full cursor-pointer">
          <img src={More} alt="logo" className="w-5 h-5" />
          <span className="hidden xl:block font-medium text-lg text-[#494949] pl-2">More</span>
        </div>
      </header>
    </>
  )
}

export default Header