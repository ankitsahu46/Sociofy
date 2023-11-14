import { useState, useEffect } from 'react';
import { Loading, Post } from "./";
import { useParams } from 'react-router-dom';

function ShowPost() {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getPostData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/post/see/${id}`);
      const result = await response.json();
      setPostData(result.data);
    }
    catch (err) {
      console.log("Could not find post");
    }
    setLoading(false);
  }

  useEffect(() => {
    getPostData();
  }, [])

  return (
    <>
      <main className='order-1 md:order-2 w-full max-h-[100vh-2.5rem] md:max-h-[100vh]'>
        <div className='grid grid-cols-10'>
          <section className='col-span-10 h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden'>
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-[600px]">
                {
                  postData ?
                    <Post {...postData} />
                    :
                    <Loading loading={loading} classes='h-[calc(100vh-2.5rem)]' />
                }
              </div>
            </div>
          </section>
        </div>
      </main >
    </>
  )
}

export default ShowPost