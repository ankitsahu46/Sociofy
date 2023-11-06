import postData from "../models/postData.js";

const incdecLikes = async (req, res) => {
  let inc = req.query.liked == "true" ? 1 : -1;
   
  try {
    let changeLikes = await postData.updateOne(
      {_id: req.params.id},
      {$inc: {likes: inc}}
    )
    res.status(200).send({success: true, data: changeLikes});
  }
  catch (err) {
    res.status(500).send({success: false, message: "Error updating likes"});
  }
}

export { incdecLikes };