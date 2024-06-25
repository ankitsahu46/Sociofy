import postData from "../../models/postData.js";

const incdecLikes = async (req, res) => {
  const { post_id } = req.params;
  try {
    let changeLikes;
    if (req.query.liked == "true") {
      changeLikes = await postData.updateOne(
        {
          _id: post_id,
        },
        {
          $addToSet: {
            likers: req.body.liker,
          }
        },
        { new: true }
      );
    } else {
      changeLikes = await postData.updateOne(
        {
          _id: post_id,
        },
        {
          $pull: {
            likers: req.body.liker,
          }
        },
        { new: true }
      );
    }
    res.status(200).send({ success: true, data: changeLikes });
  } catch (err) {
    res.status(500).send({ success: false, message: "Error updating likes" });
  }
};

export { incdecLikes };