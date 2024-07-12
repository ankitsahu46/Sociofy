//import modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/connect.js";
// import post from './routes/post.js';
// import home from './routes/home.js';
// import profile from './routes/profile.js';
// import search from './routes/search.js';
// import notification from './routes/notification.js';
import { home, post, profile, search, notification } from "./routes/index.js";
import cors from 'cors';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

process.env.GOOGLE_APPLICATION_CREDENTIALS;

//app
const app = express();

//db
connectDB(process.env.MONGO_URL);


//middleware
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(cors({ methods: ["GET", "DELETE", "POST", "PUT", "PATCH"]}));
// app.use(express.urlencoded({ extended: true }));

initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
});


//routes
app.use("/post", post);
app.use('/profile', profile);
app.use('/search', search);
app.use('/notification', notification);
app.use('/', home);
//port
const port = process.env.PORT || 8080;

//listener
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
