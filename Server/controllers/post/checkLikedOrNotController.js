import userData from "../../models/userData.js";

const checkLikedOrNot = async (req, res) => {
  const { id, post_id, i } = req.params;
  const findQuery = { _id: id, }

  findQuery[`posts.${i}._id`] = post_id;
  findQuery[`posts.${i}.likers`] = req.body.username;

  try {
    const result = await userData.findOne(findQuery);
    if (result) {
      res.status(200).send({ liked: true })
    }
    else {
      res.status(200).send({ liked: false })
    }
  }
  catch (err) {
    res.status(500).send({ liked: false, message: "Couldn't check, liked or not."})
  }
}

export { checkLikedOrNot };