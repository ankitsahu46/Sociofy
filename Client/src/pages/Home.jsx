
import { useEffect, useMemo, useState } from "react";
import { Loading, Post, StoryDiv } from "../Components";
import { getPostsForHome } from "../utils";

function Home() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postAvailability, setPostAvailability] = useState("Loading...");
  const [isShowingRecent, setIsShowingRecent] = useState(false);
  //to get the following only when the value of following is changed
  const wordFollowing = 'following';
  const getFollowing = (word) => {
    return JSON.parse(localStorage.getItem(word));
  }
  const following = useMemo(() => getFollowing(wordFollowing), [wordFollowing]);
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = JSON.parse(localStorage.getItem('user_id'));

  useEffect(() => {
    getPostsForHome(token, following, userId, setPostsData, setPostAvailability, setLoading, setIsShowingRecent);
  }, [token, following, userId]);

  return (
    <section className='col-span-10 mdl:col-span-7 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden'>
      <div className="w-full flex flex-col items-center">
        <StoryDiv />
        {
          postsData ?
            <>
              {
                isShowingRecent &&
                <div className="my-3 border rounded-full py-1 px-3 bg-blue-50">
                  <p className="text-[var(--blue)] font-bold">No new posts available! Showing recent posts.</p>
                </div>
              }
              <div className="w-full max-w-[500px]">
                {
                  postsData.length === 0 ?
                    <div className="flex justify-center items-center mt-32 font-medium text-2xl text-[var(--blue)]">{postAvailability}</div>
                    :
                    <div>
                      {
                        [...postsData].map((post, i) => (
                          <Post key={post._id} post={post} lastPost={i === postsData.length} />
                        ))
                      }
                    </div>
                }
              </div>
            </>
            :
            <Loading loading={loading} />
        }
      </div>
    </section>
  )
}

export default Home