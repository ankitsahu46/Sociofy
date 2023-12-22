import postData from "../../models/postData.js";

const addComment = async (req, res) => {
  try {
    const result = await postData.updateOne(
      { _id: req.params.id },
      {
        $addToSet: {
          commentsall: {
            commenterusername: req.body.username,
            comment: req.body.comment,
            commenterimg: req.body.img,
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
    console.log("Coundln add comment");
  }
};

export { addComment };
