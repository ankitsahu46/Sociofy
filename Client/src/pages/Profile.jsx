/* eslint-disable react/prop-types */
import { LayoutModal, PostImg, PostOwnerInfo, PostReactBox, AddComment, CommentSection } from "../Components";
import { noImage } from "../assets"
import { useState, useEffect, useRef } from 'react';

const Post = ({ post, profilePic }) => {
  const { postImg, username, _id, shares, comments_all = [], likers = [] } = post;

  const [showPostModal, setShowPostModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [allComments, setAllComments] = useState(comments_all);
  const [showComment, setShowComment] = useState(false);
  const cmt = useRef("");

  const myUsername = JSON.parse(localStorage.getItem('username'));
  const commentState = ["pending", "notPending", "failed", "deleting"];
  const [pendingComment, setPendingComment] = useState(commentState[1]);

  const addCommentProps = {
    cmt,
    setShowComment,
    setPendingComment,
    setAllComments,
    commentState,
    postId: _id
  }
  const commentSectionProps = {
    setAllComments,
    allComments,
    showComment,
    pendingComment,
    cmt,
    postId: _id
  }
  const postReactBoxProps = {
    liked,
    setLiked,
    likers,
    allComments,
    shares,
    postId: _id
  }
  // const commentBoxProps = {
  //   allComments,
  //   setAllComments,
  //   postId: _id,
  // }

  const checkLikedOrNot = async () => {
    const response = await fetch(`http://localhost:8080/post/checklikedornot/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ username: myUsername }),          //use current profile's username
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.ok) {
      const result = await response.json();
      setLiked(result.liked)
    }
    else {
      await response.json();
    }
  }

  useEffect(() => {
    checkLikedOrNot();
  }, [])


  return (
    <>
      <div className="flex justify-center items-center aspect-square border" onClick={() => setShowPostModal(true)}>
        <img src={postImg} alt="profile" className="max-w-full max-h-full object-cover" />
      </div>
      {
        showPostModal &&
        <LayoutModal hideModal={() => setShowPostModal(false)}>
          {/* <div className="flex justify-center items-center aspect-square border">
            <img src={post.postImg} alt="profile" className="max-w-full max-h-full object-cover" />
          </div> */}
          <div className="flex ">
            <div className="bg-white rounded-2xl shadow-md w-[90vh] aspect-square">
              <PostImg postImg={post.postImg} />
            </div>
            <div className="flex flex-col items-center w-[calc(100%-90vh)] py-2 px-4">
              <div className="flex flex-col w-full h-full">
                <PostOwnerInfo userImg={profilePic} username={username} />
                <hr />
                <div className="h-full p-2">
                  <CommentSection {...commentSectionProps} />
                </div>
                <div className="w-full">
                  <PostReactBox {...postReactBoxProps} />
                  <AddComment {...addCommentProps} />
                </div>
              </div>
            </div>
          </div>
        </LayoutModal>
      }
    </>
  )
};

function Profile() {
  const [posts, setPosts] = useState([]);
  const [postAvailability, setPostAvailability] = useState("Loading...");

  const username = JSON.parse(localStorage.getItem('username'));
  const name = JSON.parse(localStorage.getItem('name'));
  const img = JSON.parse(localStorage.getItem('img'));
  const email = JSON.parse(localStorage.getItem('email'));
  const token = JSON.parse(localStorage.getItem('token'));

  let bio = String.raw`
♔Θffίcίαl Δccouηt
Respect for girls✨
🖤Blãck løvēr🖤
₩ish_Ⓜ€_1M🅰¥🎂
.
🔥λ₸₸ł₸𝗨Ð𝗘 𝐋é𝐯é𝐥🔥📈
`;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/getposts/${email}/${username}`, {
          method: "GET",
          headers: {
            authorization: token
          }
        });

        const result = await response.json();
        if (result.success) setPosts(result.result);
        else setPostAvailability(result.message);
      }
      catch (err) {
        setPostAvailability("Couldn't load posts!");
      }
    }

    getPosts();
  }, [email, username, token])

  return (
    <div className="col-span-10 max-w-full h-[calc(100vh-2.5rem)] md:h-[100vh] flex justify-center overflow-y-scroll scroll-hidden ">
      <div className="w-[85%]">
        <div className="justify-center items-center grid grid-cols-5 mt-5 md:mt-2 lg:mt-0">
          <div className="col-span-2 flex justify-center items-center aspect-square">
            <img src={img ? img : noImage} alt="profile" className="rounded-full w-[70%] h-[70%] md:w-[45%] md:h-[45%] object-cover" />
          </div>
          <div className="col-span-3 flex flex-col justify-center items-start pl-4">
            <div className="flex gap-7">
              <span className="text-lg font-semibold text-[var(--blue)]">{username}</span>
              <button className="bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] rounded-lg px-2 text-white font-medium">Edit Profile</button>
            </div>
            <span className="font-medium text-lg mt-3">{name}</span>
            <pre>{bio}</pre>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-2xl text-gray-600 mb-2">Posts</p>
          <div className="border min-h-[300px]">
            {
              posts.length === 0 ?
                <div className="flex justify-center items-center mt-16 font-medium text-2xl text-[var(--blue)]">{postAvailability}</div>
                :
                <div className="grid grid-cols-3 gap-1">
                  {
                    posts.map(post => (
                      <Post key={post._id} post={post} profilePic={img} />
                    ))
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile