import { useState, useRef, useEffect } from 'react';
import { Loader, Post } from "..";
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function ShowPost() {
  const [postData, setPostData] = useState(null);
  const [postAvailability, setPostAvailability] = useState("Loading...");
  const loadingBarRef = useRef(null);
  const { post_id } = useParams();

  const getPostData = async (post_id, setPostAvailability) => {
    loadingBarRef.current.continuousStart();
    try {
      const response = await fetch(`http://localhost:8080/post/get_post_data/${post_id}`);
      const result = await response.json();

      if (result.success) {
        setPostData(result.data);
        setPostAvailability("Available");
      }
      else {
        setPostAvailability("Post not available!")
      }
    }
    catch (err) {
      setPostAvailability("Couldn't find Post! Got Error.");
    }
    finally {
      loadingBarRef.current.complete();
    }
  }

  useEffect(() => {
    getPostData(post_id, setPostAvailability);
  }, [post_id])

  return (
    <>
      <main className='order-1 md:order-2 w-full max-h-[100vh-2.5rem] md:max-h-[100vh]'>
        <div className='grid grid-cols-10'>
          <section className='col-span-10 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden  bg-gray-50'>
          <LoadingBar color="#29caff" ref={loadingBarRef} />
            <div className="w-full h-full flex flex-col items-center">
              <div className="w-full max-w-[500px] mt-5 flex justify-center items-center">
                {
                  postData ?
                    <Post post={postData} />
                    :
                    <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)] w-full h-[80vh]">
                      {postAvailability === "Loading..." ? <Loader /> : postAvailability}
                    </div>
                }
              </div>
            </div>
          </section>
        </div>
      </main >
    </>
  )
}

export default ShowPost;