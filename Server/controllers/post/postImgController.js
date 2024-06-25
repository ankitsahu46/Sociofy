import postData from "../../models/postData.js";
import userData from "../../models/userData.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFile = async (file) => {
  const imgFile = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return imgFile;
};

const postImg = async (req, res) => {
  try {
    const { username, email, user_id } = req.body;
    const { buffer, mimetype } = req.file;

    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = "data:" + mimetype + ";base64," + b64;
    const imgFile = await uploadFile(dataURI);

    // const date = new Date.now()
    const data1 = await postData({
      postImg: imgFile.url,
      userImg: "",
      username,
      userId: user_id,
      shares: 0,
      datePosted: Date.now(),
      likers: [],
      comments_all: [],
    });
    const result1 = await data1.save();

    const data2 = await userData.updateOne(
      {
        _id: user_id,
      },
      {
        $addToSet: {
          posts: result1._id,
        }
      }
    )
    res.status(200).send({ success: true, message: "Posted successfully.", postData: result1 });
  } catch (err) {
    res.status(500).send({ success: false, message: "Couldn't Post Image!" });
  }
};

export { postImg };