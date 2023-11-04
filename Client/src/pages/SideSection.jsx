import { profilePic } from '../assets'

function SideSection() {
  const username = "mister_2.0";
  const userName = "Ankit Sahu";
  const totalPost = "12";
  const followers = "932";
  const following = "132";

  return (
    <aside className='hidden mdl:block mdl:col-span-3 h-[calc(100vh-2.5rem)] mdl:h-[100vh] px-5 py-5 border-l-[1px]'>
      <div className='flex flex-col justify-center items-center pt-5'>
        <div className='w-36 h-36 rounded-full border-4 border-blue-500 flex justify-center items-center cursor-pointer' >
          <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer">
            <img src={profilePic} alt="" className='w-32 h-32 rounded-full' />
          </a>
        </div>
        <span className='mt-2 font-medium text-sm cursor-pointer'>{username}</span>
        <span className='font-medium text-lg text-blue-600 cursor-pointer'>{userName}</span>
      </div>

      <div className='flex [&>*]:flex-1 mt-8 font-medium [&>*:not(:first-child)]:cursor-pointer'>
        {
          [
            ["Posts", totalPost],
            ["Followers", followers],
            ["Following", following],
          ]
            .map(([name, value]) => (
              <div key={name} className='flex flex-col justify-center items-center'>
                <span>{name}</span>
                <span className='font-bold text-lg text-blue-600'>{value}</span>
              </div>
            ))
        }
      </div>
      <div className='flex justify-center items-center mt-10'>
        <a href="https://www.instagram.com/mister_2.0/" target="_blank" rel="noreferrer" className='bg-blue-700 rounded-lg text-white px-4 py-1 flex items-center'>View Profile
          <span><img src="src/assets/arrow.svg" className='w-4 h-4 invert rotate-45 scale-110 ml-1' /></span>
        </a>
      </div>
    </aside>)
}

export default SideSection