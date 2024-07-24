/* eslint-disable react/prop-types */
import { Loader, ProfilePost } from "..";

function ProfilePostSection({ posts = [], setPosts, userData, setUserData, postAvailability, myProfile }) {

  return (
    <div className="mt-5">
      <p className="font-semibold sm:text-lg md:text-xl  text-gray-600 ml-1 mb-1">
        Posts
      </p>
      <div
        className={`border-t-2 min-h-[300px] ${posts.length > 0 && "min-h-[600px]"
          }`}
      >
        {posts.length === 0 ? (
          <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">
            {postAvailability === "Loading..." ? <Loader /> : postAvailability}
          </div>
        ) : (
          <div className={`grid grid-cols-3 gap-1 mx-[0.25rem] bg-gray-100  [&>*]:border`}>
            {[...posts].reverse().map((post) => (
              <ProfilePost
                key={post._id}
                post={post}
                myProfile={myProfile}
                setPosts={setPosts}
                setUserData={setUserData}
                userData={userData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePostSection