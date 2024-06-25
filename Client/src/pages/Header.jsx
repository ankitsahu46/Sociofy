/* eslint-disable react/prop-types */
import { SvgInfoBox, Nav, PostUploadModal, SearchModal, LogoutModal } from "../Components";
import {
  home,
  homeActive,
  search,
  post,
  notification,
  notificationActive,
  noImage,
  logo,
  logOutIcon,
} from "../assets";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNav } from "../features/nav/navSlice.js";

function Header() {
  const img = JSON.parse(localStorage.getItem('img'));
  let location = window.location.pathname.substring(1) || "home";

  const nav = useSelector((state) => state.nav.value);
  const dispatch = useDispatch();

  const [showPostModal, setShowPostModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  if (location !== nav) dispatch(setNav(location));
  const Home = nav === "home" ? homeActive : home;
  const Notification = nav === "notification" ? notificationActive : notification;

  const togglePostModal = () => setShowPostModal(!showPostModal);
  const toggleSearchModal = () => setShowSearchModal(!showSearchModal);
  const toggleLogoutModal = () => setShowLogoutModal(!showLogoutModal);

  return (
    <>
      <header className="fixed bottom-0 left-0 md:relative  md_x:max-w-[70px] xl:w-56 px-4 md:px-0 xl:px-4 md:py-4  w-full h-10 md:h-full md:min-h-[100vh] flex flex-col justify-center md:justify-between md:items-center xl:items-start order-2 md:order-1 bg-white border-r-[1px] border-t-2 md:border-t-0 md:border-l-2 border-gray-100">
        {/* Sociofy Logo and Name */}
        <div onClick={() => location.reload()} className="hidden md:flex justify-center  items-center xl:justify-start xl:pl-2">
          <a href="#" className="flex">
            <SvgInfoBox name="Sociofy" position={"left-8"}>
              <img src={logo} alt="logo" className="w-8 h-8" />
            </SvgInfoBox>
            <h1 className="hidden xl:block font-bold text-2xl pb-1 pl-2 ">
              <span className="bg-gradient-to-r from-[#60daf8] to-[#2c7b8f] text-transparent bg-clip-text">
                Sociofy
              </span>
            </h1>
          </a>
        </div>

        {/* navigation links */}
        <nav className=" flex md:flex-col  justify-around items-center md:justify-center xl:items-start md:[&>*:nth-child(3)]:order-1 w-full">
          {[
            [search, "Search", toggleSearchModal],
            [post, "Post", togglePostModal],
            [Home, "Home", "/"],
            [Notification, "Notification", "/"],
            [img ? img : noImage, "Profile", "/profile"],
          ].map((navInfo) => (
            <Nav key={navInfo[1]} navInfo={navInfo} />
          ))}
        </nav>

        {/* Logout */}
        <div
          onClick={toggleLogoutModal}
          className="hidden md:flex justify-center items-center xl:justify-start hover:bg-gray-200 transition-all rounded-lg h-12 xl:pl-3 w-full cursor-pointer"
        >
          <SvgInfoBox name="Logout" position={"-top-10"}>
            <img src={logOutIcon} alt="logo" className="w-5 h-5" />
          </SvgInfoBox>
          <span className="hidden xl:block font-medium text-lg text-[#494949] pl-2 select-none">
            Logout
          </span>
        </div>

        {/* Modal */}
        <div className="fixed">
          {showPostModal && <PostUploadModal setShowPostModal={setShowPostModal} />}
          {showSearchModal && <SearchModal setShowSearchModal={setShowSearchModal} />}
          {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
        </div>
      </header>
    </>
  );
}

export default Header;
