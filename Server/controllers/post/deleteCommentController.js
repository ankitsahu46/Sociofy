import userData from "../../models/userData.js";

const deleteComment = async (req, res) => {
  const { id, post_id, comment_id, i } = req.params;

  const findFor = { _id: id };
  const updateOperation = { $pull: {} };

  findFor[`posts.${i}._id`] = post_id;
  updateOperation.$pull[`posts.${i}.comments_all`] = { _id: comment_id };

  try {
    const result = await userData.updateOne(findFor, updateOperation);
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't delete comment" });
  }
};

export { deleteComment };
