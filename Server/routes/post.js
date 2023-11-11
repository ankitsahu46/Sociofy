import express from "express";
import { getPosts } from "../controllers/homeController.js";
import { incdecLikes } from '../controllers/likesController.js';
import { checkLikedOrNot } from '../controllers/checkLikedOrNotController.js';
import { addComment } from "../controllers/addCommentController.js";
import { getComments } from "../controllers/getCommentsController.js";

const router = express.Router();

router
  .get("/", getPosts)
  .put("/likes/:id", incdecLikes)
  .put("/checklikedornot/:id", checkLikedOrNot)
  .post("/addcomment/:id", addComment)
  .get("/getcomments/:id", getComments)

export default router;
