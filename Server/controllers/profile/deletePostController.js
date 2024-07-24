import postData from "../../models/postData.js";
import userData from "../../models/userData.js";

const deletePost = async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await postData.deleteOne({ _id: post_id });
    const result2 = await userData.findOneAndUpdate(
      { posts: { $in: [post_id] } },
      { $pull: { posts: post_id } },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Post deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't delete post." });
  }
};

export { deletePost };
