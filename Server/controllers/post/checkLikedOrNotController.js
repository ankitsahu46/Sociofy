import postData from "../../models/postData.js";

const checkLikedOrNot = async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await postData.findOne({
      _id: post_id,
      likers: req.body._id,
    });
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