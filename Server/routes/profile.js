import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { checkIsFollowingTrue, getProfilePosts, getUserProfileData, followUnfollowUser, editProfile } from '../controllers/index.js';

const router = express.Router();

router
  .get('/getposts/:email/:username', verifyToken, getProfilePosts)
  .get('/get_user_profile_data/:user_id', verifyToken, getUserProfileData)
  .post('/follow_unfollow_user', verifyToken, followUnfollowUser)
  .get('/check_is_following_true/:who_followed/:user_id', verifyToken, checkIsFollowingTrue)
  .post('/edit_profile/:user_id', verifyToken, editProfile)

export default router;