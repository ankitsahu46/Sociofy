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
  .put("/likes/:id", incdecLikes)
  .put("/checklikedornot/:id", checkLikedOrNot)
  .post("/addcomment/:id", addComment)
  .get("/getcomments/:id", getComments)
  .delete("/deletecomment/:_id/:id", deleteComment)
  .get("/likecount/:id", likeCount)
  .get("/see/:id", getPostData)
  .post('/post_img', upload.single('img_file'), verifyToken, postImg)


export default router;
