import postData from "../models/postData.js";

const likeCount = async (req, res) => {
  try {
    const result = await postData.findOne({_id: req.params.id});
    res.status(200).send({ success: true, likeCount: result.likers.length})
  }
  catch (err) {
    res.status(500).send({success: false, message: "Couldn't get like count"})
  }
}

export { likeCount };