import express from "express";
import {
  addComment,
  checkLikedOrNot,
  deleteComment,
  getComments,
  getPosts,
  likeCount,
  incdecLikes,
} from "../controllers/index.js";

const router = express.Router();

router
  .get("/", getPosts)
  .put("/likes/:id", incdecLikes)
  .put("/checklikedornot/:id", checkLikedOrNot)
  .post("/addcomment/:id", addComment)
  .get("/getcomments/:id", getComments)
  .delete("/deletecomment/:_id/:id", deleteComment)
  .get("/likecount/:id", likeCount);

export default router;
