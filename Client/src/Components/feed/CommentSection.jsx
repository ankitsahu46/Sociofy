/* eslint-disable react/prop-types */
import { Comment } from '..';

function CommentSection(props) {
  const { setAllComments, allComments = [], showComment, pendingComment, cmt, postId } = props;
  const username = JSON.parse(localStorage.getItem('username'));
  const img = JSON.parse(localStorage.getItem('img'));

  const handleDeleteComment = async (id) => {
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
      <div className='min-h-full'>
        <div className={`max-h-48 overflow-y-scroll rounded-2xl custom-scroll-bar  ${allComments.length > 2 && "border-b-[0.5px]"}`}>
          <div className={`flex flex-col-reverse gap-3 ${allComments.length && "py-3"}`}>
            {
              allComments.map((commenter) => (
                <Comment key={commenter._id} handleDelete={handleDeleteComment} {...commenter} />
              ))
            }
            {
              showComment &&
              <Comment comment={cmt.current} commenter_username={username} commenter_img={img} pending={pendingComment} />
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