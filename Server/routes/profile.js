import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getProfilePosts, getUserProfileData } from '../controllers/index.js';

const router = express.Router();

router
  .get('/getposts/:email/:username', verifyToken, getProfilePosts)
  .get('/get_user_profile_data/:username', verifyToken, getUserProfileData)

export default router;