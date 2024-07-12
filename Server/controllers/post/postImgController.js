import postData from "../../models/postData.js";
import userData from "../../models/userData.js";
import { uploadFile } from "../../utils/index.js";

const postImg = async (req, res) => {
  try {
    const { username, email, user_id } = req.body;
    const { buffer, mimetype } = req.file;

    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = "data:" + mimetype + ";base64," + b64;
    const imgFile = await uploadFile(dataURI);

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