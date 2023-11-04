import { Post, StoryDiv } from "../Components"


function Home() {
  return (
    <section className='col-span-10 mdl:col-span-7 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden'>
      <div className="w-full flex flex-col items-center">
        <StoryDiv />
        <div className="w-full max-w-[500px]">
          {
            [
              {
                img: 'src/assets/profilePic.png',
                username: 'mister_2.0',
                posts: ["src/assets/profilePic.png"]
              },
              {
                img: 'src/assets/profilePic.png',
                username: 'mister_2.0',
                posts: ["src/assets/profilePic.png"]
              },
              {
                img: 'src/assets/profilePic.png',
                username: 'mister_2.0',
                posts: ["src/assets/profilePic.png"]
              },
              {
                img: 'src/assets/profilePic.png',
                username: 'mister_2.0',
                posts: ["src/assets/profilePic.png"]
              },
              {
                img: 'src/assets/profilePic.png',
                username: 'mister_2.0',
                posts: ["src/assets/profilePic.png"]
              },
            ]
              .map((postData, i) => (
                <Post key={i} postData={postData} />
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default Home