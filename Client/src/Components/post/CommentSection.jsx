/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Comment, ReactionInfoBox } from '..';

function CommentSection(props) {
  const { setAllComments, allComments = [], showComment, pendingComment, cmt, postId, userId} = props;
  const [showInfo, setShowInfo] = useState(false);

  const myUsername = JSON.parse(localStorage.getItem('username'));
  const myProfileImg = JSON.parse(localStorage.getItem('img'));
  const token = JSON.parse(localStorage.getItem('token'));

  const handleDeleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:8080/post/delete_comment/${postId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    })
    const result = await response.json();

    if (result.success) {
      const response2 = await fetch(`http://localhost:8080/post/get_comments/${postId}`, {
        method: 'GET',
        headers: {
          authorization: token
        }
      });
      const result2 = await response2.json();

      setAllComments(result2.comments);
    }
    else {
      setShowInfo(true);

      setTimeout(() => {
        setShowInfo(false);
      }, 3000);
    }
  }

  return (
    <>
      <div className='min-h-full'>
        <div className={`rounded-2xl ${allComments.length > 2 ? "border-b-[0.5px]" : "mt-3"} `}>
          <div className={`flex flex-col-reverse gap-3 ${allComments.length > 2 && "py-3"}`}>
            {
              [...allComments].map((commenter) => (
                <Comment key={commenter._id} handleDelete={handleDeleteComment} userId={userId} {...commenter} />
              ))
            }
            {
              showComment &&
              <Comment comment={cmt.current} commenter_username={myUsername} commenter_img={myProfileImg} pending={pendingComment} />
            }
          </div>
        </div>
        <div className="text-sm mt-2 text-gray-500 font-medium cursor-pointer">
          {
            allComments.length === 0 && "No Comments"
          }
        </div>
      </div>
      <ReactionInfoBox showInfo={showInfo} text="Couldn't delete comment." />
    </>

  )
}

export default CommentSection