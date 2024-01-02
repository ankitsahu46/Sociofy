import userData from "../../models/userData.js";

const incdecLikes = async (req, res) => {
  const { id, post_id, i } = req.params;
  // let inc = req.query.liked == "true" ? 1 : -1;
  const findFor = { _id: id };
  const increaseLike = { $addToSet: {} };
  const decreaseLike = { $pull: {} };

  findFor[`posts.${i}._id`] = post_id;
  increaseLike.$addToSet[`posts.${i}.likers`] = req.body.liker;
  decreaseLike.$pull[`posts.${i}.likers`] = req.body.liker;

  try {
    let changeLikes;
    if (req.query.liked == "true") {
      changeLikes = await userData.updateOne(
        {
          _id: id,
        },
        increaseLike,
        { new: true }
      );
    } else {
      changeLikes = await userData.updateOne(
        {
          _id: id,
        },
        decreaseLike,
        { new: true }
      );
    }
    res.status(200).send({ success: true, data: changeLikes });
  } catch (err) {
    res.status(500).send({ success: false, message: "Error updating likes" });
  }
};

export { incdecLikes };
