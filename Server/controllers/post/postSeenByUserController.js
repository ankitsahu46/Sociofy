import postData from "../../models/postData.js";

const postSeenByUser = async (req, res) => {
  const { post_id, user_id } = req.params;

  try {
    const result = await postData.findOneAndUpdate(
      {
        _id: post_id,
      },
      {
        $addToSet: {
          usersSawThePost: user_id,
        },
      },
      { new: true }
    );

    if (result)
      res
        .status(200)
        .json({ success: true, message: "seen added successfully",  result: result});
  } catch (err) {
    res.status(200).json({ success: false, message: "something went wrong!" });
  }
};

export { postSeenByUser };
