import { useEffect, useState } from "react";
import { Post, StoryDiv } from "../Components"

function Home() {
  const [postsData, setPostsData] = useState([]);

  const getData = async () => {
    try {
      let response = await fetch("http://localhost:8080");
      const result = await response.json();
      setPostsData(result);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='col-span-10 mdl:col-span-7 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden'>
      <div className="w-full flex flex-col items-center">
        <StoryDiv />
        <div className="w-full max-w-[500px]">
          {
            postsData.map((postData) => (
              <Post key={postData._id} {...postData} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Home