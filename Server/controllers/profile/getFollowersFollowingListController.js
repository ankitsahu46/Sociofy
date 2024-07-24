import userData from "../../models/userData.js";

const getFollowersFollowingList = async (req, res) => {
  const { userIds } = req.body;
  const usersList = [];

  try {
    for (const userId of userIds) {
      let user = await userData
        .findOne({ _id: userId })
        .select("username name img");
      if (user) {
        usersList.push(user);
      }
    }

    res.status(200).json({ success: true, usersList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getFollowersFollowingList };
