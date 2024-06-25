import postData from "../../models/postData.js";

const postShared = async (req, res) => {
  const { post_id } = req.params;

  try {
    const result = await postData.updateOne(
      {
        _id: post_id,
      },
      {
        $inc: {
          shares: 1,
        },
      },
      { new: true }
    );

    if (result)
      res
        .status(200)
        .json({ success: true, message: "shared successfully",  result: result});
  } catch (err) {
    res.status(200).json({ success: false, message: "something went wrong!" });
  }
};

export { postShared };
