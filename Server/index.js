//import modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/connect.js";
import post from './routes/post.js';
import cors from 'cors';
dotenv.config();

//app
const app = express();

//db
connectDB(process.env.MONGO_URL);

//middleware
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));


//routes
app.use("/post", post);

//port
const port = process.env.PORT || 8080;

//listener
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
