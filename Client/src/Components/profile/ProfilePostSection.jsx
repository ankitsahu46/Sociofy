/* eslint-disable react/prop-types */
import { ProfilePost } from "..";

function ProfilePostSection({ posts = [], postAvailability }) {

  return (
    <div className="mt-5">
      <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">
        Posts
      </p>
      <div
        className={`border min-h-[300px] ${posts.length > 0 && "min-h-[600px]"
          }`}
      >
        {posts.length === 0 ? (
          <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">
            {postAvailability}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
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