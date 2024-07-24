
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

export default WelcomeText;