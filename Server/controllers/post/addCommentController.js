import userData from "../../models/userData.js";

const addComment = async (req, res) => {
  const { id, post_id, i } = req.params;
  const { username, img, comment } = req.body;

  const findFor = { _id: id };
  const updateOperation = { $push: {} };

  // Set the dynamic field name for the posts and comments array
  findFor[`posts.${i}._id`] = post_id;

  updateOperation.$push[`posts.${i}.comments_all`] = {
    commenter_username: username,
    comment: comment,
    commenter_img: img,
  };

  try {
    const result = await userData.updateOne(findFor, updateOperation);
    res
      .status(200)
      .send({ success: true, message: "Comment added successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Couldn't add comment" });
  }
};

export { addComment };
