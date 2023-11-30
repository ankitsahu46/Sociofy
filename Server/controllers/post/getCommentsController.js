import postData from "../../models/postData.js";

const getComments = async (req, res) => {
  try {
    const result = await postData.findOne({ _id: req.params.id });
    res.status(200).send({ success: true, comments: result.commentsall});
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't reload comments"});
  }
}

export { getComments };