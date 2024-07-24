/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { noImage } from "../../assets";
import { ReactionInfoBox, LayoutModal } from "..";
import { postUpload } from "../../utils";
import { useNavigate } from "react-router-dom";

function PostUploadModal({ setShowPostModal }) {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState('');
  const [captionLength, setCaptionLength] = useState(0);
  const [postingState, setPostingState] = useState("Post");
  const [postUploadReaction, setPostUploadReaction] = useState(false);
  const ref = useRef(false);
  const navigate = useNavigate();
  const maxCaptionLength = 300;

  const handleCancel = () => {
    if (postingState === 'Posting...') ref.current = true;
    setShowPostModal(false);
    setFile(null);
  }

  const handlePost = () => {
    setPostingState("Posting...");
    postUpload(
      file,
      ref,
      caption,
      handleCancel,
      setPostingState,
      setPostUploadReaction,
      navigate
    );
  }

  const handleCaptionChange = (e) => {
    setCaptionLength(e.target.value.length);
    setCaption(e.target.value);
  }

  return (
    <LayoutModal hideModal={handleCancel} maxWidth="sm:max-w-xl">
      <div className="sm_max:min-w-[75vw]">
        {/* Modal Title */}
        <div className="w-full flex justify-center items-center bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] py-2 border-b-2">
          <h1 className="text-lg font-medium text-white">Create New Post</h1>
        </div>

        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="flex flex-col justify-center items-center">
            {/* Photo You want to upload */}
            <div className="flex justify-center items-center w-[250px] md:w-[300px] lg:w-[250px] aspect-square m-3 border border-gray-400">
              <img src={file ? URL.createObjectURL(file) : noImage} alt="" className="max-w-full max-h-full object-cover" />
            </div>

            {/* File Input */}
            <div className="relative w-full mt-2">
              <input className="block w-[80%] p-[2px] overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-[var(--blue-semidark)] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm" id="file-upload" type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            {/* Caption Input */}
            <div className="w-full mt-4">
              <div className="flex justify-between items-center w-[80%]">
                <div>
                  <label htmlFor='caption' className="font-semibold text-[var(--blue)]" >Caption:</label>
                  <span className="ml-2 text-gray-300">(optional)</span>
                </div>
                <div className="text-xs pr-1 pt-2 text-gray-400">
                  {captionLength}/{maxCaptionLength}
                </div>
              </div>
              <textarea id='caption' onChange={handleCaptionChange} value={caption} placeholder="Write caption for your post." className="mt-1 border border-gray-400 w-[80%] p-1 rounded-md outline-none focus:border-2 focus:border-[var(--blue)]" maxLength={maxCaptionLength}>
              </textarea>
            </div>
          </div>
        </div>

        {/* Upload Photo or Cancel */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={handlePost} className={`inline-flex w-full justify-center rounded-md bg-gradient-to-r from-[var(--blue)] to-[var(--blue-semidark2)] hover:from-[var(--blue-hover)] hover:to-[var(--blue-semidark-hover)] px-6 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-all ${!file && 'cursor-not-allowed'}`} disabled={!file || postingState !== 'Post'}>{postingState}</button>
          <button type="button" onClick={handleCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>

        <ReactionInfoBox showInfo={postUploadReaction} text="Couldn't post image." />
      </div>
    </LayoutModal>
  )
}

export default PostUploadModal;