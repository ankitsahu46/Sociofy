import postData from "../../models/postData.js";

const checkLikedOrNot = async (req, res) => {
  try {
    const result = await postData.findOne({
      _id: req.params.id,
      likers: req.body.username,
    })
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