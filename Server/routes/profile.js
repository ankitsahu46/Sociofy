import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getProfilePosts } from '../controllers/index.js';

const router = express.Router();

router
  .get('/getposts/:email/:username', verifyToken, getProfilePosts)

export default router;