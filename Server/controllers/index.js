import { checkusername } from "./home/checkusernameController.js";
import { login } from "./home/loginController.js";
import { signup } from "./home/signupController.js";
import { addComment } from "./post/addCommentController.js";
import { checkLikedOrNot } from "./post/checkLikedOrNotController.js";
import { deleteComment } from "./post/deleteCommentController.js";
import { getComments } from "./post/getCommentsController.js";
import { getPostData } from "./post/getPostDataController.js";
import { getPosts } from "./post/homeController.js";
import { likeCount } from "./post/likeCountController.js";
import { incdecLikes } from "./post/likesController.js";
import { postImg } from "./post/postImgController.js";
import { getProfilePosts } from "./profile/getProfilePostsController.js";

export {
  signup,
  login,
  checkusername,
  addComment,
  checkLikedOrNot,
  deleteComment,
  getComments,
  getPosts,
  likeCount,
  incdecLikes,
  getPostData,
  getProfilePosts,
  postImg
};
