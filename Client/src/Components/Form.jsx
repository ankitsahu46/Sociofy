/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { wave } from "../assets";

function Form({ name, handleClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  }
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  }

  return (
    <div className="w-full h-[100vh] llg:bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] lg:bg-gray-200 flex items-center justify-center">
      <div className="flex justify-center items-center w-[80%] sm:w-[65%] md:w-[50%] lg:w-[80%] rounded-2xl shadow-lg overflow-hidden bg-white">
        {/* Login form */}
        <div className="w-full lg:w-[50%] flex flex-col  items-center bg-white mx-auto rounded-2xl lg:rounded-l-2xl lg:rounded-r-none py-5  min-h-[75vh] relative overflow-hidden">
          <div className="text-2xl font-bold text-[var(--blue)] mt-6 border-b-[2px] border-[var(--blue)]">{name}</div>

          <form className="flex flex-col justify-center items-center mt-16 w-full max-w-[400px]">
            <input type="text" value={formData.email} onChange={(e) => handleEmailChange(e)} placeholder="Email" className="mb-8 border-b-[0.5px] focus:border-b-[2px] border-gray-300 focus:border-[var(--blue)]  outline-none w-[75%] md:w-[65%]"
            />
            <input type="password" value={formData.password} onChange={(e) => handlePasswordChange(e)} placeholder="Password" className="mb-8 border-b-[0.5px] focus:border-b-[2px] border-gray-300 focus:border-[var(--blue)] outline-none w-[75%] md:w-[65%]"
            />
            <button onClick={handleClick} className="w-[75%] md:w-[65%] py-1 rounded-2xl text-white font-medium bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] mt-6 mb-10  active:scale-105 transition-all">
              {name}
            </button>
          </form>

          <p className="mt-1 max-w-[80%]">
            <span className="text-sm">Don't have an account? </span>
            <span className="text-blue-700 font-medium text-sm cursor-pointer"><a href={name === "Sign Up" ? "/login" : "/signup"}>{name === "Sign Up" ? "Log In" : "Sign Up"}</a></span>
          </p>
        </div>

        {/* wave */}
        <div className="relative h-[100%] aspect-auto hidden lg:flex items-center scale-[7] ">
          <img src={wave} alt="" className="-rotate-90 w-[5rem]" />
        </div>

        {/* The other side of login page */}
        <div className="w-full lg:w-[50%] hidden lg:flex flex-col items-center justify-center  bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] mx-auto rounded-2xl lg:rounded-r-2xl lg:rounded-l-none py-5  min-h-[75vh] relative ">
          <div className="w-full h-full flex m-auto px-16 text-white text-lg font-medium">
            <p>
              Welcome to <span className="font-bold">SOCIOFY</span> - A social media platform, where you can connect with the world and create your memories.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form