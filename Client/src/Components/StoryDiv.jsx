import { profilePic } from "../assets"
import { Story } from "./"

function StoryDiv() {
  return (
    <div className="w-full max-w-[600px] mb-3 py-3 bg-white">
          <div className="flex max-w-full overflow-x-scroll scroll-hidden">

          {
            [
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
              {
                img: profilePic,
                username: "mister_2.0"
              },
            ]
            .map((storyData, i) => (
              <Story key={i} storyData={storyData} />
              ))
            }
            </div>
        </div>
  )
}

export default StoryDiv