import userData from "../../models/userData.js";

const likeCount = async (req, res) => {
  const { id, post_id, i } = req.params;

  const findFor = { _id: id };
  findFor[`posts.${i}._id`] = post_id;

  try {
    const result = await userData.findOne({_id: id});
    res.status(200).send({ success: true, likeCount: result.posts[i].likers.length})
  }
  catch (err) {
    res.status(500).send({success: false, message: "Couldn't get like count"})
  }
}

export { likeCount };