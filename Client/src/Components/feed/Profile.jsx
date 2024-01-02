/* eslint-disable react/prop-types */
import { ProfilePost } from '../';
import { noImage } from '../../assets';

function Profile({ data }) {
  const { img, username, name, bio, posts = [], postAvailability, myProfile } = data;

  return (
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <div className="w-[85%]">
        <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0">
          <div className="col-span-2 flex justify-center items-center aspect-square">
            <img src={img ? img : noImage} alt="profile" className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-cover border" />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-start pl-4">
            <div className="flex gap-7">
              <span className="md:text-lg font-semibold text-[var(--blue)]">{username}</span>
              {
                myProfile &&
                <button className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium text-xs sm:text-sm">Edit Profile</button>
              }
            </div>
            <span className="font-medium text-base md:text-lg mt-3">{name}</span>
            <pre className="text-sm md:text-base">{bio}</pre>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">Posts</p>
          <div className="border min-h-[300px]">
            {
              posts.length === 0 ?
                <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">{postAvailability}</div>
                :
                <div className="grid grid-cols-3 gap-1">
                  {
                    [...posts].reverse().map((post, i) => (
                      <ProfilePost key={post._id} post={post} profilePic={img} i={posts.length - i - 1} />
                    ))
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;


