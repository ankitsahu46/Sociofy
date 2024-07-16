import postData from "../../models/postData.js";

const deletePost = async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await postData.deleteOne({ _id: post_id });
    console.log(result, 'dlete post from deletePostController.js');
    res.status(200).send({ success: true, message: "Post deleted successfully." });
  } 
  catch (err) {
    console.log("couldn't delete post. Error:", err);
    res
      .status(500)
      .send({ success: false, message: "Couldn't delete comment" });
  }
};

export { deletePost };