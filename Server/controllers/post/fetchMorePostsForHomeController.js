import postData from "../../models/postData.js";

const fetchMorePostsForHome = async (req, res) => {
  const { following, userId } = req.body;
  const limit = 5;

  try {
    const result = await postData
      .find({
        userId: {
          $in: following,
        },
        usersSawThePost: {
          $ne: userId,
        },
      })
      .sort({ $natural: -1 })
      .limit(limit);

    if (result.length !== 0)
      res.status(200).send({ success: true, postsData: result });
    else {
      res
        .status(200)
        .send({ success: false, message: "You have seen all the posts." });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't find post. Got error." });
  }
};

export { fetchMorePostsForHome };