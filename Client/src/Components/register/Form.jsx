/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { wave } from "../../assets";

export default function Form({ name, isSignUp = false, func }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: ""
  });
  const [isValidPassword, setIsValidPassword] = useState({
    eightCharacters: false,
    oneLower: false,
    oneUpper: false,
    oneNumber: false,
    oneSpecialCharacter: false,
  });
  const [isAvailable, setIsAvailable] = useState(null);
  const submitBtnRef = useRef(null);

  const { eightCharacters, oneLower, oneUpper, oneNumber, oneSpecialCharacter } = isValidPassword;
  const type = isSignUp ? "email" : "text";
  const placeholder = isSignUp ? "Email" : "Email or Username";
  const switchTo = isSignUp ? "Log In" : "Sign Up";

  let usernameUnderlineText = getUsernameUnderlineText(isAvailable);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleUsernameChange = async (e) => {
    handleChange(e);
    setIsAvailable("checking");
    const value = e.target.value;

    if (/\s/.test(value)) setIsAvailable("error");
    else if (value && value.trim().length > 0) {
      const response = await fetch(`http://localhost:8080/signup/check_username/${value}`);
      const result = await response.json();

      if (result.available) setIsAvailable(true);
      else setIsAvailable(false);
    }
  }

  const handlePasswordChange = async (e) => {
    handleChange(e);
    const value = e.target.value

    setIsValidPassword({
      eightCharacters: value.length >= 8,
      oneLower: /[a-z]/.test(value),
      oneUpper: /[A-Z]/.test(value),
      oneNumber: /\d/.test(value),
      oneSpecialCharacter: /[^a-zA-Z0-9]/.test(value)
    })
  }

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    submitBtnRef.current.disabled = true;

    if (isSignUp) {
      if (isAvailable !== true) {                              //|| formData.username.trim().length === 0
        alert("Please choose a valid username!");
        submitBtnRef.current.disabled = false;

        return false;
      }
      if (!eightCharacters || !oneLower || !oneUpper || !oneNumber || !oneSpecialCharacter) {
        alert("Please choose a valid password!");
        submitBtnRef.current.disabled = false;

        return false;
      }
    }
    func(formData, submitBtnRef);
  }

  return (
    <div className="w-full h-[100vh] llg:bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] lg:bg-gray-200 flex items-center justify-center">
      <div className="flex justify-center items-center w-[80%] sm:w-[65%] md:w-[50%] lg:w-[80%] rounded-2xl shadow-lg overflow-hidden h-[80vh] max-h-[90vh] bg-white">
        {/* Login/Sign-up form */}
        <div className="w-full lg:w-[50%] flex flex-col min-h-[75vh] items-center justify-center bg-white m-auto rounded-2xl lg:rounded-l-2xl lg:rounded-r-none py-5 z-10">
          <div className="text-2xl font-bold text-[var(--blue)] border-b-[2px] border-[var(--blue)]">{name}</div>

          <form onSubmit={(e) => handleSubmit(e, formData)} className="flex flex-col justify-center items-center mt-12 w-full max-w-[400px] gap-7">
            <Input type={type} name="email" value={formData.email} handleChange={handleChange} placeholder={placeholder} />
            {
              isSignUp &&
              <>
                <Input type="text" name="name" value={formData.name} handleChange={handleChange} placeholder="Name" />
                <Input type="text" name="username" value={formData.username} handleChange={handleUsernameChange} placeholder="Username" >
                  <p className="text-[9px] font-semibold w-[65%] absolute top-7">
                    {usernameUnderlineText}
                  </p>
                </Input>
              </>
            }
            <Input type="text" name="password" value={formData.password} handleChange={handlePasswordChange} placeholder="Password" >
              {
                formData.password.length > 0 &&
                <p className="flex flex-col text-[9px] text-red-600 font-semibold">
                  <span>{!oneLower && "password must contain at least 1 lowercase character."}</span>
                  <span>{!eightCharacters && "password must contain at least 8 characters."}</span>
                  <span>{!oneUpper && "password must contain at least 1 uppercase character."}</span>
                  <span>{!oneNumber && "password must contain at least 1 number."}</span>
                  <span>{!oneSpecialCharacter && "password must contain at least 1 special character."}</span>
                </p>
              }
            </Input>
            <button ref={submitBtnRef} type="submit" className="w-[65%] py-1 rounded-2xl text-white font-medium bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] mt-4 mb-6  active:scale-105 transition-all">
              {name}
            </button>
          </form>

          <div className="flex items-center mt-2">
            <p className="text-sm mr-2">Don't have an account? </p>
            <a href={isSignUp ? "/login" : "/signup"} rel="noreferrer"><span className="text-blue-700 font-medium text-md cursor-pointer">{switchTo}</span></a>
          </div>
        </div>

        <Wave />
        <WelcomeText />
      </div>
    </div>
  )
}
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
const Input = ({ type, name, value, handleChange, placeholder, children }) => {
  return (
    <>
      <div className="w-[65%] relative">
        <input type={type} name={name} value={value} onChange={(e) => handleChange(e)} placeholder={placeholder} required className="border-b-[0.5px] focus:border-b-[2px] border-gray-300 focus:border-[var(--blue)] outline-none w-full"
        />
        {children}
      </div>
    </>
  )
}

const getUsernameUnderlineText = (isAvailable) => {
  if (isAvailable === "checking") return (<span className="text-yellow-600">checking...</span>);
  else if (isAvailable === "error") return (<span className="text-red-600">Username can not contain spaces!</span>);
  else if (isAvailable === true) return (<span className="text-green-500">Available.</span>);
  else if (isAvailable === false) return (<span className="text-red-600">Not Available!</span>);
}

const Wave = () => {
  return (
    <div className="relative h-[100%] aspect-auto hidden lg:flex items-center scale-[7]">
      <img src={wave} alt="" className="-rotate-90 w-[5rem]" />
    </div>
  )
}

const WelcomeText = () => {
  return (
    <div className="w-full min-h-[85vh] lg:w-[50%] hidden lg:flex flex-col items-center justify-center  bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] mx-auto rounded-2xl lg:rounded-r-2xl lg:rounded-l-none py-5">
      <div className="w-full h-full flex mx-auto px-16 text-white text-lg font-medium">
        <p>
          Welcome to <span className="font-bold">SOCIOFY</span> - A social media platform, where you can connect with the world and create your memories.
        </p>
      </div>
    </div>
  )
}