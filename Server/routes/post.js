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
  postImg
} from "../controllers/index.js";


const router = express.Router();
router.use(cors());

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router
  .get("/", getPosts)
  .put("/likes/:id/:post_id/:i", incdecLikes)
  .get('/like_count/:id/:post_id/:i', likeCount)
  .put("/check_liked_or_not/:id/:post_id/:i", checkLikedOrNot)
  .post("/add_comment/:id/:post_id/:i", addComment)
  .get("/get_comments/:id/:post_id/:i", getComments)
  .delete("/delete_comment/:id/:post_id/:comment_id/:i", deleteComment)
  .get("/see/:id/:post_id/:i", getPostData)
  .get("/get_post_data/:id/:post_id/:i", getPostData)
  .post('/post_img', upload.single('img_file'), verifyToken, postImg)


export default router;
