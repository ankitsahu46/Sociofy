import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import Multer from 'multer';
import cors from 'cors';
import {
  addComment,
  checkLikedOrNot,
  deleteComment,
  getComments,
  getPosts,
  likeCount,
  incdecLikes,
  getPostData,
  postImg,
  getPostDataForHome,
  postSeenByUser,
  postShared,
} from "../controllers/index.js";


const router = express.Router();
router.use(cors());

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router
  .get("/", getPosts)
  .post("/get_posts_for_home", verifyToken, getPostDataForHome)
  .put("/likes/:post_id", incdecLikes)
  .get('/like_count/:post_id', likeCount)
  .put("/check_liked_or_not/:post_id", checkLikedOrNot)
  .post("/add_comment/:post_id", verifyToken, addComment)
  .get("/get_comments/:post_id", getComments)
  .delete("/delete_comment/:post_id/:comment_id", deleteComment)
  .get("/see/:post_id", getPostData)
  .get("/get_post_data/:id/:post_id/:i", getPostData)
  .post('/post_img', upload.single('img_file'), verifyToken, postImg)
  .post('/post_seen_by_user/:post_id/:user_id', verifyToken, postSeenByUser)
  .get('/shared/:post_id', verifyToken, postShared)


export default router;
