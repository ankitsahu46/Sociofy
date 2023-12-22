import express from 'express';
import { signup, login, checkusername } from '../controllers/index.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', login)
  .get('/signup/checkusername/:value', checkusername)

export default router;