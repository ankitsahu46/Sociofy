import express from 'express';
import { signup, login, checkUsername } from '../controllers/index.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', login)
  .get('/signup/check_username/:value', checkUsername)

export default router;