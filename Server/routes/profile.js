import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import Multer from 'multer';
import cors from 'cors'
import { checkIsFollowingTrue, getProfilePosts, getUserProfileData, followUnfollowUser, editProfile, getUserProfileInfoNoPost, deletePost, editProfileNoImg, getFollowersFollowingList, searchFollowersFollowing, removeUserFromFollowersFollowing,  } from '../controllers/index.js';

const router = express.Router();
router.use(cors());
const storage = new Multer.memoryStorage();
const upload = Multer({ storage, });

router
  .get('/getposts/:email/:username', verifyToken, getProfilePosts)
  .get('/get_user_profile_data/:user_id', verifyToken, getUserProfileData)
  .get('/get_user_profile_info_no_post/:user_id', verifyToken, getUserProfileInfoNoPost)
  .get('/search_following_followers/:user_id/:searched_text', verifyToken, searchFollowersFollowing)
  .post('/follow_unfollow_user', verifyToken, followUnfollowUser)
  .get('/check_is_following_true/:who_followed/:user_id', verifyToken, checkIsFollowingTrue)
  .post('/edit_profile/:user_id', upload.single('imgFile'), verifyToken, editProfile)
  .post('/edit_profile_no_img/:user_id', editProfileNoImg)
  .post('/get_followers_following_list', verifyToken, getFollowersFollowingList)
  .delete('/delete_post/:post_id', verifyToken, deletePost)
  .delete('/remove_user', verifyToken, removeUserFromFollowersFollowing)

export default router;