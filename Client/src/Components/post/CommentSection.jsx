/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Comment, ReactionInfoBox } from '..';
import { Link } from 'react-router-dom';
import { noImage } from '../../assets';

function CommentSection(props) {
  const { setAllComments, allComments = [], showComment, pendingComment, cmt, postId, userId, caption = '', userImg, username } = props;

  const [showInfo, setShowInfo] = useState(false);

  const myUsername = JSON.parse(localStorage.getItem('username'));
  const myUserId = JSON.parse(localStorage.getItem('user_id'));
  const myProfileImg = JSON.parse(localStorage.getItem('img'));
  const token = JSON.parse(localStorage.getItem('token'));

  let seeProfile = `/profile/see?user_id=${userId}`;
  if (userId === myUserId) seeProfile = '/profile';

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
          {/* caption */}
          {
            caption &&
            <div className={`flex pl-2 pr-3 mb-5 pb-3 border-b ${allComments.length > 2 && "pt-3"}`}>
              <Link to={seeProfile}>
                <div className="w-9 h-9">
                  <img src={userImg || noImage} alt="" className="rounded-full w-8 h-8" />
                </div>
              </Link>
              <div className="w-full">
                <div className="px-3 pt-1 pb-2 w-full">
                  <div className="flex justify-between items-center mb-1">
                    <Link to={seeProfile}>
                      <span className="text-sm font-medium">{username}</span>
                    </Link>
                  </div>
                  <div className="font-normal text-sm text-gray-600">
                    {caption}
                  </div>
                </div>
              </div>
            </div>
          }
          {/* comments */}
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