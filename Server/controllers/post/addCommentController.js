import postData from "../../models/postData.js";

const addComment = async (req, res) => {
  const { post_id } = req.params;
  const { user_id, username, img, comment } = req.body;

  try {
    const result = await postData.updateOne(
      { _id: post_id },
      {
        $push: {
          comments_all: {
            commenter_user_id: user_id,
            commenter_username: username,
            comment: comment,
            commenter_img: img,
          },
        },
      }
    );
    res
      .status(200)
      .send({ success: true, message: "Comment added successfully" });
  } catch (err) {
    res.status(500).send({ success: false, message: "Couldn't add comment" });
  }
};

export { addComment };