
import { useEffect, useMemo, useState } from "react";
import { Loader, Loading, Post, StoryDiv } from "../Components";
import { fetchMorePosts, getPostsForHome } from "../utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import { complete } from "../assets";
import LoadingBar from 'react-top-loading-bar';

function Home() {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postAvailability, setPostAvailability] = useState("Loading...");
  const [isShowingRecent, setIsShowingRecent] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [progress, setProgress] = useState(0);

  //to get the following only when the value of following is changed
  const wordFollowing = 'following';
  const getFollowing = (word) => {
    return JSON.parse(localStorage.getItem(word));
  }
  const following = useMemo(() => getFollowing(wordFollowing), [wordFollowing]);
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = JSON.parse(localStorage.getItem('user_id'));
  const scrollThreshold = '200px';                            //this length should be smaller than the length from post to the end of comment section, so it can load the items after user has seen the last post.

  const fetchNext = () => {
    fetchMorePosts(token, following, userId, postsData, setPostsData, setHasMore, setFetchError);
  }
  useEffect(() => {
    setProgress(10);
    getPostsForHome(token, following, userId, setPostsData, setPostAvailability, setLoading, setIsShowingRecent, setProgress);
  }, [token, following, userId]
  );

  return (
    <section id='infinite-scroll-div' className='col-span-10 mdl:col-span-7 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-auto scroll-hidden bg-gray-50'>
      <LoadingBar progress={progress} color='#29caff' onLoaderFinished={() => setProgress(0)} />
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
                    <div className="flex justify-center items-center mt-32 font-medium text-2xl text-[var(--blue)]">{postAvailability === "Loading..." ? <Loader /> : postAvailability}</div>
                    :
                    <div>
                      <InfiniteScroll
                        dataLength={postsData.length}
                        next={fetchNext}
                        hasMore={hasMore}
                        loader={<Loader />}
                        scrollableTarget='infinite-scroll-div'
                        scrollThreshold={scrollThreshold}
                        endMessage={
                          <>
                            <div className=" flex flex-col justify-start items-center text-[var(--blue-dark)] sm:text-lg mb-4">
                              <img src={complete} alt="" className="w-12 h-12 mb-1" />
                              <p><b>Yay! You have seen it all.</b></p>
                            </div>
                          </>
                        }
                      >
                        {
                          [...postsData].map((post, i) => (
                            <Post key={post._id} post={post} lastPost={i === postsData.length} />
                          ))
                        }
                      </InfiniteScroll>
                      {
                        fetchError &&
                        <div>
                          <p>
                            <b>Oops! Could not load. Try again.</b>
                          </p>
                        </div>
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

export default Home;