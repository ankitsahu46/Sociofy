/* eslint-disable react/prop-types */
import { Comment } from '.';
import { profilePic } from '../assets';

function CommentSection({
  setAllComments,
  allComments,
  showComment,
  pendingComment,
  cmt,
  postId
}) {
  
  const handleDeleteComment = async (id) => {
    console.log("dle comment");
    const response = await fetch(`http://localhost:8080/post/deletecomment/${postId}/${id}`, {
      method: 'DELETE',
    })
    const result = await response.json();

    if (result.success) {
      const response2 = await fetch(`http://localhost:8080/post/getcomments/${postId}`);
      const result2 = await response2.json();

      setAllComments(result2.comments);
    }
    else {
      console.log("Couldn't delete comment");
    }
  }

  return (
    <>
      <div>
        <div className={`max-h-48 overflow-y-scroll scroll-hidden ${allComments.length > 2 && "border-b-[0.5px] rounded-2xl"}`}>

        <div className={`flex flex-col-reverse gap-3 ${allComments.length && "py-3"}`}>
          {
            allComments.map((commenter) => (
              <Comment key={commenter._id} handleDelete={handleDeleteComment} {...commenter} />
            ))
          }
          {
            showComment &&
            <Comment comment={cmt.current} commenterusername="ankitsahu_78" commenterimg={profilePic} pending={pendingComment} />
          }
        </div>
        </div>
        <div className="text-sm mt-2 text-gray-500 font-medium cursor-pointer">
          {
            allComments.length === 0 && "No Comments"
          }
        </div>
      </div>
    </>

  )
}

export default CommentSection