import express from 'express';
import { signup, login, checkUsername, storeFirebaseToken, fcm } from '../controllers/index.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', login)
  .get('/signup/check_username/:value', checkUsername)
  .post('/store_firebase_token/:user_id', storeFirebaseToken)
  .post('/send', fcm)

export default router;