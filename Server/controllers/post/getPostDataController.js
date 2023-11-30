import postData from "../../models/postData.js";

const getPostData  = async (req, res) => {
  try {
    const result = await postData.findOne({ _id: req.params.id });
    if (result) {
      res.status(200).send({ success: true, data: result});
    }
    else {
      res.status(404).send({ success: false, message: "Couldn't find post"});
    }
  }
  catch (err) {
    res.status(500).send({ success: false, message: "Couldn't find post. Got error."});
  }
}

export { getPostData };