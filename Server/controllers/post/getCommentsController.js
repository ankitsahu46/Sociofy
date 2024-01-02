import userData from "../../models/userData.js";

const getComments = async (req, res) => {
  const { id, post_id, i } = req.params;
  const findFor = { _id: id, };

  findFor[`posts.${i}._id`] = post_id;

  try {
    const result = await userData.findOne(findFor).select({ posts: 1 });
    res.status(200).send({ success: true, comments: result.posts[i].comments_all});
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't reload comments"});
  }
}

export { getComments };