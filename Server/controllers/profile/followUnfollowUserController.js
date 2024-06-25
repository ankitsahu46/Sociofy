import userData from "../../models/userData.js";

const followUnfollowUser = async (req, res) => {
  const { followedToWhom, whoFollowed, isFollowing } = req.body;
  const wantsToFollow = !isFollowing;

  try {
    if (wantsToFollow) {
      const result1 = await userData.updateOne(
        { _id: whoFollowed },
        {
          $addToSet: {
            following: followedToWhom,
          },
        }
      );
      const result2 = await userData.updateOne(
        { _id: followedToWhom },
        {
          $addToSet: {
            followers: whoFollowed,
          },
        }
      );
    }
    else {
      const result1 = await userData.updateOne(
        { _id: whoFollowed },
        {
          $pull: {
            following: followedToWhom,
          },
        }
      );
      const result2 = await userData.updateOne(
        { _id: followedToWhom },
        {
          $pull: {
            followers: whoFollowed,
          },
        }
      );
    }
    res.status(200).json({ success: true, message: "following successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "following failed" });
  }
};

export { followUnfollowUser };
