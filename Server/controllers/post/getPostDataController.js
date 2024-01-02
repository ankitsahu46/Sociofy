import userData from "../../models/userData.js";

const getPostData = async (req, res) => {
  const { id, post_id, i } = req.params;
  const findFor = { _id: id };

  findFor[`posts.${i}._id`] = post_id;

  try {
    const result = await userData.findOne(findFor);
    if (result) {
      res.status(200).send({ success: true, data: result.posts[i] });
    } else {
      res.status(404).send({ success: false, message: "Couldn't find post" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't find post. Got error." });
  }
};

export { getPostData };
