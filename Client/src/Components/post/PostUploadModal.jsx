/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { noImage } from "../../assets";
import { ReactionInfoBox, LayoutModal } from "..";

function PostUploadModal({ setShowPostModal }) {
  const [file, setFile] = useState("");
  const [postingState, setPostingState] = useState("Post");
  const [postUploadReaction, setPostUploadReaction] = useState(false);
  const navigate = useNavigate();

  const email = JSON.parse(localStorage.getItem('email'));
  const username = JSON.parse(localStorage.getItem('username'));
  const token = JSON.parse(localStorage.getItem('token'));
  const user_id = JSON.parse(localStorage.getItem('user_id'));

  const handleCancel = () => {
    setShowPostModal(false);
    setFile(null);
  }

  const postImg = async (img) => {
    try {
      let data = new FormData();
      data.append('img_file', img);
      data.append('email', email);
      data.append('username', username);
      data.append('token', token);
      data.append('user_id', user_id);

      const response = await axios.post('http://localhost:8080/post/post_img', data);
      const result = await response.data;
      console.log(result, "result post upload");

      if (result.success) {
        setPostingState("Posted.");
        setTimeout(() => handleCancel(), 500);
       
        const posts = JSON.parse(localStorage.getItem('posts'));
        posts.push(result.postData);
        localStorage.setItem('posts', JSON.stringify(posts));
        
        if (window.location.pathname === '/profile') window.location.reload();
        else navigate("/profile");
      }
      else {
        setPostingState("Post");
        alert("Something went wrong!");
      }
    }
    catch (err) {
      setPostingState("Post");
      setPostUploadReaction(true);

      setTimeout(() => {
        setPostUploadReaction(false);
      }, 3000);
    }
  }

  const handlePost = () => {
    setPostingState("Posting...");
    postImg(file);
  }

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-xl">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
        <h1 className="text-lg font-medium text-white">Create New Post</h1>
      </div>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center w-[250px] md:w-[300px] lg:w-[350px] aspect-square m-3 border border-gray-400">
            <img src={file ? URL.createObjectURL(file) : noImage} alt="" className="max-w-full max-h-full object-cover" />
          </div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" onClick={handlePost} className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] hover:from-[var(--blue-hover)] hover:to-[var(--blue-semidark-hover)] px-6 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-all" disabled={!file}>{postingState}</button>
        <button type="button" onClick={handleCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
      </div>

      <ReactionInfoBox showInfo={postUploadReaction} text="Couldn't post image." />
    </LayoutModal>
  )
}

export default PostUploadModal