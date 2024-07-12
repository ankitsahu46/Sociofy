import postData from "../../models/postData.js";

const getUserPostData = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await postData.find({ userId: user_id });
    if (result) {
      res.status(200).send({ success: true, postData: result });
    } else {
      res.status(404).send({ success: false, message: "Couldn't find posts" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't find posts. Got error." });
  }
};

export { getUserPostData };