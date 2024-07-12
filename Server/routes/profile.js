import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Multer from 'multer';
import cors from 'cors'
import { checkIsFollowingTrue, getProfilePosts, getUserProfileData, followUnfollowUser, editProfile, getUserProfileInfoNoPost } from '../controllers/index.js';

const router = express.Router();
router.use(cors());
const storage = new Multer.memoryStorage();
const upload = Multer({ storage, });

router
  .get('/getposts/:email/:username', verifyToken, getProfilePosts)
  .get('/get_user_profile_data/:user_id', verifyToken, getUserProfileData)
  .get('/get_user_profile_info_no_post/:user_id', verifyToken, getUserProfileInfoNoPost)
  .post('/follow_unfollow_user', verifyToken, followUnfollowUser)
  .get('/check_is_following_true/:who_followed/:user_id', verifyToken, checkIsFollowingTrue)
  .post('/edit_profile/:user_id', upload.single('imgFile'), verifyToken, editProfile)

export default router;