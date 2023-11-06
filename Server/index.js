//import modules
import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/connect.js";
import home from './routes/home.js';
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
app.use("/", home);
// app.get("/", (req, res) => {
//   res.send("ankitsahu is working");
//   console.log("ankitsahu is working");
// })

//port
const port = process.env.PORT || 8080;

//listener
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
