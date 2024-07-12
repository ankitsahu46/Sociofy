import userData from "../../models/userData.js";
import { uploadFile } from "../../utils/index.js";

const editProfile = async (req, res) => {
  const { user_id } = req.params;
  const { name, username, email, bio } = req.body;
  const { buffer, mimetype } = req.file;

  const b64 = Buffer.from(buffer).toString("base64");
  let dataURI = 'data:' + mimetype + ';base64,'+ b64;
  const img = await uploadFile(dataURI);

  try {
    const result = await userData.findOneAndUpdate(
      { _id: user_id },
      {
        $set: { name, username, email, bio, img: img.url },
      },
      { new: true }
    );

    if (result)
      res.status(200).json({
        success: true,
        profileData: result,
        message: "Details changed successfully.",
      });
    else
      res.status(404).json({ success: false, message: "Couldn't find user!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { editProfile };
