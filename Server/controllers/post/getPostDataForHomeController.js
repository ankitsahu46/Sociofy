
import postData from "../../models/postData.js";

const getPostDataForHome = async (req, res) => {
  const { following, userId } = req.body;

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
      .sort({ $natural: -1 });
    if (result.length !== 0) {
      res
        .status(200)
        .send({ success: true, showRecent: false, postsData: result });
    } else {
      const result2 = await postData
        .find({
          userId: {
            $in: following,
          },
        })
        .sort({ $natural: -1 })
        .limit(3);
      res.status(200).send({
        success: true,
        showRecent: true,
        message: "Showing 3 recent posts.",
        recent: result2,
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Couldn't find post. Got error." });
  }
};

export { getPostDataForHome };
