/* eslint-disable react/prop-types */
import { ProfilePost } from "..";

function ProfilePostSection({ posts = [], postAvailability }) {

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
            {postAvailability}
          </div>
        ) : (
          <div className={`grid grid-cols-3 gap-1 px-[0.25rem] bg-gray-100 [&>*]:border [&>:nth-child(1)]:border-t-0 [&>:nth-child(2)]:border-t-0 [&>:nth-child(3)]:border-t-0 `}>
            {[...posts].reverse().map((post) => (
              <ProfilePost
                key={post._id}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePostSection