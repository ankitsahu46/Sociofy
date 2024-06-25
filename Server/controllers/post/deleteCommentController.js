import postData from "../../models/postData.js";

const deleteComment = async (req, res) => {
  const { post_id, comment_id } = req.params;

  try {
    const result = await postData.updateOne(
      { _id: post_id },
      {
        $pull: {
          comments_all: {
            _id: comment_id,
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
