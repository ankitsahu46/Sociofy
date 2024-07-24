import userData from "../../models/userData.js";

const removeUserFromFollowersFollowing = async (req, res) => {
  const { user_id, follower_following_id, name } = req.body;

  const removeUser = { $pull: {}};
  const removeUser2 = { $pull: {}};
  removeUser.$pull[name] = follower_following_id;
  removeUser2.$pull[name === 'following' ? "followers" : "following"] = user_id;

  try {
    const result = await userData.findOneAndUpdate(
      { _id: user_id },
      removeUser,
      { new: true }
    );
    const result2 = await userData.findOneAndUpdate(
      { _id: follower_following_id },
      removeUser2,
      { new: true }
    );

    if (result && result2) {
      const users = (name === 'following' ? result.following : result.followers);
      res
        .status(200)
        .send({ success: true, message: "Follower removed successfully.", users });
    }
    else {
      res.status(500).send({ success: false, message: "Couldn't remove user!" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: "Couldn't remove user. Error: ", err});
  }
};

export { removeUserFromFollowersFollowing };