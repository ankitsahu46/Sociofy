import postData from "../../models/postData.js";

const addComment = async (req, res) => {
  try {
    const result = await postData.updateOne(
      { _id: req.params.id },
      {
        $addToSet: {
          comments_all: {
            commenter_username: req.body.username,
            comment: req.body.comment,
            commenter_img: req.body.img,
          },
        },
      }
    );

    res
      .status(200)
      .send({ success: true, message: "Comment added successfully" });
    console.log("comment added successfully");
    console.log(result);
  } catch (err) {
    res.status(500).send({ success: false, message: "Couldn't add comment" });
    console.log("Couldn't add comment");
  }
};

export { addComment };
