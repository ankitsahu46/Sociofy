import postData from "../../models/postData.js";

const deleteComment = async (req, res) => {
  try {
    const result = await postData.updateOne(
      { _id: req.params._id },
      {
        $pull: {
          commentsall: {
            _id: req.params.id,
          },
        },
      }
    );
    res.status(200).send({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't delete comment" });
  }
};

export { deleteComment };
