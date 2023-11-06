import express from "express";
import { getPosts } from "../controllers/homeController.js";
import { incdecLikes } from '../controllers/likesController.js'

const router = express.Router();

router
  .get("/", getPosts)
  .put("/likes/:id", incdecLikes);

export default router;
