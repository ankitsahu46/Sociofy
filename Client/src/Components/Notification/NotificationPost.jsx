// /* eslint-disable react/prop-types */

// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { useState, useEffect, useRef, forwardRef } from "react";
// import { getUserPostData, getPostData } from '../../utils';
// import { ProfilePostAndCommentSection } from "..";
// import { arrow, noImage } from '../../assets';

// function NotificationPost() {
//   const [params] = useSearchParams();
//   const post_id = params.get('post_id');
//   const [userPostData, setUserPostData] = useState([]);
//   const [postData, setPostData] = useState({});
//   const ref = useRef();

//   const [postAvailability, setPostAvailability] = useState("Loading...");
//   const [notificationPostAvailability, setNotificationPostAvailability] = useState("Loading...");

//   const token = JSON.parse(localStorage.getItem('token'));
//   const userId = JSON.parse(localStorage.getItem('user_id'));
//   let username = JSON.parse(localStorage.getItem('username'));
//   const profilePic = JSON.parse(localStorage.getItem('img'));

//   useEffect(() => {
//     getPostData(post_id, token, setPostData, setNotificationPostAvailability);
//   }, [post_id, token]);

//   useEffect(() => {
//       getUserPostData(userId, token, setUserPostData, setPostAvailability);
//   }, [userId, token]);

//   return (
//     <>
//       <div ref={ref} className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
//         <div className="w-[85%]">
//           {
//             postData ?
//               <div className='mt-5'>
//                 <ProfilePostAndCommentSection post={postData} />
//               </div>
//               :
//               <div className='flex justify-center items-center'>
//                 <div className='flex justify-center items-center font-medium text-2xl text-[var(--blue)] w-[80%] min-h-[350px] border'>
//                   {notificationPostAvailability}
//                 </div>
//               </div>
//           }

//           <div className="mt-5">
//             <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">
//               More From
//               <Link to='/profile' className='text-[var(--blue)]'>
//                 {" "}
//                 @{`${username}`}
//               </Link>
//             </p>
//             <div
//               className={`border min-h-[300px] ${userPostData.length > 0 && "min-h-[600px]"
//                 }`}
//             >
//               {userPostData.size ? (
//                 <div className="flex flex-col justify-center items-center mt-16 font-medium text-xl text-[var(--blue)]">
//                   <p>
//                     {postAvailability}
//                   </p>
//                   <div className='flex justify-center items-center text-base mt-10'>
//                     <Link to='/profile' className='bg-[var(--blue-dark)] rounded-3xl text-white pl-2 pr-3 py-1 flex items-center'>
//                       <div className="w-7 h-7 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full mr-2 my-1">
//                         <img src={profilePic ? profilePic : noImage} alt="" className="rounded-full" />
//                       </div>
//                       <span>Go to Profile</span>
//                       <span><img src={arrow} className='w-4 h-4 invert rotate-45 scale-110 ml-1' /></span>
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-3 gap-1">
//                   {[...userPostData].reverse().map((post) => (
//                     <OtherPost
//                       key={post._id}
//                       post={post}
//                       ref={ref}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default NotificationPost;







// const OtherPost = forwardRef(function OtherPost(props, ref) {
//   const { _id, postImg } = props.post;
//   const navigate = useNavigate();

//   const handleClick = () => {
//     ref.current.scrollTo({ top: 0, behavior: 'smooth' });
//     navigate(`/notification/notification_post?post_id=${_id}`);
//   }

//   return (
//     <div onClick={handleClick} className="flex justify-center items-center aspect-square border border-t-0" >
//       <img src={postImg} alt="profile" className="max-w-full max-h-full object-cover" />
//     </div>
//   )
// });




















/* eslint-disable react/prop-types */

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef, forwardRef } from "react";
import { getUserPostData, getPostData } from '../../utils';
import { ProfilePostAndCommentSection } from "..";
import { arrow, noImage } from '../../assets';
import LoadingBar from 'react-top-loading-bar';

function NotificationPost() {
  const [params] = useSearchParams();
  const post_id = params.get('post_id');
  const [userPostData, setUserPostData] = useState([]);
  const [postData, setPostData] = useState({});
  const [postAvailability, setPostAvailability] = useState("Loading...");
  const [notificationPostAvailability, setNotificationPostAvailability] = useState("Loading...");
  const loadingBarRef = useRef(null);
  const ref = useRef();

  const token = JSON.parse(localStorage.getItem('token'));
  let username = JSON.parse(localStorage.getItem('username'));
  const profilePic = JSON.parse(localStorage.getItem('img'));
  if (postData && userPostData.length !== 0) loadingBarRef.current.complete();
  
  useEffect(() => {
    loadingBarRef.current.continuousStart();
    const userId = JSON.parse(localStorage.getItem('user_id'));

    getUserPostData(userId, token, setUserPostData, setPostAvailability);
  }, [token]);

  useEffect(() => {
    getPostData(post_id, token, setPostData, setNotificationPostAvailability);
  }, [post_id, token]);


  return (
    <>
      <div ref={ref} className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <LoadingBar color="#29caff" ref={loadingBarRef} />
        <div className="w-[85%]">
          {
            postData ?
              <div className='mt-5 border rounded-2xl'>
                <ProfilePostAndCommentSection post={postData} userData={{img: profilePic}}/>
              </div>
              :
              <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center font-medium text-2xl text-[var(--blue)] w-[80%] min-h-[350px] border'>
                  {notificationPostAvailability}
                </div>
              </div>
          }

          <div className="mt-5">
            <p className="font-semibold text-lg sm:text-xl md:text-base text-gray-600 mb-2">
              More From{" "}
              <Link to='/profile' className='text-[var(--blue)]'>

                @{username}
              </Link>
            </p>
            <div
              className={`border min-h-[300px] ${userPostData.length > 0 && "min-h-[600px]"
                }`}
            >
              {userPostData.size ? (
                <div className="flex flex-col justify-center items-center mt-16 font-medium text-xl text-[var(--blue)]">
                  <p>
                    {postAvailability}
                  </p>
                  <div className='flex justify-center items-center text-base mt-10'>
                    <Link to='/profile' className='bg-[var(--blue-dark)] rounded-3xl text-white pl-2 pr-3 py-1 flex items-center'>
                      <div className="w-7 h-7 border-[1px] border-[var(--blue)] flex justify-center items-center rounded-full mr-2 my-1">
                        <img src={profilePic ? profilePic : noImage} alt="" className="rounded-full" />
                      </div>
                      <span>Go to Profile</span>
                      <span><img src={arrow} className='w-4 h-4 invert rotate-45 scale-110 ml-1' /></span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {[...userPostData].reverse().map((post) => (
                    <OtherPost
                      key={post._id}
                      post={post}
                      ref={ref}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationPost;







const OtherPost = forwardRef(function OtherPost(props, ref) {
  const { _id, postImg } = props.post;
  const navigate = useNavigate();

  const handleClick = () => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/notification/notification_post?post_id=${_id}`);
  }

  return (
    <div onClick={handleClick} className="flex justify-center items-center aspect-square border border-t-0" >
      <img src={postImg} alt="profile" className="max-w-full max-h-full object-cover" />
    </div>
  )
});

